var rules = {
  "tileTypes": [
    {
      "name": "sea",
      "material": "water",
      "every nth tile is a": {
        "fish": 4,
        "artifact": 6
      }
    },
    {
      "name": "river",
      "material": "water",
      "every nth tile is a": {
        "fish": 6,
        "artifact": 6
      }
    },
    {
      "name": "lowland",
      "material": "terrain",
      "every nth tile is a": {
        "spring": 8,
        "fruitful": 8,
        "artifact": 6
      }
    },
    {
      "name": "plain",
      "material": "terrain",
      "every nth tile is a": {
        "spring": 8,
        "forest": 8,
        "artifact": 6
      }
    },
    {
      "name": "highland",
      "material": "terrain",
      "every nth tile is a": {
        "spring": 6,
        "ore": 8,
        "artifact": 6
      }
    },
    {
      "name": "mountain",
      "material": "terrain",
      "every nth tile is a": {
        "spring": 6,
        "ore": 6,
        "peak": 6,
        "artifact": 6,
        "cave": 8
      }
    }
  ],
  "tileFeatures": {
    "fish": "food",
    "artifact": "first to enter gets an artifact card",
    "fruitful": "food",
    "forest": "wood for building or energy",
    "ore": "metal for building",
    "peak": "better visibility to space",
    "cave": "route to other caves in same mountain range"
  },
  "gameSizes": {
    "players": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ],
    "sides": [
      5,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15
    ],
    "equator": [
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2
    ],
    "hexes": [
      34,
      79,
      98,
      119,
      142,
      167,
      194,
      223,
      254
    ],
    "hex/player": [
      34,
      39,
      32,
      29,
      28,
      27,
      27,
      27,
      28
    ],
    "tiles/bag": [
      6,
      14,
      17,
      20,
      24,
      28,
      33,
      38,
      43
    ]
  },
  "bagMixing": [
    {
      "from": "river",
      "to": "each bag for terrain material",
      "one tile of every": 5
    },
    {
      "from": "each bag for terrain material",
      "to": "bag for next higher terrain",
      "one tile of every": 5
    },
    {
      "from": "each bag for terrain material",
      "to": "bag for next lower terrain",
      "one tile of every": 5
    },
    {
      "from": "sea",
      "to": "mountain",
      "one tile of every": 10
    },
    {
      "from": "lowland",
      "to": "sea",
      "one tile of every": 10
    }
  ]
};