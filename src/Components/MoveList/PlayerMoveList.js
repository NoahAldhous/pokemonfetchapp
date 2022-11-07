import './PlayerMoveList.css';
import {useState, useEffect} from 'react'


export default function MoveList({pokemon, setPlayerMove}){
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
        if(data.power === null){
            data.power = 0;
        }
        console.log(`name:${data.name} power:${data.power}`)
        setPlayerMove({
            name: data.name,
            power: data.power
        });
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




    return(
        moves.map((move)=>{
            return <h3 onClick = {function(){getMoveData(move)}} className = {['pokemon-move', `${move.name}`].join(' ')}> {move.name.toUpperCase()}</h3>
        }
        )
    )
}