import './Modal.css'

export default function Modal({open, onClose, results, speedResult, damageResult, toHitResult, secondTurnMessage, secondToHitResult, secondDamageResult, secondResultsMessage}){
    if(!open){
        return null;
    } else{
        return (
            <>
            <div className = "modal-overlay" onClick = {onClose}></div>
            <div className = "modal">
                <h3 className = "modal-header">BATTLE REPORT</h3>
                <div className = "modal-text-container">
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
                    <div>
                        {secondTurnMessage}
                    </div>
                    <br/>
                    <div>
                        {secondToHitResult}
                    </div>
                    <br/>
                    <div>
                        {secondDamageResult}
                    </div>
                    <br/>
                    <div>
                        {secondResultsMessage}
                    </div>
                    <br/>
                    <div className = "modal-results">
                        {results}
                    </div>
                </div>
                <button className = "close-button" onClick = {onClose}>X</button>
            </div>
            </>
        )
    }
}