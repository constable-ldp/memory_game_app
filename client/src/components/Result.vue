<template>
  <section>
      <audio src="@/assets/audio/Ta-Dah-For.mp3" autoplay></audio>
      <h3>Well Done! You did it in {{finalResults.moves}} moves!</h3>
      <h3>And it took you {{finalResults.duration.hours}} Hours, {{finalResults.duration.minutes}} Minutes and {{finalResults.duration.seconds}} Seconds!</h3>
  </section>
</template>

<script>
export default {
  name: 'result',
  props: ['finalResults'],

}
</script>



<style>
/* <confetti :class="[{'confetti': playerWon}]" v-for="n in 20" :key='n'></confetti> */




</style>