<template>
  <section>
    <b-button @click="showModal">New Player</b-button>
        <b-modal ref="player-modal">
          <form v-on:submit.prevent="handleSubmit">
            <h3>New Player</h3>
              <label for="name">Player Name:</label>
              <input type="text" id="name" name="name" v-model="name" required/>
              <input ref="close" type="submit" name="submit" value="Save" @click="closeModal"/>
          </form>
          </b-modal>
          <b-modal ref="error-modal">
            <h2>Sorry name already taken!</h2>
          </b-modal>
  </section>
</template>

<script>
import {eventBus} from '@/main.js'

export default {
  name: 'player-new',
  props: ['players'],
  data() {
    return {
      name: ''
    };
  },

  mounted() {
    eventBus.$on('player-error', (result) => {
         if (result === true){
           this.errorModal()
         }
       })
  },

  methods: {
     handleSubmit() {
      eventBus.$emit('submit-player', this.$data)
      eventBus.$on('player-error', (result) => {
         if (result === true){
           this.errorModal()
         }
       })
    },

    showModal() {
      this.$refs['player-modal'].show()
    },

    closeModal() {
      this.$refs['player-modal'].hide()
    },

    errorModal(){
    this.$refs['error-modal'].show()
    }
  }

}
</script>

<style>

</style>