import './App.css';
import { useState, useEffect } from 'react';
import  Image  from '../Image/Image.js'
import PlayerMoveList from '../MoveList/PlayerMoveList';
import ComputerMoveList from '../MoveList/ComputerMoveList';

function App() {

  const [pokemon1, setPokemon1 ] = useState(null);
  const [pokemon2, setPokemon2 ] = useState(null);
  const [playerScore] = useState(0);
  const [computerScore] = useState(0);
  const [playerMove, setPlayerMove] = useState({});
  const [computerMove, setComputerMove] = useState({});


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
            <div className = 'move-display'> MOVE CHOSEN : <br/> {playerMove.name}</div>
            <div className = 'move-display'> POWER : <br/> {playerMove.power}</div>
            <div className = 'score-display'> PLAYER:{playerScore} </div>
          </section>
          <section className = "pokemon-info-container">
            <h2 className = 'pokemon-name'> {pokemon1.name.toUpperCase()} </h2>
            <Image pokemon = {pokemon1}/>
            <PlayerMoveList pokemon = {pokemon1} setPlayerMove = {setPlayerMove}/>
          </section>
          <div className = 'versus-text'> VS </div>
          <section className = "pokemon-info-container">
            <h2 className = 'pokemon-name'> {pokemon2.name.toUpperCase()} </h2>
            <Image pokemon = {pokemon2}/>
            <ComputerMoveList pokemon = {pokemon2} setComputerMove = {setComputerMove}/>
          </section>
          <section className = 'score-container'>
            <div className = 'score-display'> CPU:{computerScore} </div>
            <div className = 'move-display'> MOVE CHOSEN : <br/> {computerMove.name}</div>
            <div className = 'move-display'> POWER : <br/> {computerMove.power}</div>
          </section>
        </section>
        <section className = 'pokemon-button-container'>
          <button className = 'pokemon-button'> FIGHT</button>
          <button className = 'pokemon-button' onClick = {handleCLick}> RESET</button>
        </section>
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
