<template>
  <div id="app">
    <stats :time="time" :moves="moves"/>
    <assign-cards/>
    <player-selected :selected-player="selectedPlayer"/>
    <player-list :players="players" :selected-player="selectedPlayer" :time="time"/>
    <player-new :players="players" :time="time"/>
  </div>
</template>

<script>
import PlayerList from '@/components/PlayerList.vue';
import PlayerService from '@/services/PlayerService.js';
import PlayerSelected from '@/components/PlayerSelected.vue';
import PlayerNew from '@/components/PlayerNew.vue';
import AssignCards from './components/AssignCards.vue';
import Stats from './components/Stats.vue';
import {eventBus} from '@/main.js';



export default {
  name: 'App',
  components: {
    'player-list': PlayerList,
    'player-selected': PlayerSelected,
    'player-new': PlayerNew,
    'stats': Stats,
    'assign-cards': AssignCards
  },
  data() {
    return {
      players: [],
      selectedPlayer: null,
      time: {
        seconds:0,
        minutes:0,
        hours:0
        },
      moves: 0
    };
  },


  mounted() {
    this.fetchPlayers();
    this.submitPlayer();
    this.selectPlayer();
    this.getTime();
    this.getMoves();
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
            this.selectedPlayer = {player :  payload};
            PlayerService.addPlayer(payload)
            .then(response => this.players.push(response))
            eventBus.$emit('player-error', false)
        }
      })
    
  },
  getTime() {
    eventBus.$on('time', (payload) => this.time = payload)
  },
  getMoves() {
    eventBus.$on('moves', (payload) => this.moves = payload)
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
