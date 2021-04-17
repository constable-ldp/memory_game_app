<template>
  <section>
      <h2>Player</h2>
      <b-button @click="showModal">Select Player</b-button>
      <b-modal ref="player-modal">
        <div v-if="players">
            <label for="players">Select Player: </label>
            <select name="players" id="players">
            
              <player v-for="(player, index) in players" :key="index" :player="player"/>
              
            </select>
          </div>
        <form v-on:submit.prevent="handleSubmit">
          
          <h1>New Player</h1>
            <label for="name">Player Name:</label>
            <input type="text" id="name" name="name" v-model="name" required/>

            <input type="submit" name="submit" value="Save" />
        </form>
      </b-modal>
  </section>
</template>

<script>
import { eventBus } from '@/main';
import Player from './Player.vue';


export default {
  name: 'player-list',
  components: {
    'player': Player
  },
  props: ['players'],

  data() {
    return {
      name: ''
    };
  },
  methods: {
    handleSubmit() {
      eventBus.$emit('submit-player', this.$data);
      this.name = '';
    
    },

    showModal() {
      this.$refs['player-modal'].show()
    }
  }
};
</script>

<style>

</style>