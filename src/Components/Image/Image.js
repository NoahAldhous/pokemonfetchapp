import './Image.css'

export default function Image({pokemon}){
    switch(pokemon){
        case '': 
            return <p className = 'noImageText'>No image found, sorry!</p>;

        default:
            return <img className = 'pokemon-image' src = {pokemon.sprites.front_default} alt = {`a sprite of ${pokemon.name}`}/>
    }
}