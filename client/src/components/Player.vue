<template>
    <option :value="player.name">{{player.name}}</option>
</template>

<script>

export default {
    name: 'player',
    props: ['player']
}
</script>

<style>

</style>