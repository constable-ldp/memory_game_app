<template>
  <section>
    <b-button @click="showModal">Leaderboard</b-button>
    <b-modal ref="leaderboard">    
    <h2>Leaderboard</h2>
    <hr>
      <table>
          <tr>
              <th>Player</th>
              <th>Best Time</th>
              <th>Least Moves</th>
          </tr>
      </table>
      </b-modal>
  </section>
</template>

<script>
export default {
  name: 'leaderboard-modal',
  methods: {
    showModal() {
      this.$refs['leaderboard'].show()
    },
  }
}
</script>

<style scoped>
.btn {
  background-color: transparent;
  padding: 5px 20px;
  color: black;
  border: none;
  font-size: 1.5em;
}

.btn-secondary.disabled{
  padding: 5px 20px;
  background-color: white;
  color: black;
  border: none;
}
</style>