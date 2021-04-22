<template>
  <section>
      <b-form-select style="width: 50%" @change="changeImages(url)" v-model="url" :options="options" class="mt-3"></b-form-select>
      <card-container :url="url" :assignedCards="cards"/>
  </section>
</template>

<script> 

import CardContainer from './CardContainer.vue'

export default {
    name: 'assign-cards',
    components: {
        'card-container': CardContainer
    },
    data() {
        return {
            images: [
                'alex.png', 'dani.png', 'jael.png', 'kamil.png', 
                'pete.png', 'piotr.png', 'stuart.png', 'tim.png'
            ],
            cards: [],
            url: null,
            cat: "https://api.thecatapi.com/v1/images/search",
            options: [
              { value: null, text: 'Change Card Image', disabled: true},
              {
              "value": "https://api.thecatapi.com/v1/images/search",
              "text": "Cats",
              },
              {
              "value": "https://api.thedogapi.com/v1/images/search",
              "text": "Dogs",
              },
              {
              "value": "classic",
              "text": "Classic",
              }

            ]
            
        }
    },

    created() {
      // this.addImages(8, 'https://api.thecatapi.com/v1/images/search')
      // this.assignIds()
    },
    mounted() {
      this.addImages(this.url)
    },

    methods: {
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

    addImages: function(url) {
      if (url === null) {
        this.assignIds()
      }
      else {
        let imagePromises = []
        for (let i=0; i < 8; i++) {
          imagePromises.push(fetch(url).then((response) => response.json()))
        }
        Promise.all(imagePromises)
        .then((data) => {
          this.images = data.map(imageObject => imageObject[0].url)
          this.assignIds()
        })
      }
    },

    changeImages: function(url) {
      this.cards = []
      if (url === 'classic') {
        this.images = [
          'alex.png', 'dani.png', 'jael.png', 'kamil.png', 
          'pete.png', 'piotr.png', 'stuart.png', 'tim.png'
            ]
        this.assignIds()
      }
      else {
        let imagePromises = []
        for (let i=0; i < 8; i++) {
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
}
</script>

<style>

</style>