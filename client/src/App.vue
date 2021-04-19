<template>
  <div id="app">
    <cards/>
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
import Cards from './components/Cards.vue';
import {eventBus} from '@/main.js';


export default {
  name: 'App',
  components: {
    'player-list': PlayerList,
    'cards': Cards,
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

    selectPlayer() {
      eventBus.$on('select-player', (player) => {
        this.selectedPlayer = player
      })
    },

    submitPlayer() {
      eventBus.$on('submit-player', (payload) => {
        let result
        this.players.forEach(player => {
          if (player.name === payload.name) {
            result = true
          }
          });
        if (result === true) {
        eventBus.$emit('player-error', true)
        return;
          } else {
            this.selectedPlayer = payload;
            PlayerService.addPlayer(payload)
            .then(banana => this.players.push(banana))
            eventBus.$emit('player-error', false)
        }
      })
    
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
