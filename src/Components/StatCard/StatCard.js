import './StatCard.css'

export default function StatCard({pokemon, move}){
    return <section className = 'move-info-container'>
    <div className = 'hp-display'> HP: {pokemon.currenthp}/{pokemon.hp}</div>
    <div className = 'speed-display'> SPEED: {pokemon.speed}</div>
    <div className = 'move-name-display'> MOVE CHOSEN: {move.name}</div>
    <div className = 'move-accuracy-display'> ACCURACY: {move.accuracy}</div>
    <div className = 'move-power-display'> POWER: {move.power}</div>
  </section>
}