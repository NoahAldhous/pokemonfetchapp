import './PlayerMoveList.css';
import {useState, useEffect} from 'react'


export default function MoveList({pokemon, setComputerMove}){
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [pokemon]);
    

    async function getMoveData(move){
        let res = await fetch(move.url);
        let data = await res.json();
        if(data.power === null){
            data.power = 0;
        }
        console.log(`name:${data.name} power:${data.power}`)
        setComputerMove({
            name: data.name,
            power: data.power
        });
    }


    return(
        moves.map((move)=>{
            return <h3 onClick = {function(){getMoveData(move)}} className = 'pokemon-move'> {move.name.toUpperCase()}</h3>
        }
        )
    )
}