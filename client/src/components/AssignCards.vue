<template>
  <card-logic :assignedCards="cards"/>
</template>

<script>
import CardLogic from './CardLogic.vue'

export default {
    name: 'assign-cards',
    components: {
        'card-logic': CardLogic
    },
    data() {
        return {
            images: [
                'alex.png', 'dani.png', 'jael.png', 'kamil.png', 
                'pete.png', 'piotr.png', 'stuart.png', 'tim.png'
            ],
            // images: ["https://cdn2.thecatapi.com/images/bss.jpg", "https://cdn2.thecatapi.com/images/bss.jpg"],
            cards: [],
            image: null
        }
    },

    created() {
      // this.addImages(8, 'https://api.thecatapi.com/v1/images/search')
      // this.assignIds()
    },
    mounted() {
      this.addImages(8, 'https://api.thecatapi.com/v1/images/search')
      // this.assignIds()
      
    },

    methods: {

      // https://api.thecatapi.com/v1/images/search
      // https://api.thedogapi.com/v1/images/search

      

    
      assignIds: function() {
      // this.addImages(8, 'https://api.thecatapi.com/v1/images/search')
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

    addImages: function(number, url) {
        let imagePromises = []
        for (let i=0; i < number; i++) {
          imagePromises.push(fetch(url).then((response) => response.json()))
        }
        Promise.all(imagePromises)
        .then((data) => {
          this.images = data.map(imageObject => imageObject[0].url)
          this.assignIds()
      })
    }
  }
}
</script>

<style>

</style>