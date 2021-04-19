<template>
  <section>
      <div v-if="time.hours===0">
        <div v-if="time.minutes<10">
          <h3 v-if="time.seconds<10">Time: 0{{time.minutes}}:0{{time.seconds}}</h3>
          <h3 v-else>Time: 0{{time.minutes}}:{{time.seconds}}</h3>
        </div>
        <div v-else>
          <h3 v-if="time.seconds<10">Time: {{time.minutes}}:0{{time.seconds}}</h3>
          <h3 v-else>Time: {{time.minutes}}:{{time.seconds}}</h3>
        </div>
      </div>
      <div v-else>
        <div v-if="time.minutes<10">
          <h3 v-if="time.seconds<10">Time: {{time.hours}}:0{{time.minutes}}:0{{time.seconds}}</h3>
          <h3 v-else>Time: {{time.hours}}:0{{time.minutes}}:{{time.seconds}}</h3>
        </div>
        <div v-else>
          <h3 v-if="time.seconds<10">Time: {{time.hours}}:{{time.minutes}}:0{{time.seconds}}</h3>
          <h3 v-else>Time: {{time.hours}}:{{time.minutes}}:{{time.seconds}}</h3>
        </div>
      </div>
      <div>
        <h3>Moves: {{moves}}</h3>
      </div>
  </section>
</template>

<script>

export default {
  name: 'stats',
  props: ['time', 'moves']
}

</script>

<style>

</style>