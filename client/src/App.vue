<template>
  <div id="app">

    <player-selected :selected-player="selectedPlayer"/>
    <player-list :players="players" :selected-player="selectedPlayer"/>
    <player-new :players="players"/>
  </div>
</template>

<script>
import PlayerList from '@/components/PlayerList.vue';
import PlayerService from '@/services/PlayerService.js';
import PlayerSelected from '@/components/PlayerSelected.vue';
import PlayerNew from '@/components/PlayerNew.vue';

import {eventBus} from '@/main.js';

export default {
  name: 'App',
  components: {
    'player-list': PlayerList,
    'player-selected': PlayerSelected,
    'player-new': PlayerNew
  },
  data() {
    return {
      players: [],
      selectedPlayer: null
    };
  },

  mounted() {
    this.fetchPlayers();
    this.submitPlayer();
    this.selectPlayer();
  },

  methods: {

    fetchPlayers() {
      PlayerService.getPlayers()
      .then(players => this.players = players);
    },

    submitPlayer() {
      eventBus.$on('submit-player', (player) => {
      this.selectedPlayer = player
      PlayerService.addPlayer(player)
      .then(banana => this.players.push(banana))
    });

    },

    selectPlayer() {
      eventBus.$on('select-player', (player) => {
        this.selectedPlayer = player
      });
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
