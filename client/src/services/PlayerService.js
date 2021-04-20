const baseURL = 'http://localhost:3000/api/players/';

export default {
    getPlayers() {
        return fetch(baseURL)
        .then(res => res.json());
    },

    addPlayer(player) {
        return fetch(baseURL, {
            method: 'POST',
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
    },

    updateBooking(player) {
        return fetch(baseURL + player._id, {
          method: 'PUT',
          body: JSON.stringify(player),
          headers: { 
            'Content-Type': 'application/json' 
          }
        })
          .then(res => res.json());
      },
}