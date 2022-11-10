import './App.css';
import { useState, useEffect } from 'react';
import  Image  from '../Image/Image.js'
import MoveList from '../MoveList/MoveList';
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
  const [toHitResult, setToHitResult] = useState('')
  const [damageResult, setDamageResult] = useState('')
  const [secondTurnMessage, setSecondTurnMessage] = useState('')
  const [secondResultsMessage, setSecondResultsMessage] = useState('')
  const [secondToHitResult, setSecondToHitResult] = useState('')
  const [secondDamageResult, setSecondDamageResult] = useState('')

  function resetBattleReport(){
    setIsOpen(false);
    setSpeedResult('');
    setResultsMessage('');
    setToHitResult('');
    setDamageResult('');
    setSecondTurnMessage('');
    setSecondResultsMessage('');
    setSecondToHitResult('');
    setSecondDamageResult('');
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
      image: data.sprites.front_default,
      critChance: 5
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
      image: data.sprites.front_default,
      critChance: 5
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
    document.querySelector(`.active-button`).classList.toggle('active-button');
    if(playerPokemon.currenthp <= 0 || computerPokemon.currenthp <= 0){
    getPlayerPokemon(); 
    getComputerPokemon(); 
    }
  }


  function handleFight(){

    function resolveFight(fasterPokemon, fasterMove, slowerPokemon, slowerMove){

      //DETERMING MESSAGE REGARDING WHICH POKEMON ACTS FIRST AND WHICH MOVE IS USED
      setSpeedResult(`${fasterPokemon.name} acts first and uses ${fasterMove.name}! ${fasterMove.accuracy}% chance to hit.`);

      //FIRST TURN

      //DETERMINING IF ATTACK HITS OR MISSES
      let toHitRoll = Math.floor(Math.random() * 101);
      console.log(`roll to hit: ${toHitRoll}`)

      //ON CRIT
      if(toHitRoll < fasterPokemon.critChance  && fasterMove.power > 0){
        setToHitResult('CRITICAL HIT! THE ATTACK DEALS DOUBLE DAMAGE');
        slowerPokemon.currenthp = (slowerPokemon.currenthp - fasterMove.power * 2);
        setDamageResult(`${fasterPokemon.name}  deals ${fasterMove.power * 2} damage to ${slowerPokemon.name}!`) 

      //ON HIT
      }else if(fasterMove.accuracy === 100 || toHitRoll <= fasterMove.accuracy){
        setToHitResult(`The attack hits!`)

        //DETERMINING DAMAGE EFFECT
        if(fasterMove.power > 0){
          slowerPokemon.currenthp = (slowerPokemon.currenthp - fasterMove.power)
          setDamageResult(`${fasterPokemon.name}  deals ${fasterMove.power} damage to ${slowerPokemon.name}!`)
        }
        //DETERMING SPECIAL EFFECT
        else if(fasterMove.power === 0){
          switch(fasterMove.special){
            case 'defend':
              slowerMove.power = slowerMove.power / 2;
              setDamageResult(`${fasterPokemon.name} defends! Damage taken is reduced to ${slowerMove.power}`);
              break;
            case 'dodge':
              slowerMove.accuracy = slowerMove.accuracy / 2;
              setDamageResult(`${fasterPokemon.name} dodges! Opponent's accuracy is reduced to ${slowerMove.accuracy}`);
              break;
            case 'focus':
              fasterPokemon.critChance = 25;
              setDamageResult(`${fasterPokemon.name} focuses! Critical chance increased to ${fasterPokemon.critChance}%!`);
              break;
            default: return null
          }
        }
      //ON MISS
      }else if(toHitRoll > fasterMove.accuracy){
        setToHitResult(`The attack misses! ${slowerPokemon.name}'s turn!`)
      }

      //SECOND TURN
      //SECOND TURN
      //SECOND TURN

      if(slowerPokemon.currenthp <= 0){
        setSecondTurnMessage(`${slowerPokemon.name} is fucking dead!`)
        return null;
      }else{
        setSecondTurnMessage(`${slowerPokemon.name}'s turn! ${slowerPokemon.name} uses ${slowerMove.name}! ${slowerMove.accuracy}% chance to hit.`)
      }
      //DETERMINING IF ATTACK HITS OR MISSES
      toHitRoll = Math.floor(Math.random() * 101);
      console.log(`roll to hit: ${toHitRoll}`)

      //ON CRIT
      if(toHitRoll < slowerPokemon.critChance  && slowerMove.power > 0){
        setSecondToHitResult('CRITICAL HIT! THE ATTACK DEALS DOUBLE DAMAGE');
        fasterPokemon.currenthp = (fasterPokemon.currenthp - slowerMove.power * 2);
        setSecondDamageResult(`${slowerPokemon.name}  deals ${slowerMove.power * 2} damage to ${fasterPokemon.name}!`) 

      //ON HIT
      }else if(slowerMove.accuracy === 100 || toHitRoll <= slowerMove.accuracy){
        setSecondToHitResult(`The attack hits!`)

        //DETERMINING DAMAGE EFFECT
        if(slowerMove.power > 0){
          fasterPokemon.currenthp = (fasterPokemon.currenthp - slowerMove.power)
          setSecondDamageResult(`${slowerPokemon.name}  deals ${slowerMove.power} damage to ${fasterPokemon.name}!`)
        }
        //DETERMING SPECIAL EFFECT
        else if(slowerMove.power === 0){
          switch(slowerMove.special){
            case 'defend':
              fasterMove.power = fasterMove.power / 2;
              setSecondDamageResult(`${slowerPokemon.name} defends! Damage taken is reduced to ${fasterMove.power}`);
              break;
            case 'dodge':
              fasterMove.accuracy = fasterMove.accuracy / 2;
              setSecondDamageResult(`${slowerPokemon.name} dodges! Opponent's accuracy is reduced to ${fasterMove.accuracy}`);
              break;
            case 'focus':
              slowerPokemon.critChance = 25;
              setSecondDamageResult(`${slowerPokemon.name} focuses! Critical chance increased to ${slowerPokemon.critChance}%!`);
              break;
            default: return null
          }
        }
      //ON MISS
      }else if(toHitRoll > slowerMove.accuracy){
        setToHitResult(`The attack misses!`)
      }
      if(fasterPokemon.currenthp <= 0){
        setSecondResultsMessage(`${fasterPokemon.name} is dead! Congratulations!`)
      }else{
        setSecondResultsMessage(`Both Pokemon remain standing! Next round, let's go!`)
      }

    }

    if(chosenMove && computerMove){
      setResultsMessage('')
      setIsOpen(true)

      //DETERMINING WHICH POKEMON ACTS FIRST
      let playerSpeed = playerPokemon.speed + Math.floor(Math.random() * 180);
      let computerSpeed = computerPokemon.speed + Math.floor(Math.random() * 180);
      console.log(`player speed = ${playerSpeed} computer speed = ${computerSpeed}`)
      
      //COMPUTER ACTS FIRST
      if(playerSpeed < computerSpeed){

        resolveFight(computerPokemon, computerMove, playerPokemon, chosenMove)
       
      //PLAYER ACTS FIRST
      }else if(playerSpeed > computerSpeed){
        console.log('player acts first!')

        resolveFight(playerPokemon, chosenMove, computerPokemon, computerMove)

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
      console.log('move needs choosing')
    }
  }

  if(playerPokemon && computerPokemon){
   
    return (
      <div className="App">
        <h1 className= 'heading'> Pokebrawlz</h1>
        <button className= 'help-button' onClick = {function(){setWantsHelp(true)}}>?</button>
        <HelpSection wantsHelp={ wantsHelp } setWantsHelp = {setWantsHelp}/>
        <Modal open = {isOpen} onClose = {handleClose} results = {resultsMessage} speedResult = {speedResult} damageResult = {damageResult} toHitResult = {toHitResult} secondTurnMessage = {secondTurnMessage} secondToHitResult = {secondToHitResult} secondDamageResult = {secondDamageResult} secondResultsMessage = {secondResultsMessage}></Modal>
        <section className = "pokemon-container">
        <StatCard pokemon = {playerPokemon} move = {chosenMove}/>
          <section className = "pokemon-info-container">
            <h2 className = 'pokemon-name'> {playerPokemon.name.toUpperCase()} </h2>
            <Image pokemon = {playerPokemon}/>
            <MoveList pokemon = {playerPokemon} pokemonMove = {playerMove} setMove = {setPlayerMove} chosenMove = {chosenMove} setChosenMove = {setChosenMove} isPlayer = {true}/>
          </section>
          <div className = 'versus-text'> VS </div>
          <section className = "pokemon-info-container">
            <h2 className = 'pokemon-name'> {computerPokemon.name.toUpperCase()} </h2>
            <Image pokemon = {computerPokemon}/>
            <MoveList pokemon = {computerPokemon} setMove = {setComputerMove} isPlayer = {false}/>
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
