use memory_game;

db.dropDatabase();

db.players.insertMany([
    {
        "name": "Vitor Amandio",
        "games": []
      },
    {
        "name": "Calum Gunn",
        "games": []

      },
    {
        "name": "Luke Constable",
        "games": []
      },
    {
        "name": "Michael McColl",
        "games": []
      }
]);