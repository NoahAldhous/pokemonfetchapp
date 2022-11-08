import './HelpSection.css';

export default function HelpSection({wantsHelp, setWantsHelp}){
   if(!wantsHelp){
       return null;
   }else{
       return <>
           <div className = 'help-section-overlay'></div>
           <div className = 'help-section'>
               <h3 className = 'help-section-header'> WELCOME TO POKEBRAWLZ</h3>
               <p className = 'help-section-text'> This is a strategic combat game blah blah blah</p>
               <button className = "close-button" onClick = {function(){setWantsHelp(false)}}>X</button>
           </div>
       </>
   }
}