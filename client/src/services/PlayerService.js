const baseURL = 'http://localhost:3000/api/players/';

export default {
    getPlayer(player) {
        return fetch(baseURL + player._id)
        .then(res => res.json())
    },

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

    updatePlayer(player) {
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