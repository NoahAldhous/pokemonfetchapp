import './MoveList.css';
import {useState, useEffect} from 'react'


export default function MoveList({pokemon, pokemonMove, setMove, chosenMove, setChosenMove, isPlayer}){
    const [moves, setMoves] = useState([]);
    

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
            return moves
        }
    }

    useEffect(() => {
        getMoves()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [pokemon]);
    
    useEffect(() => {  
        getMoveData(moves[Math.floor(Math.random() * moves.length)])
   
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [moves]);

    async function getMoveData(move){
        let res = await fetch(move.url);
        let data = await res.json();
        // console.log(data)
        if(data.power === null){
            data.power = 0;
        }
        if(data.accuracy === null){
            data.accuracy = 100;
        }
        // console.log(`name:${data.name} power:${data.power}`)
        setMove({
            name: data.name,
            power: data.power,
            accuracy: data.accuracy
        });
    }
    function handleButtonClick(move, pokemonMove){
        if(isPlayer){
            setChosenMove(pokemonMove)
            document.querySelectorAll(".pokemon-move").forEach((item) => {
                item.classList.forEach((className) => {
                    if(className.startsWith('active-button'))
                    item.classList.remove(className);
                })
            })
            document.querySelector(`.${move.name}`).classList.toggle('active-button');
        }else{
            return null;
        }
    }

    function resetPlayerMove(){
        setMove('')
    }

    if(isPlayer){
        return(
            moves.map((move)=>{
                
                return <h3 onMouseEnter = {function(){getMoveData(move)}} onMouseLeave = {resetPlayerMove} onClick = {function(){handleButtonClick(move, pokemonMove)}} className = {['pokemon-move', `${move.name}`].join(' ')}>
                <div className='move-info'>CHANCE TO HIT: {pokemonMove.accuracy}% POWER: {pokemonMove.power}</div>
                {move.name.toUpperCase()}
                </h3>

            }
            )
        )
    } else{
        return(
            moves.map((move)=>{
                return <h3 className = 'pokemon-move'> {move.name.toUpperCase()}</h3>
            }
            )
        )
    }
}