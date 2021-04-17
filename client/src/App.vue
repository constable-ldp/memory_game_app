<template>
  <div id="app">

    <player :players="players"/>
  </div>
</template>

<script>
import Player from '@/components/Player.vue';
import PlayerService from '@/services/PlayerService.js';
import {eventBus} from '@/main.js';

export default {
  name: 'App',
  components: {
    'player': Player
  },
  data() {
    return {
      players: []
    };
  },

  mounted() {
    this.fetchPlayers();

    eventBus.$on('submit-player', (player) => {
      PlayerService.addPlayer(player)
      .then(banana => this.players.push(banana));
    });
  },

  methods: {
    fetchPlayers() {
      PlayerService.getPlayers()
      .then(players => this.players = players);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
