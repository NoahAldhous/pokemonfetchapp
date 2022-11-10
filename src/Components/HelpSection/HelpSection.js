import './HelpSection.css';

export default function HelpSection({wantsHelp, setWantsHelp}){
   if(!wantsHelp){
       return null;
   }else{
       return <>
           <div className = 'help-section-overlay' onClick = {function(){setWantsHelp(false)}}></div>
           <div className = 'help-section'>
               <h3 className = 'help-section-header'>
                WELCOME TO POKEBRAWLZ
               </h3>
               <section className = 'help-section-text-container'>
                <p className = 'help-section-text'>
                        This is a strategic combat game where you fight against a CPU with randomly picked pokemon and randomly picked moves! Which pokemon will come out on top?
                    </p>
                <h3 className = 'help-section-subheader'>
                    THE BASICS
                </h3>
                <p className = 'help-section-text'>
                    The player (you) controls the pokemon on the left.  You have 4 random moves to choose from. 
                    Hovering over the move will show you additional information.
                    Click on the move you want to use, then press the FIGHT button to see the results of the battle!
                </p>
                <h3 className = 'help-section-subheader'>
                    THE POKEMON
                </h3>
                <p className = 'help-section-text'>
                    Each pokemon has different stats, shown next to their picture. Higher stats give a pokemon an edge in battle, but don't guarantee victory!
                    <br/>
                    <br/>
                    HP: The HIT POINTS of a pokemon. Reduced by opponent's ATTACKS.
                    <br/>
                    <br/>
                    SPEED: How fast a pokemon is. The Pokemon with the higher SPEED is more likely to act first.
                    <br/>
                    <br/>
                    CRITICAL CHANCE: When a pokemon uses an ATTACK, there is a chance it is a CRITICAL HIT. It DOUBLES the DAMAGE dealt to the opponent's HIT POINTS. This chance can be increased by using a FOCUS MOVE.
                </p>
                <h3 className = 'help-section-subheader'>
                    THE MOVES
                </h3>
                <p className = 'help-section-text'>
                        
                </p>
                <h3 className = 'help-section-subheader'>
                    SPECIAL EFFECTS
                </h3>
                <p className = 'help-section-text'>
                        
                </p>
                <h3 className = 'help-section-subheader'>
                    THE BATTLE REPORT
                </h3>
                <p className = 'help-section-text'>
                        
                </p>
                <h3 className = 'help-section-subheader'>
                    WHO GOES FIRST?
                </h3>
                <p className = 'help-section-text'>
                        
                </p>
                <h3 className = 'help-section-subheader'>
                    CONTINUING THE FIGHT
                </h3>
                <p className = 'help-section-text'>
                        
                </p>
               </section>
               <button className = "close-button" onClick = {function(){setWantsHelp(false)}}>X</button>
           </div>
       </>
   }
}