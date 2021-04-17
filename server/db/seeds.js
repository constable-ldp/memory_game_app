use memory_game;

db.dropDatabase();

db.players.insertMany([
    {
        "name": "Vitor Amandio",
        "time": 0,
        "moves": 10
      },
    {
        "name": "Calum Gunn",
        "time": 0,
        "moves": 11
      },
    {
        "name": "Luke Constable",
        "time": 0,
        "moves": 8
      },
    {
        "name": "Michael McColl",
        "time": 0,
        "moves": 9
      }
]);