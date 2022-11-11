import './SettingsModal.css'
import { useState } from 'react';

export default function SettingsModal({wantsSettings, setWantsSettings}){
    
    const[alternateColor, setAlternateColor] = useState(false)

    function adjustSettings(setting){
        var element = document.body;
        switch(setting){
            case 'color': 
                element.classList.toggle("alternate-color");
                if(!alternateColor){
                    setAlternateColor(true)
                }else{
                    setAlternateColor(false)
                }
                break;
            case 'font':
                element.classList.toggle("accessible-font");
                break;
            default: return null;
        }
    }


    if(!wantsSettings){
        return null;
    }else{
        return <>
            <div className = 'settings-modal-overlay' onClick = {function(){setWantsSettings(false)}}></div>
            <div className = 'settings-modal'>
                <h3 className = 'settings-header'> SETTINGS</h3>
                <section className = 'settings-list'>
                    <div className = 'color-setting'>
                        <label for = "color-change">change color</label><input type = "checkbox" className = "color-change-checkbox" onChange = {function(){adjustSettings('color')}} checked = { alternateColor ? true : false}></input>
                    </div>
                    <div classsName = 'font-setting'>
                        <label for = "font-change">accessible font</label><input type = "checkbox" className = "font-change-checkbox" onChange = {function(){adjustSettings('font')}}></input>
                    </div>
                </section>
                <button className = 'close-button' onClick = {function(){setWantsSettings(false)}}>X</button>
            </div>
        </>
    }
}