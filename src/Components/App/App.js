import './App.css';
import { useState, useEffect } from 'react';
import  Image  from '../Image/Image.js'
import MoveList from '../MoveList/MoveList';
import Modal from '../Modal/Modal';
import StatCard from '../StatCard/StatCard';
import HelpSection from '../HelpSection/HelpSection';
import {IoMdSettings} from 'react-icons/io'
import SettingsModal from '../SettingsModal/SettingsModal';

function App() {

  // help section state 
  const [wantsHelp, setWantsHelp] = useState(true)

  // settings modal state  
  const [wantsSettings, setWantsSettings] = useState(false)
  const[alternateColor, setAlternateColor] = useState(localStorage.localAlternateColor)
  const[accessibleFont, setAccessibleFont] = useState(localStorage.localAccessibleFont)
  const[settingsTakenFromLocalStorage, setSettingsTakenFromLocalStorage] = useState(false) 

  //player related state
  const [playerPokemon, setPlayerPokemon ] = useState(null);
  const [playerScore, setPlayerScore] = useState(localStorage.localPlayerScore);
  const [playerMove, setPlayerMove] = useState('');
  const [chosenMove, setChosenMove] = useState({
    name: '',
    accuracy: '',
    power: '',
    special: ''
  });

  //cpu related state
  const [computerPokemon, setComputerPokemon ] = useState(null);
  const [computerScore, setComputerScore] = useState(localStorage.localComputerScore);
  const [computerMove, setComputerMove] = useState({
    name: '',
    accuracy: '',
    power: '',
    special: ''
  });

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
  const [round, setRound] = useState(1);

  //creating local storage for score and settings
  useEffect( ()=>{
    localStorage.setItem('localPlayerScore', playerScore)
    localStorage.setItem('localComputerScore', computerScore)
    if(localStorage.localPlayerScore === 'undefined'){
      setPlayerScore(0);
    }
    if(localStorage.localComputerScore === 'undefined'){
      setComputerScore(0);
    }
  }, [playerScore, computerScore])

  //creating local storage for settings 
  useEffect ( ()=> {
    localStorage.setItem('localAlternateColor', alternateColor)
    localStorage.setItem('localAccessibleFont', accessibleFont)
  }, [alternateColor, accessibleFont])

  function checkDefaultSettings(alternateColor, accessibleFont){
    var element = document.getElementsByClassName('App')[0]
    console.log(element)
    if(alternateColor === "true" && !element.classList.contains("alternate-color")){
        element.classList.add("alternate-color");
        setSettingsTakenFromLocalStorage(true);
    }
    if(accessibleFont === "true"  && !element.classList.contains("accessible-font")){
        element.classList.add("accessible-font");
        setSettingsTakenFromLocalStorage(true);
    }
    else{
      if (element.classList.contains("alternate-color")){
        element.classList.remove("alternate-color")
        setSettingsTakenFromLocalStorage(true);
      };
      if (element.classList.contains("accessible-font")){
        element.classList.remove("accessible-font")
        setSettingsTakenFromLocalStorage(true);
      }else{
        setSettingsTakenFromLocalStorage(true);
        return null;
      }
      }
}

useEffect( () => {
    checkDefaultSettings(alternateColor, accessibleFont);
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

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
      currenthp : data.stats[0].base_stat  * 2,
      hp: data.stats[0].base_stat  * 2,
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
      currenthp : data.stats[0].base_stat * 2,
      hp: data.stats[0].base_stat * 2,
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
    setPlayerMove({
      name: '',
      accuracy: '',
      power: '',
      special: ''
    })
    setChosenMove({
      name: '',
      accuracy: '',
      power: '',
      special: ''
    })
    getPlayerPokemon(); 
    getComputerPokemon(); 
  }

  function handleClose(){
    resetBattleReport();
    setPlayerMove({
      name: '',
      accuracy: '',
      power: '',
      special: ''
    })
    setChosenMove({
      name: '',
      accuracy: '',
      power: '',
      special: ''
    })
    let element = document.querySelector(`.active-button`)
    if(element){element.classList.toggle('active-button')};
    if(playerPokemon.currenthp <= 0 || computerPokemon.currenthp <= 0){
      console.log('pokemon dead')
    getPlayerPokemon(); 
    getComputerPokemon(); 
    }
  }


  function handleFight(){

    function resolveFight(fasterPokemon, fasterMove, slowerPokemon, slowerMove){

      //DETERMING MESSAGE REGARDING WHICH POKEMON ACTS FIRST AND WHICH MOVE IS USED
      setSpeedResult(`${fasterPokemon.name} acts first and uses ${fasterMove.name}!`);

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

        if(fasterMove.power <= 0){
          setToHitResult(``);
        }else{
          setToHitResult(`The attack hits!`)
        }

        //DETERMINING DAMAGE EFFECT
        if(fasterMove.power > 0){
          slowerPokemon.currenthp = (slowerPokemon.currenthp - fasterMove.power)
          setDamageResult(`${fasterPokemon.name}  deals ${fasterMove.power} damage to ${slowerPokemon.name}!`)
        }
        //DETERMING SPECIAL EFFECT
        else if(fasterMove.power === 0){
          switch(fasterMove.special){
            case 'defend':
              slowerMove.power = Math.floor(slowerMove.power / 2);;
              setDamageResult(`${fasterPokemon.name} defends! Damage taken is reduced to ${slowerMove.power}`);
              break;
            case 'dodge':
              slowerMove.accuracy = Math.floor(slowerMove.accuracy / 2);
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
        if(fasterMove.power <= 0){
          setToHitResult(`Special effect doesn't work...`);
        }else{
          setToHitResult(`The attack misses! ${slowerPokemon.name}'s turn!`)
        }
      }

      //DETERMINING IF A POKEMON HAS WON, OR IF CONTINUE TO NEXT TURN
      if(playerPokemon.currenthp <= 0){
        setSecondTurnMessage(`Oh no, ${playerPokemon.name} is dead! Try again!`)
        setComputerScore(Number(computerScore) +1)
        localStorage.setItem('localComputerScore', computerScore)
        setRound(1)
        return null;
      }else if( computerPokemon.currenthp <= 0){
        setSecondTurnMessage(`${computerPokemon.name} is dead! Congratulations!`)
        setPlayerScore(Number(playerScore) +1)
        localStorage.setItem('localPlayerScore', playerScore)
        setRound(1)
        return null;
      }else{
        setSecondTurnMessage(`${slowerPokemon.name}'s turn! ${slowerPokemon.name} uses ${slowerMove.name}!`)
      }

      //SECOND TURN
      //SECOND TURN
      //SECOND TURN

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
        if(slowerMove.power <= 0){
          setSecondToHitResult('')
        }else{
          setSecondToHitResult(`The attack hits!`)
        }
        //DETERMINING DAMAGE EFFECT
        if(slowerMove.power > 0){
          fasterPokemon.currenthp = (fasterPokemon.currenthp - slowerMove.power)
          setSecondDamageResult(`${slowerPokemon.name}  deals ${slowerMove.power} damage to ${fasterPokemon.name}!`)
        }
        //DETERMING SPECIAL EFFECT
        else if(slowerMove.power === 0){
          switch(slowerMove.special){
            case 'defend':
              fasterMove.power = Math.floor(fasterMove.power / 2);
              setSecondDamageResult(`${slowerPokemon.name} defends! Damage taken is reduced to ${fasterMove.power}`);
              break;
            case 'dodge':
              fasterMove.accuracy = Math.floor(fasterMove.accuracy / 2);
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
        if(slowerMove.power <= 0){
          secondToHitResult(`Special Effect doesn't work...`)
        }else{
          setSecondToHitResult(`The attack misses!`)
        }
      }
      if(computerPokemon.currenthp <= 0){
        setSecondResultsMessage(`${computerPokemon.name} is dead! Congratulations!`)
        setPlayerScore(Number(playerScore) +1)
        localStorage.setItem('localPlayerScore', playerScore)
        setRound(1)
      }
      else if(playerPokemon.currenthp <= 0){
        setSecondResultsMessage(`Oh no, ${playerPokemon.name} is dead! Try again!`)
        setComputerScore(Number(computerScore) +1)
        localStorage.setItem('localComputerScore', computerScore)
        setRound(1)
      }
      else{
        setSecondResultsMessage(`Both Pokemon remain standing! Next round, let's go!`)
        setRound(round + 1)
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

  if(playerPokemon && computerPokemon && settingsTakenFromLocalStorage){
   
    return (
      <div className= {`App ${alternateColor === "true" ? 'alternate-color' : ''} ${accessibleFont === "true" ? 'accessible-font' : ''}`}>
        <section className = "header">
          {
            localStorage.localPlayerScore === 'undefined'
              ? <h3 className = 'score-counter'>PLAYER: 0</h3>
              : <h3 className = 'score-counter'>PLAYER: {playerScore}</h3>
          }
        <h1 className= 'heading'> Pokebrawlz</h1>
          {
            localStorage.localComputerScore === 'undefined'
              ? <h3 className = 'score-counter'>CPU: 0</h3>
              : <h3 className = 'score-counter'>CPU: {computerScore}</h3>
          } 
        </section>
        <button className= 'settings-button' onClick = {function(){setWantsSettings(true)}} > <IoMdSettings/> </button>
        <SettingsModal wantsSettings = {wantsSettings} setWantsSettings = {setWantsSettings} alternateColor = {alternateColor} setAlternateColor = {setAlternateColor} accessibleFont = {accessibleFont} setAccessibleFont = {setAccessibleFont}/>
        <button className= 'help-button' onClick = {function(){setWantsHelp(true)}}>?</button>
        <HelpSection wantsHelp={ wantsHelp } setWantsHelp = {setWantsHelp}/>
        <Modal open = {isOpen} onClose = {handleClose} results = {resultsMessage} speedResult = {speedResult} damageResult = {damageResult} toHitResult = {toHitResult} secondTurnMessage = {secondTurnMessage} secondToHitResult = {secondToHitResult} secondDamageResult = {secondDamageResult} secondResultsMessage = {secondResultsMessage}></Modal>
        <section className = "hud-container">
          <section className ="stat-container">
            <h3 className = "stat-header">PLAYER POKEMON</h3>
            <StatCard pokemon = {playerPokemon}/>
            <h3 className = "stat-header">MOVE</h3>
            <StatCard move = {chosenMove}/>
          </section>
          <section className = "pokemon-info-container">
            <h2 className = 'pokemon-name'> {playerPokemon.name.toUpperCase()} </h2>
            <Image pokemon = {playerPokemon}/>
            <MoveList pokemon = {playerPokemon} pokemonMove = {playerMove} setMove = {setPlayerMove} chosenMove = {chosenMove} setChosenMove = {setChosenMove} isPlayer = {true} round = {round}/>
          </section>
          <div className = 'versus-text'> VS </div>
          <section className = "pokemon-info-container">
            <h2 className = 'pokemon-name'> {computerPokemon.name.toUpperCase()} </h2>
            <Image pokemon = {computerPokemon}/>
            <MoveList pokemon = {computerPokemon} setMove = {setComputerMove} isPlayer = {false} round = {round}/>
          </section>
          <section className ="stat-container">
            <h3 className = "stat-header">CPU POKEMON</h3>
            <StatCard pokemon = {computerPokemon}/>
            <h3 className = "stat-header">MOVE</h3>
            <StatCard move = {computerMove}/>
          </section>
        </section>
        <section className = 'footer'>
          <section className = 'pokemon-button-container'>
            <button className = 'pokemon-button' onClick = {handleFight}> FIGHT</button>
            <button className = 'pokemon-button' onClick = {handleReset}> RESET</button>
          </section>
        </section>
      </div>
    );
  }
  
  else{
    return (
      <div className= {`App ${alternateColor === "true" ? 'alternate-color' : ''} ${accessibleFont === "true" ? 'accessible-font' : ''}`}>
        <p className = "loading-text"> FETCHING POKEMON...</p>
      </div>
    )
  }
}

export default App;
