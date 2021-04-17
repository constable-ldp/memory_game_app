<template>
   
        <option value="">{{player.name}}</option>
    
</template>

<script>
import {eventBus} from '../main.js';

export default {
    name: 'player',
    props: ['player']
}
</script>

<style>

</style>