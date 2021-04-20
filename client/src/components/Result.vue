<template>
  <section>
      <!-- <div v-for="(image, index) in this.imagesNew" :key="index">
      <img class="pic" :src="require(`@/assets/imgs/${image}`)">
      </div> -->
      <!-- <h1>Congrats!</h1> -->
      <audio src="../assets/audio/tada.mp3" autoplay controls></audio>
      <h3>Well Done! You did it in {{finalResults.moves}} moves!</h3>
      <h3>And it took you {{finalResults.duration.hours}} Hours, {{finalResults.duration.minutes}} Minutes and {{finalResults.duration.seconds}} Seconds!</h3>
  </section>
</template>

<script>
export default {
  name: 'result',
  props: ['finalResults', 'images'],
  data() {
    return {
      imagesNew: this.$props.images,
    }
  }

}
</script>



<style>
/* <confetti :class="[{'confetti': playerWon}]" v-for="n in 20" :key='n'></confetti> */




</style>