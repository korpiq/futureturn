var rules = {
  "bag-mixing": [
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
  ],
  "game-sizes": {
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
  "tile-features": {
    "fish": "food",
    "artifact": "first to enter gets an artifact card",
    "fruitful": "food",
    "forest": "wood for building or energy",
    "ore": "metal for building",
    "peak": "better visibility to space",
    "cave": "route to other caves in same mountain range"
  },
  "tilesets": {
    "1sea1river4terrain": [
      {
        "name": "sea",
        "color": "blue",
        "material": "water",
        "distribution": [
          {
            "normal": "sea"
          },
          {
            "normal": "sea"
          },
          {
            "normal": "sea"
          },
          {
            "artifact": "sea"
          },
          {
            "normal": "mountain"
          },
          {
            "normal": "lowland"
          }
        ]
      },
      {
        "name": "river",
        "color": "cyan",
        "material": "water",
        "distribution": [
          {
            "normal": "river"
          },
          {
            "normal": "river"
          },
          {
            "normal": "river"
          },
          {
            "normal": "river"
          },
          {
            "normal": "sea"
          }
        ]
      },
      {
        "name": "lowland",
        "color": "lightgreen",
        "material": "terrain",
        "distribution": [
          {
            "normal": "lowland"
          },
          {
            "normal": "lowland"
          },
          {
            "normal": "lowland"
          },
          {
            "artifact": "lowland"
          },
          {
            "normal": "river"
          },
          {
            "normal": "plain"
          }
        ]
      },
      {
        "name": "plain",
        "material": "terrain",
        "distribution": [
          {
            "normal": "plain"
          },
          {
            "normal": "plain"
          },
          {
            "normal": "plain"
          },
          {
            "artifact": "plain"
          },
          {
            "normal": "river"
          },
          {
            "normal": "lowland"
          },
          {
            "normal": "highland"
          }
        ]
      },
      {
        "name": "highland",
        "material": "terrain",
        "distribution": [
          {
            "normal": "highland"
          },
          {
            "normal": "highland"
          },
          {
            "normal": "highland"
          },
          {
            "artifact": "highland"
          },
          {
            "normal": "river"
          },
          {
            "normal": "plain"
          },
          {
            "normal": "mountain"
          }
        ]
      },
      {
        "name": "mountain",
        "material": "terrain",
        "distribution": [
          {
            "normal": "mountain"
          },
          {
            "normal": "mountain"
          },
          {
            "normal": "mountain"
          },
          {
            "artifact": "mountain"
          },
          {
            "normal": "river"
          },
          {
            "normal": "highland"
          },
          {
            "normal": "sea"
          }
        ]
      }
    ],
    "2sea1river4terrain": [
      {
        "name": "deepsea",
        "color": "deepblue",
        "material": "water",
        "distribution": [
          {
            "normal": "deepsea"
          },
          {
            "normal": "deepsea"
          },
          {
            "artifact": "deepsea"
          },
          {
            "normal": "sea"
          },
          {
            "normal": "mountain"
          }
        ]
      },
      {
        "name": "sea",
        "color": "blue",
        "material": "water",
        "distribution": [
          {
            "normal": "sea"
          },
          {
            "normal": "sea"
          },
          {
            "artifact": "sea"
          },
          {
            "normal": "deepsea"
          },
          {
            "normal": "lowland"
          }
        ]
      },
      {
        "name": "river",
        "color": "cyan",
        "material": "water",
        "distribution": [
          {
            "normal": "river"
          },
          {
            "normal": "river"
          },
          {
            "normal": "river"
          },
          {
            "normal": "river"
          },
          {
            "normal": "sea"
          }
        ]
      },
      {
        "name": "lowland",
        "color": "lightgreen",
        "material": "terrain",
        "distribution": [
          {
            "normal": "lowland"
          },
          {
            "normal": "lowland"
          },
          {
            "artifact": "lowland"
          },
          {
            "normal": "river"
          },
          {
            "normal": "plain"
          }
        ]
      },
      {
        "name": "plain",
        "color": "green",
        "material": "terrain",
        "distribution": [
          {
            "normal": "plain"
          },
          {
            "normal": "plain"
          },
          {
            "artifact": "plain"
          },
          {
            "normal": "lowland"
          },
          {
            "normal": "highland"
          }
        ]
      },
      {
        "name": "highland",
        "color": "lightbrown",
        "material": "terrain",
        "distribution": [
          {
            "normal": "highland"
          },
          {
            "normal": "highland"
          },
          {
            "artifact": "highland"
          },
          {
            "normal": "plain"
          },
          {
            "normal": "mountain"
          }
        ]
      },
      {
        "name": "mountain",
        "color": "gray",
        "material": "terrain",
        "distribution": [
          {
            "normal": "mountain"
          },
          {
            "normal": "mountain"
          },
          {
            "artifact": "mountain"
          },
          {
            "normal": "highland"
          },
          {
            "normal": "deepsea"
          }
        ]
      }
    ]
  }
};