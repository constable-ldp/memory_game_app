<template>
  <section>
    <b-button @click="showModal">New Player</b-button>
        <b-modal ref="player-modal">
          <form v-on:submit.prevent="handleSubmit">
            <h3>New Player</h3>
              <label for="name">Player Name:</label>
              <input type="text" id="name" name="name" v-model="player.name" required/>
              <input ref="close" type="submit" name="submit" value="Save" @click="closeModal"/>
          </form>
          </b-modal>
  </section>
</template>

<script>
import {eventBus} from '@/main.js'

export default {
  name: 'player-new',
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
    handleSubmit() {
      eventBus.$emit('submit-player', this.$data)
    },

    showModal() {
      this.$refs['player-modal'].show()
    },

    closeModal() {
      this.$refs['player-modal'].hide()
    }
  }

}
</script>

<style>

</style>