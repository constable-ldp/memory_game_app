<template>
  <section>
        <b-button :disabled="$props.time.seconds !== 0" v-if="!selectedPlayer" @click="showModal">Select Player</b-button>
        <b-button :disabled="$props.time.seconds !== 0" v-else @click="showModal">Change Player</b-button>
        <b-modal ref="player-modal" hide-footer title="Select Player">
          <div v-if="players">
              <label for="players"></label>
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

  props: ['players', 'selected-player', 'time'],

  data() {
    return {
      player: {
      name: '', 
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

<style scoped>
.btn {
  padding: 5px 20px;
  background-color: white;
  color: black;
  border: none;
  font-size: 1.5em;
}

.btn-secondary.disabled{
  padding: 5px 20px;
  background-color: white;
  color: black;
  border: none;
}

</style>