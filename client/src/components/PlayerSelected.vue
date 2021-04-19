<template>
  <section>
      <h2>Player</h2>
      <div v-if="selectedPlayer">
        <h3>{{selectedPlayer.name}}</h3>
        <h4>Time: {{selectedPlayer.time}}</h4>
        <h4>Moves: {{selectedPlayer.moves}}</h4>
      </div>
  </section>
</template>

<script>
export default {
    name: 'player-selected',
    props: ['selected-player']
}
</script>

<style>

</style>