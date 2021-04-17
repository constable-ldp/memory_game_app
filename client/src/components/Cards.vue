<template>
  <section>
      <h2>Cards</h2>

      <div v-for="(card, index) in this.cards" :key="index">
        <img class="non-flipped" src="../assets/default.png"> 
        <img class="flipped" :src="require(`@/assets/imgs/${card.img}`)">
      </div>
  </section>
</template>

<script>

// import CardService from '../services/CardService.js';

export default {
  name: 'cards',
  data() {
    return {
      cards: [],
      images: [
        'alex.png', 'dani.png', 'jael.png', 
        'kamil.png', 'pete.png', 'piotr.png',
        'stuart.png', 'tim.png'
        ]
    }
  },
  mounted() {

    // Extention: 
    // fetchImages will get image from api and replace the data in images.  If greater than 16 chosen or api choosen:
    // Use a if statment to replace the data in images. And a v-if to change the for loop in the html
    // this.fetchImages(),

    this.assignIds()
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

img {
  height: 150px;
  width: 100px
}

</style>