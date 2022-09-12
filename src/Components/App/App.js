import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [pokemon, setPokemon ] = useState('')

  async function getPokemon(){
    let ranNum = Math.floor(Math.random() * 906);
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ranNum}`);
    let data = await res.json();
    console.log(data)
    setPokemon(data)
  }

  useEffect(() => {
    getPokemon(); 
  }, []);

  return (
    <div className="App">
      <h1> isaa Pokemon app</h1>
      <img src = {pokemon.sprites.front_default} alt = {`front sprite of ${pokemon.name}`}/>
      <h2> {pokemon.name} </h2>
      <button onClick = {getPokemon}> click me</button>
    </div>
  );
}

export default App;
