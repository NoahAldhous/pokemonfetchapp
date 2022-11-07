import './PlayerMoveList.css';
import {useState, useEffect} from 'react'


export default function MoveList({pokemon, playerMove, setPlayerMove, chosenMove, setChosenMove}){
    const [moves, setMoves] = useState([]);
    const [activeButton, setActiveButton] = useState('');
    

    function getMoves(){
        let moveList = []
        if(pokemon){
            for(let i = 0 ; i < 4 ; i++){
                let currentMove = pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)].move;
                for(let i = 0; i < moveList.length; i++){
                    if(moveList[i] === currentMove){
                        currentMove = pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)].move;
                        console.log(currentMove)
                    }
                }
                moveList.push(currentMove);
            }
            setMoves(moveList);
        }
    }

    useEffect(() => {
        getMoves()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [pokemon]);
    

    async function getMoveData(move){
        let res = await fetch(move.url);
        let data = await res.json();
        console.log(data)
        if(data.power === null){
            data.power = 0;
        }
        if(data.accuracy === null){
            data.accuracy = 100;
        }
        console.log(`name:${data.name} power:${data.power}`)
        setPlayerMove({
            name: data.name,
            power: data.power,
            accuracy: data.accuracy
        });
    }
    function handleButtonClick(move, playerMove){
        setChosenMove(playerMove)
        setActiveButton(move.name);
        console.log(activeButton);
        document.querySelectorAll(".pokemon-move").forEach((item) => {
            item.classList.forEach((className) => {
                if(className.startsWith('active-button'))
                item.classList.remove(className);
            })
        })
        document.querySelector(`.${move.name}`).classList.toggle('active-button');
    }

    function resetPlayerMove(){
        setPlayerMove('')
    }

    return(
        moves.map((move)=>{
            
            return <h3 onMouseEnter = {function(){getMoveData(move)}} onMouseLeave = {resetPlayerMove} onClick = {function(){handleButtonClick(move, playerMove)}} className = {['pokemon-move', `${move.name}`].join(' ')}>
            <div className='move-info'>CHANCE TO HIT: {playerMove.accuracy}% POWER: {playerMove.power}</div>
             {move.name.toUpperCase()}
             </h3>

        }
        )
    )
}