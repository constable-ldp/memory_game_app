<template>
  <section>
      <h2>Stats</h2>
      <h3>Time:</h3>
      <div v-if="time.hours === 0">
        <div v-if="time.minutes<10">
          <h3 v-if="time.seconds<10">0{{time.minutes}}:0{{time.seconds}}</h3>
          <h3 v-else>0{{time.minutes}}:{{time.seconds}}</h3>
        </div>
        <div v-else>
          <h3 v-if="time.seconds<10">{{time.minutes}}:0{{time.seconds}}</h3>
          <h3 v-else>{{time.minutes}}:{{time.seconds}}</h3>
        </div>
      </div>
      <div v-else>
        <div v-if="time.minutes<10">
          <h3 v-if="time.seconds<10">{{time.hours}}:0{{time.minutes}}:0{{time.seconds}}</h3>
          <h3 v-else>{{time.hours}}:0{{time.minutes}}:{{time.seconds}}</h3>
        </div>
        <div v-else>
          <h3 v-if="time.seconds<10">{{time.hours}}:{{time.minutes}}:0{{time.seconds}}</h3>
          <h3 v-else>{{time.hours}}:{{time.minutes}}:{{time.seconds}}</h3>
        </div>
      </div>
      <div>
        <h3>Moves: {{moves}}</h3>
        
      </div>
      <button @click="moveCounter">Move</button>
      <button @click="stopTimer">Stop Timer</button>
  </section>
</template>

<script>
export default {
  name: 'stats',
  data() {
    return {
      time: {
        seconds: 0,
        minutes: 0,
        hours: 0,
        },
      timeInterval: null,
      finalTime: {},
      moves: 0
    }
  },
  mounted() {

  },
  methods: {

    startTimer: function() {
      this.timeInterval = setInterval(() => {
        this.time.seconds += 1
      if(this.time.seconds === 60){
        this.time.minutes += 1
        this.time.seconds = 0
      }
      if(this.time.minutes === 60){
        this.time.hours += 1
        this.time.minutes = 0
      }
      }, 1000)
      },

  moveCounter: function(){
    this.moves += 1;
    if(this.moves === 1){
        this.startTimer();
    }
  },
    stopTimer: function() {
      clearInterval(this.timeInterval)
      this.finalTime = this.time
    }
  }
}
</script>

<style>

</style>