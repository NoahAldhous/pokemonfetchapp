import './Modal.css'

export default function Modal({open, onClose, results, actionReport}){
    if(!open){
        return null;
    } else{
        return (
            <>
            <div className = "modal-overlay"></div>
            <div className = "modal">
                {actionReport}
                <br/>
                {results}
                <button onClick = {onClose}>close</button>
            </div>
            </>
        )
    }
}