use memory_game;

db.dropDatabase();

db.players.insertMany([
    {
        "name": "Vitor Amandio",
        "duration": 0,
        "moves": 10
      },
    {
        "name": "Calum Gunn",
        "duration": 0,
        "moves": 11
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