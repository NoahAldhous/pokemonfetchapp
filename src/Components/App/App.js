import './App.css';
import { useState, useEffect } from 'react';
import  Image  from '../Image/Image.js'
import PlayerMoveList from '../MoveList/PlayerMoveList';
import ComputerMoveList from '../MoveList/ComputerMoveList';
import Modal from '../Modal/Modal';

function App() {

  const [playerPokemon, setPlayerPokemon ] = useState(null);
  const [computerPokemon, setComputerPokemon ] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerMove, setPlayerMove] = useState('');
  const [computerMove, setComputerMove] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [resultsMessage, setResultsMessage] = useState('')
  const [actionReport, setActionReport] = useState('')
  const [chosenMove, setChosenMove] = useState('')


  async function getPlayerPokemon(){
    let ranNum = Math.floor(Math.random() * 906);
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ranNum}`);
    let data = await res.json();
    setPlayerPokemon(data)
    console.log(playerPokemon)
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
    // eslint-disable-next-line
  }, []);

  function handleReset(){
    setIsOpen(false);
    setPlayerMove('')
    setChosenMove('')
    getPlayerPokemon(); 
    getComputerPokemon(); 
  }

  function handleFight(){
    if(chosenMove && computerMove){
      setIsOpen(true)
      setActionReport(
        `${playerPokemon.name.toUpperCase()} used ${chosenMove.name.toUpperCase()}, ${computerPokemon.name.toUpperCase()} used ${computerMove.name.toUpperCase()} `
      )
      if(chosenMove.power === computerMove.power){
        setResultsMessage("It's a draw");
      }
      else if(chosenMove.power < computerMove.power){
        setResultsMessage('CPU Wins!');
        setComputerScore(computerScore + 1)
      }
      else if(chosenMove.power > computerMove.power){
        setResultsMessage('Player Wins!');
        setPlayerScore(playerScore + 1)
      }
      else{
        setResultsMessage('something went wrong')
      }        
      }
    else{
      setResultsMessage("need to choose a move, my dude")
    }
  }

  if(playerPokemon && computerPokemon){
   
    return (
      <div className="App">
        <h1 className= 'heading'> Pokebrawlz</h1>
        <Modal open = {isOpen} onClose = {handleReset} results = {resultsMessage} actionReport = {actionReport}></Modal>
        <section className = "pokemon-container">
          <section className = 'move-info-container'>
            <div className = 'hp-display'> {playerPokemon.stats[0].stat.name.toUpperCase()}: {playerPokemon.stats[0].base_stat}</div>
            <div className = 'speed-display'> {playerPokemon.stats[5].stat.name.toUpperCase()}: {playerPokemon.stats[5].base_stat}</div>
            <div className = 'move-name-display'> MOVE CHOSEN: {chosenMove.name}</div>
            <div className = 'move-accuracy-display'> ACCURACY: {chosenMove.accuracy}</div>
            <div className = 'move-power-display'> POWER: {chosenMove.power}</div>
          </section>
          <section className = "pokemon-info-container">
            <h2 className = 'pokemon-name'> {playerPokemon.name.toUpperCase()} </h2>
            <Image pokemon = {playerPokemon}/>
            <PlayerMoveList pokemon = {playerPokemon} playerMove = {playerMove} setPlayerMove = {setPlayerMove} chosenMove = {chosenMove} setChosenMove = {setChosenMove}/>
          </section>
          <div className = 'versus-text'> VS </div>
          <section className = "pokemon-info-container">
            <h2 className = 'pokemon-name'> {computerPokemon.name.toUpperCase()} </h2>
            <Image pokemon = {computerPokemon}/>
            <ComputerMoveList pokemon = {computerPokemon} setComputerMove = {setComputerMove}/>
          </section>
          <section className = 'move-info-container'>
            <div className = 'score-display'> CPU: {computerScore} </div>
            <div className = 'move-display'> MOVE CHOSEN: {computerMove.name}</div>
            <div className = 'move-display'> POWER: {computerMove.power}</div>
            <div className = 'speed-display'> {computerPokemon.stats[5].stat.name.toUpperCase()}: {computerPokemon.stats[5].base_stat}</div>
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
