import './HelpSection.css';
import DropDownMenu from './DropDownMenu';

export default function HelpSection({wantsHelp, setWantsHelp}){

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
               </section>
               <button className = "close-button" onClick = {function(){setWantsHelp(false)}}>X</button>
           </div>
       </>
   }
}