import './App.css';
import { useState, useEffect } from 'react';
import  Image  from '../Image/Image.js'
import PlayerMoveList from '../MoveList/PlayerMoveList';
import ComputerMoveList from '../MoveList/ComputerMoveList';

function App() {

  const [playerPokemon, setPlayerPokemon ] = useState(null);
  const [computerPokemon, setComputerPokemon ] = useState(null);
  const [playerScore] = useState(0);
  const [computerScore] = useState(0);
  const [playerMove, setPlayerMove] = useState('');
  const [computerMove, setComputerMove] = useState('');


  async function getPlayerPokemon(){
    let ranNum = Math.floor(Math.random() * 906);
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ranNum}`);
    let data = await res.json();
    setPlayerPokemon(data)
  }

  async function getComputerPokemon(){
    let ranNum = Math.floor(Math.random() * 906);
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ranNum}`);
    let data = await res.json();
    setComputerPokemon(data)
  }

  useEffect(() => {
    getPlayerPokemon(); 
    getComputerPokemon(); 
  }, []);

  function handleReset(){
    getPlayerPokemon(); 
    getComputerPokemon(); 
  }

  function handleFight(){
    if(playerMove && computerMove){
      console.log(
        `${playerPokemon.name} used ${playerMove.name}, ${computerPokemon.name} used ${computerMove.name} `
      )
      if(playerMove.power === computerMove.power){
        console.log("It's a draw");
      }
      else if(playerMove.power < computerMove.power){
        console.log('CPU Wins!');
      }
      else if(playerMove.power > computerMove.power){
        console.log('Player Wins!');
      }
      else{
        console.log('something went wrong')
      }        
      }
    else{
      console.log("need to choose a move, my dude")
    }
  }

  if(playerPokemon && computerPokemon){
   
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
            <h2 className = 'pokemon-name'> {playerPokemon.name.toUpperCase()} </h2>
            <Image pokemon = {playerPokemon}/>
            <PlayerMoveList pokemon = {playerPokemon} setPlayerMove = {setPlayerMove}/>
          </section>
          <div className = 'versus-text'> VS </div>
          <section className = "pokemon-info-container">
            <h2 className = 'pokemon-name'> {computerPokemon.name.toUpperCase()} </h2>
            <Image pokemon = {computerPokemon}/>
            <ComputerMoveList pokemon = {computerPokemon} setComputerMove = {setComputerMove}/>
          </section>
          <section className = 'score-container'>
            <div className = 'score-display'> CPU:{computerScore} </div>
            <div className = 'move-display'> MOVE CHOSEN : <br/> {computerMove.name}</div>
            <div className = 'move-display'> POWER : <br/> {computerMove.power}</div>
          </section>
        </section>
        <section className = 'pokemon-button-container'>
          <button className = 'pokemon-button' onClick = {handleFight}> FIGHT</button>
          <button className = 'pokemon-button' onClick = {handleReset}> RESET</button>
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
