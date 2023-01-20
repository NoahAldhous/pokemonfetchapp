import './DropDownMenu.css'
import { helpText } from './helpText';
import DropDownMenuButton from './DropDownMenuButton';

export default function DropDownMenu(){

    return <>
            {
                helpText.map((subject) => {
                    return <DropDownMenuButton subject = {subject}/>
                })
            }
    </>

};
