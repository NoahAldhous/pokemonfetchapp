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
        <div className = 'help-section-button-container'>
            <button className = 'help-section-button' onClick = {handleDropDown}>
                <p className='help-section-button-text'>{subject.header}</p>
                { expandText
                    ? <p className='help-section-button-text'>▼</p>
                    : <p className='help-section-button-text'>►</p>
                }
            </button>
        </div>
        { expandText 
            ? <section>
                {subject.text.map( (blockOfText) => {
                    return <>
                        <p className = 'help-section-text'>{blockOfText}</p>
                    </>
                } )}
            </section>
            : null
        }   
    </>
};