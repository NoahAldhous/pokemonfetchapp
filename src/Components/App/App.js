import './App.css';
import { useState, useEffect } from 'react';
import  Image  from '../Image/Image.js'
import MoveList from '../MoveList/MoveList';

function App() {

  const [pokemon1, setPokemon1 ] = useState(null);
  const [pokemon2, setPokemon2 ] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerMove, setPlayerMove] = useState('');


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
          <section className = 'score-container'>
            <div className = 'move-display'> MOVE CHOSEN : {playerMove}</div>
            <div className = 'score-display'> PLAYER:{playerScore} </div>
          </section>
          <section className = "pokemon-info-container">
            <h2 className = 'pokemon-name'> {pokemon1.name.toUpperCase()} </h2>
            <Image pokemon = {pokemon1}/>
            <MoveList pokemon = {pokemon1} setPlayerMove = {setPlayerMove}/>
          </section>
          <div className = 'versus-text'> VS </div>
          <section className = "pokemon-info-container">
            <h2 className = 'pokemon-name'> {pokemon2.name.toUpperCase()} </h2>
            <Image pokemon = {pokemon2}/>
            <MoveList pokemon = {pokemon2}/>
          </section>
          <section className = 'score-container'>
            <div className = 'score-display'> CPU:{computerScore} </div>
          </section>
        </section>
        <button className = 'pokemon-button' onClick = {handleCLick}> RESET</button>
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
