<template>
  <section>
      <h2>Cards</h2>
      <div class="grid">
        <div class="grid-card" v-for="(card, index) in this.cards" :key="index">
          <button :disabled="card.flipped || waiting" :class="{ 'flipped': card.flipped }" @click="move(card)">
            <div class="on-top">
              <img class="pic" :src="require(`@/assets/imgs/${card.img}`)">
              <img class="codeclan" src="../assets/default.png">
            </div>
          </button>
        </div>
      </div>
  </section>
</template>

<script>

export default {
  name: 'cards',
  data() {
    return {
      cards: [],
      images: [
        'alex.png', 'dani.png', 'jael.png', 'kamil.png', 
        'pete.png', 'piotr.png', 'stuart.png', 'tim.png'
        ],
      selectedCard: null,
      waiting: false
    }
  },
  mounted() {

    // Extention: 
    // fetchImages will get image from api and replace the data in images.  If greater than 16 chosen or api choosen:
    // Use a if statment to replace the data in images. And a v-if to change the for loop in the html
    // this.fetchImages(),

    this.assignIds()
    this.shuffle(this.cards)
  },

  methods: {
    // fetchImages: function(){
    //   CardService.getImages()
    //   .then(images => this.images = images.img);
    // },

    assignIds: function() {
      for (let i=0; i < this.images.length; i++) {
        let cardObj = {
          'id': i,
          'img': this.images[i],
          'matchingId': i+this.images.length,
          'matched': false,
          'flipped': false
        }
        this.cards.push(cardObj)
      }
        for (let j=this.images.length; j < this.images.length*2; j++) {
        let cardObj = {
          'id': j,
          'img': this.images[j-  this.images.length],
          'matchingId': j-this.images.length,
          'matched': false,
          'flipped': false
        }
        this.cards.push(cardObj)
      }
    },

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
      }   
    },

    shuffle: function (cards) {
      for (let i = cards.length - 1; i > 0; i--) {
        const randomCard = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[randomCard]] = [cards[randomCard], cards[i]];
    }
}



    // var second = 0, minute = 0; hour = 0;
    // var timer = document.querySelector(".timer");
    // var interval;
    // function startTimer(){
    // interval = setInterval(function(){
    //     timer.innerHTML = minute+"mins "+second+"secs";
    //     second++;
    //     if(second == 60){
    //         minute++;
    //         second=0;
    //     }
    //     if(minute == 60){
    //         hour++;
    //         minute = 0;
    //     }
    // },1000);
  },
}

</script>

<style>

.grid-card button {
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
}

.grid-card {
  align-self: left;
  display: flex;
  align-items: center;
  justify-content: center;
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

</style>