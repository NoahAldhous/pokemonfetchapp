import './StatCard.css'

export default function StatCard({pokemon, move}){

  if(pokemon){
    return <section className = 'pokemon-stat-card'>
      <div className = 'display'> NAME: {pokemon.name.toUpperCase()}</div>
      <div className = 'display'> HP: {pokemon.currenthp}/{pokemon.hp}</div>
      <div className = 'display'> SPEED: {pokemon.speed}</div>
      <div className = 'display'> CRITICAL CHANCE: {pokemon.critChance}%</div>
    </section>
  }else if(move){
    return <section className = 'pokemon-stat-card'>
      <div className = 'display'> NAME: {move.name.toUpperCase()}</div>
      <div className = 'display'> ACCURACY: {move.accuracy}{move.accuracy ? `%` : ''}</div>
      <div className = 'display'> {move.special ? `EFFECT: ${move.special}` : `POWER: ${move.power ? `${move.power}` : ''}`}</div>
    </section>
  }else{
    return null;
  }
}