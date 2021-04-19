<template>
  <section>
        <b-button @click="showModal">Select Player</b-button>
        <b-modal ref="player-modal">
          <div v-if="players">
              <label for="players">Select Player: </label>
              <select @change="selectPlayer(); closeModal();" v-model="player.name" name="players" id="players">
                <player v-for="(player, index) in players" :key="index" :player="player"/>
                
              </select>
            </div>
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
      player: {
      name: '', 
      time: 0,
      moves: 0
      }      
    };
  },
  methods: {
  
    selectPlayer() {
      eventBus.$emit('select-player', this.$data)
      
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