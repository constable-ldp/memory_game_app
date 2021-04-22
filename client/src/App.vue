<template>
  <div class="gameView" id="app">
    <header class="header"><b>MEMORY</b></header>
    <start-game class="gridArea"/>
    <player-selected class="playerSelected" :selected-player="selectedPlayer"/>
    <player-list class="playerList" :players="players" :selected-player="selectedPlayer" :time="time"/>
    <player-new class="newPlayer" :players="players" :time="time"/>
    <stats class="stats" :time="time" :moves="moves"/>
    <leaderboard class="leaderboard"/>
  </div>
</template>

<script>
import PlayerList from '@/components/PlayerList.vue';
import PlayerService from '@/services/PlayerService.js';
import PlayerSelected from '@/components/PlayerSelected.vue';
import PlayerNew from '@/components/PlayerNew.vue';
import StartGame from './components/StartGame.vue';
import Stats from './components/Stats.vue';
import Leaderboard from './components/Leaderboard.vue';
import {eventBus} from '@/main.js';

export default {
  name: 'App',
  components: {
    'player-list': PlayerList,
    'player-selected': PlayerSelected,
    'player-new': PlayerNew,
    'start-game': StartGame,
    'stats': Stats,
    'leaderboard': Leaderboard,
    'start-game': StartGame
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
    eventBus.$on('final-results', (payload) => { 
      if (this.selectedPlayer) {
      const player = this.players.filter(player => player.name === this.selectedPlayer.player.name)
      const playerId = player[0]
      playerId.games.push(payload)
      PlayerService.updatePlayer(playerId)
      }
    })
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
}

.playerList{
  grid-area: playerList;
  background-color: white;
  margin: 4px;
  padding: 4px;
  border-radius: 12px;
  border:2px solid red;
}

.newPlayer {
  grid-area: newPlayer;
  background-color: white;
  margin: 4px;
  padding: 4px;
  border-radius: 12px;
  border:2px solid red;
}
.leaderboard {
  grid-area: leaderboard;
  background-color: white;
  margin: 4px;
  padding: 4px;
  border-radius: 12px;
  
}

.playerSelected {
  grid-area: playerSelected;
  background-color: white;
  margin: 4px;
  padding: 4px;
  border-radius: 12px;
}

.stats {
  grid-area: stats;
  background-color: white;
  margin: 4px;
  padding: 15px;
  border-radius: 12px;
  text-align: justify;
}

.gridArea {
  grid-area: gridArea;
  border-radius: 8px;
  background: black;

  /* background: radial-gradient(circle, rgba(166,241,255,1) 0%, rgba(1,71,246,1) 100%); */
  border-color: white;
  border-radius: 50%;
}

.header {
  grid-area: header;
  font-size: xxx-large;
  color: white;
  background-image: url(./assets/brain.jpg);
  background-size: contain;
  background-position: center;
  border-radius:  70% ;
  margin: 10px 150px;
  line-height: 3;
}

.startGame {
  grid-area: startGame;
  background-color: white;
  margin: 4px;
  padding: 4px;
  border-radius: 12px;
  border:2px solid red;
}

.leaderboard {
  grid-area: leaderboard;
  background-color: white;
  margin: 16px;
  padding: 4px;
  border-radius: 12px;
}

.gameView {
  display: grid;
  background-color: black;
  grid-template-columns: 1fr 3fr 3fr 3fr 3fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "header header header header header header"
    ". . playerList stats . ."
    ". . newPlayer stats . ."
    ". . playerSelected playerSelected . ."
    ". gridArea gridArea gridArea gridArea ." 
    ". gridArea gridArea gridArea gridArea ." 
    ". gridArea gridArea gridArea gridArea ." 
    ". gridArea gridArea gridArea gridArea ."
    ". . leaderboard leaderboard . ." 
}



</style>
