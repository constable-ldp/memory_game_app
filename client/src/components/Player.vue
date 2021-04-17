<template>
  <section>
      <h2>Player</h2>
      <b-button @click="showModal">Add Player</b-button>
      <b-modal ref="player-modal">
        <form v-on:submit.prevent="handleSubmit">
          <h1>Add a booking</h1>
            <label for="name">Player Name:</label>
            <input type="text" id="name" name="name" v-model="name" required/>

            <input type="submit" name="submit" value="Save" />
  </form>
      </b-modal>
  </section>
</template>

<script>
import { eventBus } from '@/main';

export default {
  name: 'player-form',
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