<template>
  <section>
    <b-button :disabled="$props.time.seconds !== 0" @click="showModal">New Player</b-button>
        <b-modal ref="player-modal" title="New Player" hide-footer>
          <form v-on:submit.prevent="handleSubmit">
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
  props: ['players', 'time'],
  data() {
    return {
        name: '',
        games: []
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