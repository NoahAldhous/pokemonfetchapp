import './Modal.css'

export default function Modal({open, onClose, results, speedResult, damageResult, toHitResult}){
    if(!open){
        return null;
    } else{
        return (
            <>
            <div className = "modal-overlay" onClick = {onClose}></div>
            <div className = "modal">
                <h3 className = "modal-header">BATTLE REPORT</h3>

                <br/>
                <div className ="modal-report">
                    {speedResult}
                </div>
                <br/>
                <div>
                    {toHitResult}
                </div>
                <br/>
                <div>
                    {damageResult}
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