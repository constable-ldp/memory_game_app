use memory_game;

db.dropDatabase();

db.players.insertMany([
    {
        "name": "Vitor Amandio",
        // "duration": 0,
        // "moves": 10,
        "finalResults":[ {
          duration, 
          move
        }]
      },
    {
        "name": "Calum Gunn",
        "game": { 
          "duration": {
            "hours": 0,
            "minutes": 1,
            "seconds": 24
          },
          "moves": 26
        },
        "game": { 
          "duration": {
            "hours": 0,
            "minutes": 1,
            "seconds": 24
          },
          "moves": 26
        },

      },
    {
        "name": "Luke Constable",
        "duration": 0,
        "moves": 8
      },
    {
        "name": "Michael McColl",
        "duration": 0,
        "moves": 9
      }
]);