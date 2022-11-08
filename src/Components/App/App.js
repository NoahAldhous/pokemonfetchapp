import './App.css';
import { useState, useEffect } from 'react';
import  Image  from '../Image/Image.js'
import PlayerMoveList from '../MoveList/PlayerMoveList';
import ComputerMoveList from '../MoveList/ComputerMoveList';
import Modal from '../Modal/Modal';
import StatCard from '../StatCard/StatCard';
import HelpSection from '../HelpSection/HelpSection';

function App() {
  // help section state 
  const [wantsHelp, setWantsHelp] = useState(true)

  //player related state
  const [playerPokemon, setPlayerPokemon ] = useState(null);
  //const [playerScore, setPlayerScore] = useState(0);
  const [playerMove, setPlayerMove] = useState('');
  const [chosenMove, setChosenMove] = useState('');


  //cpu related state
  const [computerPokemon, setComputerPokemon ] = useState(null);
  //const [computerScore, setComputerScore] = useState(0);
  const [computerMove, setComputerMove] = useState('');


  //battle report related state
  const [isOpen, setIsOpen] = useState(false);
  const [speedResult, setSpeedResult] = useState('')
  const [resultsMessage, setResultsMessage] = useState('')
  const [actionReport, setActionReport] = useState('')
  const [damageResult, setDamageResult] = useState('')
  const [toHitResult, setToHitResult] = useState('')

  function resetBattleReport(){
    setIsOpen(false);
    setSpeedResult('');
    setResultsMessage('');
    setActionReport('');
    setDamageResult('');
    setToHitResult('');
  }

  async function getPlayerPokemon(){
    let ranNum = Math.floor(Math.random() * 906);
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ranNum}`);
    let data = await res.json();
    setPlayerPokemon({
      name : data.name,
      moves : data.moves,
      currenthp : data.stats[0].base_stat,
      hp: data.stats[0].base_stat,
      speed: data.stats[5].base_stat,
      image: data.sprites.front_default
    });
  }

  async function getComputerPokemon(){
    let ranNum = Math.floor(Math.random() * 906);
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ranNum}`);
    let data = await res.json();
    setComputerPokemon({
      name : data.name,
      moves : data.moves,
      currenthp : data.stats[0].base_stat,
      hp: data.stats[0].base_stat,
      speed: data.stats[5].base_stat,
      image: data.sprites.front_default
    })
  }

  useEffect(() => {
    getPlayerPokemon(); 
    getComputerPokemon(); 
    // eslint-disable-next-line
  }, []);

  function handleReset(){
    resetBattleReport();
    setPlayerMove('')
    setChosenMove('')
    getPlayerPokemon(); 
    getComputerPokemon(); 

  }

  function handleClose(){
    resetBattleReport();
    setPlayerMove('')
    setChosenMove('')
    if(playerPokemon.currenthp <= 0 || computerPokemon.currenthp <= 0){
    getPlayerPokemon(); 
    getComputerPokemon(); 
    }
  }

  function handleFight(){
    if(chosenMove && computerMove){
      setResultsMessage('')
      setIsOpen(true)

      setActionReport(
        `${playerPokemon.name.toUpperCase()} used ${chosenMove.name.toUpperCase()}, ${computerPokemon.name.toUpperCase()} used ${computerMove.name.toUpperCase()} `
      )

      //resolve which pokemon acts first

      if(playerPokemon.speed < computerPokemon.speed){

        //COMPUTER ACTS FIRST
        setSpeedResult(`${computerPokemon.name} acts first and uses ${computerMove.name}! ${computerMove.accuracy}% chance to hit.`);

        //DETERMINING IF ATTACK HITS OR MISSES
        let toHitRoll = Math.floor(Math.random() * 101);
        //ON HIT
        if(computerMove.accuracy === 100 || toHitRoll <= computerMove.accuracy){
          setToHitResult(`The attack hits!`)
          //DETERMINING DAMAGE EFFECT
          if(computerMove.power > 0){
            playerPokemon.currenthp = (playerPokemon.currenthp - computerMove.power)
            setDamageResult(`${computerPokemon.name}  deals ${computerMove.power} damage to ${playerPokemon.name}!`)
          }
          else if(computerMove.power === 0){
            setDamageResult('special effect happens')
          }
        //ON MISS
        }else if(toHitRoll > computerMove.accuracy){
          setToHitResult(`The attack misses! ${playerPokemon.name}'s turn!`)
        }
      }else if(playerPokemon.speed > computerPokemon.speed){

        //PLAYER ACTS FIRST
        setSpeedResult(`${playerPokemon.name} acts first and uses ${chosenMove.name}! ${chosenMove.accuracy}% chance to hit.`);
        
        //DETERMINING IF ATTACK HITS OR MISSES
        let toHitRoll = Math.floor(Math.random() * 101);
        //ON HIT
        if(chosenMove.accuracy === 100 || toHitRoll <= chosenMove.accuracy){
          setToHitResult(`The attack hits!`)
          //DETERMINING DAMAGE EFFECT
          if(chosenMove.power > 0){
            computerPokemon.currenthp = (computerPokemon.currenthp - chosenMove.power)
            setDamageResult(`${playerPokemon.name} used ${chosenMove.name}, dealing ${chosenMove.power} damage!`)
          }
          else if(chosenMove.power === 0){
            setDamageResult('special effect happens')
          }
        //ON MISS
        }else if(toHitRoll > chosenMove.accuracy){
          setToHitResult(`The attack misses! ${computerPokemon.name}'s turn!`)
        }

        //SPEED IS EQUAL
      }else if(playerPokemon.speed === computerPokemon.speed){
        let ranNum = Math.floor(Math.random() * 2)
        if(ranNum === 0){
        setSpeedResult(`It's close, but`)
        }
      }      
    }
    else if(chosenMove === ""){
      setResultsMessage("need to choose a move, my dude")
    }
  }

  if(playerPokemon && computerPokemon){
   
    return (
      <div className="App">
        <h1 className= 'heading'> Pokebrawlz</h1>
        <button className= 'help-button' onClick = {function(){setWantsHelp(true)}}>?</button>
        <HelpSection wantsHelp={ wantsHelp } setWantsHelp = {setWantsHelp}/>
        <Modal open = {isOpen} onClose = {handleClose} results = {resultsMessage} actionReport = {actionReport} speedResult = {speedResult} damageResult = {damageResult} toHitResult = {toHitResult}></Modal>
        <section className = "pokemon-container">
        <StatCard pokemon = {playerPokemon} move = {chosenMove}/>
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
          <StatCard pokemon = {computerPokemon} move = {computerMove}/>
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
