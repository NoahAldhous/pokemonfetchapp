import { useState } from 'react';

export default function DropDownMenuButton({ subject }){

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

    return <>
        <button className = 'help-section-button' onClick = {handleDropDown}>
            <p className='help-section-button-text'>{subject.header}</p>
            { expandText
                ? <p className='help-section-button-text'>▼</p>
                : <p className='help-section-button-text'>►</p>
            }
        </button>
        { expandText 
            ? <p className = 'help-section-text'>
                {subject.text}
            </p>
            : null
        }   
    </>
};