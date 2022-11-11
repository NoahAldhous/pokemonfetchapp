import './StatCard.css'

export default function StatCard({pokemon, move}){

  if(pokemon){
    return <section className = 'pokemon-stat-card'>
      <div className = 'name-display'> NAME: {pokemon.name.toUpperCase()}</div>
      <div className = 'hp-display'> HP: {pokemon.currenthp}/{pokemon.hp}</div>
      <div className = 'speed-display'> SPEED: {pokemon.speed}</div>
      <div className = 'crit-display'> CRITICAL CHANCE: {pokemon.critChance}%</div>
    </section>
  }else if(move){
    return <section className = 'pokemon-stat-card'>
    <div className = 'name-display'> NAME: {move.name.toUpperCase()}</div>
    <div className = 'move-accuracy-display'> ACCURACY: {move.accuracy}{move.accuracy ? `%` : ''}</div>
    <div className = 'move-power-display'> {move.special ? `EFFECT: ${move.special}` : `POWER: ${move.power ? `${move.power}` : ''}`}</div>
  </section>
  }else{
    return null;
  }
}