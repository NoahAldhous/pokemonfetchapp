import './SettingsModal.css'

export default function SettingsModal({wantsSettings, setWantsSettings, alternateColor, setAlternateColor, accessibleFont, setAccessibleFont}){

    

    function adjustSettings(setting){
        var element = document.getElementsByClassName('App')[0]
        switch(setting){
            case 'color': 
                element.classList.toggle("alternate-color");
                if(alternateColor === "false"){
                    setAlternateColor('true');
                    localStorage.setItem('localAlternateColor', 'true');
                }else{
                    setAlternateColor('false');
                    localStorage.setItem('localAlternateColor', 'false');
                }
                break;
            case 'font':
                element.classList.toggle("accessible-font");
                if(accessibleFont === "false"){
                    setAccessibleFont('true');
                    localStorage.setItem('localAccessibleFont', 'true');
                }else{
                    setAccessibleFont('false');
                    localStorage.setItem('localAccessibleFont', 'false');
                }
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
                        <label for = "color-change">Alternate Color Scheme</label><input type = "checkbox" className = "color-change-checkbox" onChange = {function(){adjustSettings('color')}} checked = { alternateColor === "true" ? true : alternateColor === "false" ? false : false}></input>
                    </div>
                    <div className = 'font-setting'>
                        <label for = "font-change">Accessible Font</label><input type = "checkbox" className = "font-change-checkbox" onChange = {function(){adjustSettings('font')}} checked = { accessibleFont === "true" ? true : accessibleFont === "false" ? false : false}></input>
                    </div>
                    <div className = 'highscore-setting'>Reset Highscore (coming soon)</div>
                    <div className = 'PvP-setting'>Enable 2 Player Mode (coming soon)</div>
                </section>
                <button className = 'close-button' onClick = {function(){setWantsSettings(false)}}>X</button>
            </div>
        </>
    }
}