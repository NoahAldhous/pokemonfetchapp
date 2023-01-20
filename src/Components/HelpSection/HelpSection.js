import './HelpSection.css';
import {useState} from 'react';
import DropDownMenu from './DropDownMenu';
import { helpText } from './helpText';

export default function HelpSection({wantsHelp, setWantsHelp}){

    const [expandText, setExpandText] = useState(false);

    function handleDropDown(){
        switch (expandText){
            case true: 
                setExpandText(false);
                break;
            case false:
                setExpandText(true);
                break;
            default: return null;
        }
    }

   if(!wantsHelp){
       return null;
   }else{
       return <>
           <div className = 'help-section-overlay' onClick = {function(){setWantsHelp(false)}}></div>
           <div className = 'help-section'>
               <h2 className = 'help-section-header'>
                WELCOME TO POKEBRAWLZ
               </h2>
               <section className = 'help-section-text-container'>
                <p className = 'help-section-text'>
                        This is a strategic combat game where you fight against a CPU with randomly picked pokemon and randomly picked moves! Which pokemon will come out on top?
                    </p>
                <DropDownMenu/>
                {/* <button className = 'help-section-subheader' onClick = {handleDropDown}>
                    <p className='help-section-button-text'>THE BASICS</p>
                    { expandText
                        ? <p className='help-section-button-text'>▼</p>
                        : <p className='help-section-button-text'>►</p>
                    }
                </button>
                { expandText 
                    ? <p className = 'help-section-text'>
                    The player (you) controls the pokemon on the left.  You have 4 random moves to choose from. 
                    Hovering over the move will show you additional information.
                    Click on the move you want to use, then press the FIGHT button to see the results of the battle!
                    </p>
                    : null
                }
                <button className = 'help-section-subheader'>
                    THE POKEMON
                </button>
                <p className = 'help-section-text'>
                    Each pokemon has different stats, shown next to their picture. Higher stats give a pokemon an edge in battle, but they don't guarantee victory!
                    <br/>
                    <br/>
                    <b>HP</b>: The <b>HIT POINTS</b> of a pokemon. Reduced by opponent's <b>ATTACKS</b>. Once a pokemon's <b>HIT POINTS</b> reach 0, they die. 
                    <br/>
                    <br/>
                    <b>SPEED</b>: How fast a pokemon is. The Pokemon with the higher <b>SPEED</b> is more likely to act first.
                    <br/>
                    <br/>
                    <b>CRITICAL CHANCE</b>: When a pokemon uses an <b>ATTACK</b>, there is a chance it is a <b>CRITICAL HIT</b>. It <b>DOUBLES</b> the <b>DAMAGE</b> dealt to the opponent's <b>HIT POINTS</b>.
                </p>
                <button className = 'help-section-subheader'>
                    THE MOVES
                </button>
                <p className = 'help-section-text'>
                    Every move belongs to one of two categories: it is either an <b>ATTACK</b> or a <b>SPECIAL MOVE</b>. 
                    <br/>
                    <br/>
                    <b>ATTACKS</b> deal damage directly to a pokemon. If they hit, they reduce the opponent's <b>HIT POINTS</b>.
                    <br/>
                    <br/>
                    <b>SPECIAL MOVES</b> don't deal any damage, but affect the <b>STATS</b> of a pokemon. Some weaken the opponent's <b>STATS</b>, others boost your own. 
                    <br/>
                    <br/>
                    <b>ACCURACY</b>: This is the percentage chance that your chosen <b>MOVE</b> will succeed. Most <b>SPECIAL MOVES</b> have an accuracy of 100, whereas <b>ATTACKS</b> are more likely to miss.
                    <br/>
                    <br/>
                    <b>POWER/EFFECT</b>: If a <b>MOVE</b> is an <b>ATTACK</b>, it will have a <b>POWER</b> stat. This is how many <b>HIT POINTS</b> it will take from the opponent if it hits. If the <b>ATTACK</b> is a <b>CRITICAL HIT</b>, the <b>POWER</b> is doubled (for one round only).
                    <br/>
                    <br/>
                    If a <b>MOVE</b> is a <b>SPECIAL MOVE</b>, it will have an <b>EFFECT</b>. How each <b>EFFECT</b> works is detailed below. <b>SPECIAL MOVES</b> always have a <b>POWER</b> of 0, and are not affected by <b>CRITICAL HITS</b>.
                </p>
                <button className = 'help-section-subheader'>
                    SPECIAL EFFECTS
                </button>
                <p className = 'help-section-text'>
                   There are three kinds of SPECIAL MOVES: DEFEND, DODGE and FOCUS.
                   <br/>
                   <br/> 
                   DEFEND: If successful, a DEFEND move reduces your opponent's ATTACK POWER by 50% for the current round.
                   <br/>
                   <br/> 
                   DODGE: If successful, a DODGE move reduces your opponent's ACCURACY by 50% for the current round.
                   <br/>
                   <br/> 
                   FOCUS: If successful, a FOCUS move will increase your Pokemon's critical chance by 20% until the end of your next turn.
                </p>
                <button className = 'help-section-subheader'>
                    THE BATTLE REPORT
                </button>
                <p className = 'help-section-text'>
                        
                </p>
                <button className = 'help-section-subheader'>
                    WHO GOES FIRST?
                </button>
                <p className = 'help-section-text'>
                        
                </p>
                <button className = 'help-section-subheader'>
                    CONTINUING THE FIGHT
                </button>
                <p className = 'help-section-text'>
                        
                </p> */}
               </section>
               <button className = "close-button" onClick = {function(){setWantsHelp(false)}}>X</button>
           </div>
       </>
   }
}