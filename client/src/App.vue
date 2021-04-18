<template>
  <div id="app">
    <player-list :players="players"/>
    <cards />
  </div>
</template>

<script>
import PlayerList from '@/components/PlayerList.vue';
import PlayerService from '@/services/PlayerService.js';
import {eventBus} from '@/main.js';

import Cards from './components/Cards.vue';


export default {
  name: 'App',
  components: {
    'player-list': PlayerList,
    'cards': Cards
  },
  data() {
    return {
      // cards: [],
      players: [],
      selectedPlayer: null
    };
  },
  // created() {
  //   this.fetchCards()
  // },

  mounted() {
    
    this.fetchPlayers();

    eventBus.$on('submit-player', (player) => {
      this.selectedPlayer = player
      PlayerService.addPlayer(player)
      .then(banana => this.players.push(banana))
    });

    
    
  },

  methods: {
    fetchPlayers() {
      PlayerService.getPlayers()
      .then(players => this.players = players);
    },

    // fetchCards() {
    //   eventBus.$on('fetch-cards', (cards) => this.cards = cards)}    
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
