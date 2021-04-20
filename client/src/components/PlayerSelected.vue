<template>
  <section>
      <h3 v-if="selectedPlayer">{{selectedPlayer.player.name}}</h3>
      <h3 v-else>Guest</h3>
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