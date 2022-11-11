import './SettingsModal.css'

export default function SettingsModal({wantsSettings, setWantsSettings}){
    if(!wantsSettings){
        return null;
    }else{
        return <>
            <div className = 'settings-modal-overlay' onClick = {function(){setWantsSettings(false)}}></div>
            <div className = 'settings-modal'>
            <h3 className = 'settings-header'> SETTINGS</h3>
            <button className = 'close-button' onClick = {function(){setWantsSettings(false)}}>X</button>
            </div>
        </>
    }
}