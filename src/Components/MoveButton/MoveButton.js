import './MoveButton.css'

export default function MoveButton({pokemon}){

    function handleClick(){
        
    }

    return <h3 className = 'pokemon-move'> {pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)].move.name.toUpperCase()}</h3>
}