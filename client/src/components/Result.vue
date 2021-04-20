<template>
  <section>
      <h2>Result {{finalResults.duration.seconds}}</h2>
  </section>
</template>

<script>
export default {
  name: 'result',
  props: ['finalResults']

}
</script>

<style>

</style>