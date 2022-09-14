import './MoveList.css';
import {useState, useEffect} from 'react'


export default function MoveList({pokemon, setPlayerMove}){
    const [moves, setMoves] = useState([])
    

    function getMoves(){
        let moveList = []
        if(pokemon){
            for(let i = 0 ; i < 4 ; i++){
                let move = pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)].move;
                moveList.push(move);
            }
            setMoves(moveList)
        }
    }

    useEffect(() => {
        getMoves()
      }, [pokemon]);
    

    async function getMoveData(move){
        let res = await fetch(move.url);
        let data = await res.json();
        console.log(`name:${data.name} power:${data.power}`)
        setPlayerMove(data.name);
    }


    return(
        moves.map((move)=>{
            return <h3 onClick = {function(){getMoveData(move)}} className = 'pokemon-move'> {move.name.toUpperCase()}</h3>
        }
        )
    )
}