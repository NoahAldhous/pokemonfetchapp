import './App.css';
import { useState, useEffect } from 'react';
import  Image  from '../Image/Image.js'

function App() {

  const [pokemon1, setPokemon1 ] = useState(null);
  const [pokemon2, setPokemon2 ] = useState(null);

  async function getPokemon1(){
    let ranNum = Math.floor(Math.random() * 906);
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ranNum}`);
    let data = await res.json();
    setPokemon1(data)
  }

  async function getPokemon2(){
    let ranNum = Math.floor(Math.random() * 906);
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ranNum}`);
    let data = await res.json();
    setPokemon2(data)
  }

  useEffect(() => {
    getPokemon1(); 
    getPokemon2(); 
  }, []);

  function handleCLick(){
    getPokemon1(); 
    getPokemon2(); 
  }

  if(pokemon1 && pokemon2){
   
    return (
      <div className="App">
        <h1 className= 'heading'> Pokebrawlz</h1>
        <section className = "pokemon-container">
          <section className = "pokemon-info-container">
            <Image pokemon = {pokemon1}/>
            <h2 className = 'pokemon-name'> {pokemon1.name.toUpperCase()} </h2>
            <h3 className = 'pokemon-move'> {pokemon1.moves[Math.floor(Math.random() * pokemon1.moves.length)].move.name.toUpperCase()}</h3>
          </section>
          <section className = "pokemon-info-container">
            <Image pokemon = {pokemon2}/>
            <h2 className = 'pokemon-name'> {pokemon2.name.toUpperCase()} </h2>
            <h3 className = 'pokemon-move'> {pokemon2.moves[Math.floor(Math.random() * pokemon2.moves.length)].move.name.toUpperCase()}</h3>
          </section>
        </section>
        <button className = 'pokemon-button' onClick = {handleCLick}> CLICK ME</button>
      </div>
    );
  }
  
  else{
    return (
      <div className = "App">
        <p className = "loading-text"> FETCHING POKEMON...</p>
      </div>
    )
  }
}

export default App;
