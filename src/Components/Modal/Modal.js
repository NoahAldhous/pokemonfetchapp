import './Modal.css'

export default function Modal({open, onClose, results, actionReport}){
    if(!open){
        return null;
    } else{
        return (
            <>
            <div className = "modal-overlay" onClick = {onClose}></div>
            <div className = "modal">
                <h3 className = "modal-header">BATTLE REPORT</h3>
                <div className ="modal-report">
                    {actionReport}
                </div>
                <br/>
                <div className = "modal-results">
                    {results}
                </div>
                <button className = "close-button" onClick = {onClose}>X</button>
            </div>
            </>
        )
    }
}