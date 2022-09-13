import './App.css';
import { useState, useEffect } from 'react';
import  Image  from '../Image/Image.js'

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

  if(pokemon === ''){
    return (
      <div className = "App">
        <p className = "loading-text"> FETCHING POKEMON...</p>
      </div>
    )
  }
  
  else{
    return (
      <div className="App">
        <h1 className= 'heading'> Pokefetch</h1>

          <Image pokemon = {pokemon}/>

        <h2 className = 'pokemon-name'> {pokemon.name.toUpperCase()} </h2>
        <button className = 'pokemon-button' onClick = {getPokemon}> CLICK ME</button>
      </div>
    );
  }
}

export default App;
