<template>
  <section>
      <h2>Cards</h2>
      <div class="grid">
        <div v-for="(card, index) in this.cards" :key="index">
          <img class="non-flipped" src="../assets/default.png"> 
          <img class="flipped" :src="require(`@/assets/imgs/${card.img}`)">
        </div>
      </div>
  </section>
</template>

<script>

// import CardService from '../services/CardService.js';
import {eventBus} from '@/main.js'

export default {
  name: 'cards',
  data() {
    return {
      cards: [],
      images: [
        'alex.png', 'dani.png', 'jael.png', 'kamil.png', 
        'pete.png', 'piotr.png', 'stuart.png', 'tim.png'
        ]
    }
  },
  mounted() {

    // Extention: 
    // fetchImages will get image from api and replace the data in images.  If greater than 16 chosen or api choosen:
    // Use a if statment to replace the data in images. And a v-if to change the for loop in the html
    // this.fetchImages(),

    this.assignIds()
    eventBus.$emit('fetch-cards', this.cards)
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
          'matching_id': i+this.images.length,
          'matched': false,
        }
        this.cards.push(cardObj)
      }
        for (let j=this.images.length; j < this.images.length*2; j++) {
        let cardObj = {
          'id': j,
          'img': this.images[j-  this.images.length],
          'matching_id': j-this.images.length,
          'matched': false,
        }
        this.cards.push(cardObj)
      }
    },
  },
}

</script>

<style>

.grid {
  display: grid;
  grid: repeat(4, 160px) / auto-flow 115px;
  justify-content: center;
}

.non-flipped, .flipped {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.6s;
  -webkit-transform-style: preserve-3d;
  -moz-transition: 0.6s;
  -moz-transform-style: preserve-3d;
  -o-transition: 0.6s;
  -o-transform-style: preserve-3d;
  -ms-transition: 0.6s;
  -ms-transform-style: preserve-3d;
  transition: 0.6s;
  transform-style: preserve-3d;
  height: 140px;
  width: 80px;
}

.flipped {
  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  position: absolute;
}

</style>