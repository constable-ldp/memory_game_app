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
            cards: []
        }
    },

    mounted() {
        this.assignIds()
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
  }
}
</script>

<style>

</style>