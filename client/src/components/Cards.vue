<template>
  <section>
      <h2>Cards</h2>

      <div v-for="(card, index) in this.cards" :key="index">
        <img class="non-flipped" src="../assets/default2.png"> 
        <img class="flipped" :src="card.img">
      </div>
  </section>
</template>

<script>

import CardService from '../services/CardService.js';

export default {
  name: 'cards',
  data() {
    return {
      cards: [],
      images: []
    }
  },
  mounted() {
    this.fetchImages(),
    this.assignIds()
  },
  methods: {
    fetchImages: function(){
      CardService.getImages()
      .then(images => this.images = images.img);
    },

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
    }
  },

}

</script>

<style>

</style>