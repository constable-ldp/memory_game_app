<template>
  <section>
    <button @click="win()">Win!</button>
    <div> 
      <button :disabled="waiting" @click="resetGame">
        <b-icon class="reset-icon" icon="arrow-clockwise" font-scale="3"></b-icon>
      </button>
    </div>
    <div class="grid">
      <div class="grid-card" v-for="(card, index) in this.cards" :key="index">
        <button :disabled="card.flipped || waiting" :class="{ 'flipped': card.flipped }" @click="move(card)">
          <div class="on-top">
            <img class="pic" :src="card.img">
            <img class="codeclan" src="../assets/default.png">
          </div>
        </button>
      </div>
    </div>
    <b-modal ref='result-show' hide-footer hide-header>
      <div class="confetti" v-for="n in 20" :key='n'></div>
      <results :finalResults="finalResults" :images="images"/>
    </b-modal>
  </section>
</template>

<script>

import Result from './Result.vue';
import AssignCards from './AssignCards.vue';
import {eventBus} from '@/main.js';

export default {
  name: 'card-logic',
  components: { 
    'assign-cards': AssignCards,
    'results': Result,
    },
  props: ['assignedCards'],
  data() {
    return {
      cards: this.$props.assignedCards,
      selectedCard: null,
      waiting: false,
      time: {
        seconds: 0,
        minutes: 0,
        hours: 0,
        },
      timeInterval: null,
      moves: 0,
      finalResults: null,
      images: [],
      duration: 0
    }
  },

  computed:{
    matches: function(){
      return this.cards.filter((card) => {
        return card.matched
      });
    },
    result: function(){
      return this.matches.length
    },
  },

  watch: {
    result: function() {
      if (this.result === this.cards.length){
        this.$refs['result-show'].show()
        this.finalResults = {
          duration: this.duration, 
          moves: this.moves
          }
        clearInterval(this.timeInterval)
        eventBus.$emit('final-results', this.finalResults)
      }
      else {
        this.$refs['result-show'].hide()
        
    }
  }
  },

  mounted() {
    this.resetGame()
  },

  methods: {
    flip: function(card) {
      if (card.flipped) {
        card.flipped = false
      }
      else {
        card.flipped = true
      }
    },

    move: async function(card) {
      this.flip(card)
      if (!this.selectedCard){
        this.selectedCard = card
      }
      else {
        if (card.matchingId === this.selectedCard.id) {
          card.matched = true
          this.cards.filter(card => card.id === this.selectedCard.id).forEach(card => card.matched = true)
        }
        else {
          const delay = milliseconds => new Promise(res => setTimeout(res, milliseconds));
          this.waiting = true
          await delay(800);
          this.waiting = false
          this.flip(card)
          this.cards.filter(card => card.id === this.selectedCard.id)
          .forEach(card => {
            this.waiting = true
            delay(800)
            this.waiting = false
            this.flip(card)
            })
        }
        this.selectedCard = null
        this.moveCounter()
      }   
    },

    shuffle: function (cards) {
      for (let i = cards.length - 1; i > 0; i--) {
        const randomCard = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[randomCard]] = [cards[randomCard], cards[i]];
      }
    },

    startTimer: function() {
      this.timeInterval = setInterval(() => {
        this.time.seconds += 1
        this.duration += 1
        eventBus.$emit('time', this.time)
      if(this.time.seconds === 60){
        this.time.minutes += 1
        this.time.seconds = 0
      }
      if(this.time.minutes === 60){
        this.time.hours += 1
        this.time.minutes = 0
      }
      }, 1000)
      },

    moveCounter: function(){
      this.moves += 1
      eventBus.$emit('moves', this.moves)
      if(this.moves === 1){
          this.startTimer();
      }
    },

    resetGame: async function(){
      this.cards.forEach(card => {
        card.flipped = false
        card.matched = false
      })
      this.selectedCard = null
      this.moves = 0
      this.time = {
        seconds: 0,
        minutes: 0,
        hours: 0,
        }
      this.duration = 0
      eventBus.$emit('time', this.time)
      eventBus.$emit('moves', this.moves)
      clearInterval(this.timeInterval)
      const delay = milliseconds => new Promise(res => setTimeout(res, milliseconds))
      this.waiting = true
      await delay(800)
      this.waiting = false
      this.shuffle(this.cards)
    },

    // resultShow: function(){
    //   if (this.result === this.cards.length){
    //     this.$refs['result-show'].show()
    //     this.finalResults = {
    //       duration: this.time, 
    //       moves: this.moves
    //       }
    //     clearInterval(this.timeInterval)
    //     eventBus.$emit('final-results', this.finalResults)
    //   }
    //   else {
    //     this.$refs['result-show'].hide()
    //   }
    // },
    win: function() {
      this.cards.forEach(card => {
        card.flipped = true
        card.matched = true
      })
    }
  }
}

</script>

<style>

button {
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    margin: 0px auto;
}

.grid {
  display: grid;
  grid: repeat(4, 140px) / auto-flow 140px;
  /* 20vw */
  justify-content: center;
  background-color: black;
  /* @media (max-width: 530px) {... */
}

.grid-card {
  align-self: left;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:black;
}

.on-top{
  position: relative;
  height: 100px;
  width: 100px;
}

.codeclan, .pic {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.8s;
  -webkit-transform-style: preserve-3d;
  -moz-transition: 0.8s;
  -moz-transform-style: preserve-3d;
  -o-transition: 0.8s;
  -o-transform-style: preserve-3d;
  -ms-transition: 0.8s;
  -ms-transform-style: preserve-3d;
  transition: 0.8s;
  transform-style: preserve-3d;
  height: 100px;
  width: 100px;
  position:absolute;
  top:0;
  left:0;
}

.pic {
  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  position: absolute; 
  
}

.flipped .pic {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  transform: rotateY(0deg);
}

.flipped .codeclan {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  transform: rotateY(180deg);
  }

.reset {
  cursor: pointer;
}

@keyframes confetti {
  0% {
    transform: rotateZ(15deg) rotateY(0deg) translate(0, 0);
  }
  20% {
    transform: rotateZ(5deg) rotateY(180deg) translate(-5vw, 20vh);
  }
  40% {
    transform: rotateZ(15deg) rotateY(360deg) translate(5vw, 60vh);
  }
  60% {
    transform: rotateZ(5deg) rotateY(540deg) translate(-10vw, 80vh);
  }
  80% {
    transform: rotateZ(15deg) rotateY(720deg) translate(-10vw, 100vh);
  }
  100% {
    transform: rotateZ(5deg) rotateY(900deg) translate(15vw, 130vh);
  }
}
.confetti {
  width: 100px;
  height: 100px;
  background-image: url('../assets/default.png');
  background-size: contain;
  position: absolute;
  top: 6%;
  left: 50%;
  animation: confetti 5s linear 2s infinite;
  transform-origin: left top;
  z-index: 1;
}
.confetti:nth-child(1) {
  /* background-color: rgb(242, 215, 78); */
  background-image: url('../assets/default.png');
  background-size: contain;
  top: 6%;
  left: 10%;
  animation-delay: 1s;
}
.confetti:nth-child(2n) {
  /* background-color: rgb(77, 182, 243); */
  background-image: url('../assets/imgs/alex.png');
  background-size: contain;
  top: 6%;
  left: 20%;
  animation-delay: 5s;
}
.confetti:nth-child(3n + 3) {
  /* background-color: rgba(40, 246, 47, 1); */
  background-image: url('../assets/imgs/dani.png');
  background-size: contain;
  top: 6%;
  left: 30%;
  animation-delay: 3s;
}
.confetti:nth-child(4n + 4) {
  /* background-color: rgb(213, 78, 242); */
  background-image: url('../assets/imgs/jael.png');
  background-size: contain;
  top: 6%;
  left: 40%;
  animation-delay: 2.5s;
}
.confetti:nth-child(5n + 5) {
  /* background-color: rgb(77, 182, 243); */
  background-image: url('../assets/imgs/kamil.png');
  background-size: contain;
  top: 6%;
  left: 50%;
  animation-delay: 4s;
}
.confetti:nth-child(6n + 6) {
  /* background-color: rgba(40, 246, 47, 1); */
  background-image: url('../assets/imgs/pete.png');
  background-size: contain;
  top: 6%;
  left: 60%;
  animation-delay: 6s;
}
.confetti:nth-child(7n + 7) {
  /* background-color: rgb(242, 215, 78); */
  background-image: url('../assets/imgs/piotr.png');
  background-size: contain;
  top: 6%;
  left: 70%;
  animation-delay: 1.5s;
}
.confetti:nth-child(8n + 8) {
  /* background-color: rgb(77, 182, 243); */
  background-image: url('../assets/imgs/stuart.png');
  background-size: contain;
  top: 6%;
  left: 80%;
  animation-delay: 2s;
}
/* /* .confetti:nth-child(9n + 9) {
  background-color: rgba(40, 246, 47, 1);
  background-image: url('../assets/imgs/tim.png');
  background-size: contain;
  top: -10%;
  left: 90%;
  animation-delay: 3.5s;
} */
.confetti:nth-child(10n + 10) {
  /* background-color: rgb(213, 78, 242); */
  background-image: url('../assets/default.png');
  background-size: contain;
  top: 6%;
  left: 0%;
  animation-delay: 1.5s;
} 

.reset-icon {
  background: rgb(1,71,246);
  background: radial-gradient(circle, rgba(166,241,255,1) 0%, rgb(246, 1, 1) 100%);
  border-color: white;
  border-radius: 50%;
  padding: 10px;
  margin: 10px;
}
</style>