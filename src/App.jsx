import { useState, useEffect } from "react"
import PokeList from "./components/PokeList"
import PokeDetail from "./components/PokeDetail"

function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [selectedPokemonName, setSelectedPokemonName] = useState("")
  const [pokemonDetail, setPokemonDetail] = useState()

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (!selectedPokemonName) return
    // Tolong tulis url dalam satu baris
    fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`)
      .then((res) => res.json())
      .then((data) => setPokemonDetail(data))
      .catch((err) => console.log(err))
  }, [selectedPokemonName])

  const clear = () => {
    setSelectedPokemonName("")
    setPokemonDetail()
  }

  return (
    <div style={styles.container}>
      <h2>PokeAPI</h2>
      {/* Memasukkan setSelectedPokemonName function sebagai prop */}
      <PokeList
        pokemonList={pokemonList}
        setSelectedPokemonName={setSelectedPokemonName}
      />
      {pokemonDetail && (
        <div>
          <h2>Pokemon Detail</h2>
          <PokeDetail pokemonDetail={pokemonDetail} />
          <button style={styles.button} onClick={() => clear()}>
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    width: "50%",
    margin: "0 auto",
    padding: "80px",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderRadius: "6px",
    padding: "12px 24px",
    fontSize: "1em",
    cursor: "pointer",
    marginTop: "32px",
  },
}

export default App