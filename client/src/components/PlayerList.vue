<template>
  <section>
      <h2>Player</h2>
      <h3 v-if="selectedPlayer">{{selectedPlayer.name}}</h3>
        <b-button @click="showModal">Select Player</b-button>
        <b-modal ref="player-modal">
          <div v-if="players">
              <label for="players">Select Player: </label>
              <select @change="selectPlayer" v-model="name" name="players" id="players">
              
                <player v-for="(player, index) in players" :key="index" :player="player"/>
                
              </select>
            </div>
          <form v-on:submit.prevent="handleSubmit">
            
            <h3>New Player</h3>
              <label for="name">Player Name:</label>
              <input type="text" id="name" name="name" v-model="name" required/>
<!-- v-if="name !== player.name"  -->
              <input ref="close" type="submit" name="submit" value="Save" @click="closeModal"/>
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

  props: ['players', 'selected-player'],

  data() {
    return {
      name: '',
      time: 0,
      moves: 0
    };
  },
  methods: {
    handleSubmit() {
      eventBus.$emit('submit-player', this.$data)
      .then(name = '')
    },

    selectPlayer() {
      eventBus.$emit('select-player', this.$data)
      .then(name = '')
    },

    showModal() {
      this.$refs['player-modal'].show()
    },

    closeModal() {
      this.$refs['player-modal'].hide()
    }

  }
};
</script>

<style>

</style>