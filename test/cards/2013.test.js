module.exports = [
  {
    mahjong: [
      'N E E W W W S S S S 2K 0 1K 3K',
      'N E E W W W S S S S 2B DD 1B 3B',
      'N E E W W W S S S S 2D 0 1D 3D'
    ],
    counts: [
      {
        rack: 'N F E F W W F S S S 3K 0 1K 3K',
        count: 10
      }
    ],
    permutations: 3
  },
  {
    mahjong: [
      'F F 2K 0 1K 3K 1B 1B 1B 1B 3D 3D 3D 3D',
    ],
    counts: [
      {
        rack: 'N F E F W W F S S S 3K 0 1K 3K',
        count: 5
      }
    ],
    permutations: 6
  },
  {
    mahjong: [
      'F F F F 2K 2K 2K 2K DD DD 0 0 1K 3K',
    ],
    counts: [
      {
        rack: 'F F E F 4K 2K 2B 2K RD DD 0 N 1K 3K',
        count: 9
      }
    ],
    permutations: 3
  },

  {
    mahjong: [
      '2B 2B 4B 4B 4B GD GD GD GD 6B 6B 6B 8B 8B'
    ],
    counts: [
      {
        rack: '2B 2B 4B 4B 4B RD DD GD GD 6B 6B 6B F 8B',
        count: 11
      }
    ],
    permutations: 3
  },
  {
    mahjong: [
      '2B 2B 4B 4B 6B 6B 8D 8D 8D 8D 8K 8K 8K 8K',
    ],
    counts: [
      {
        rack: '2B 2B 4B 4B 6B 6B 8D 8D 8D 8D 8K 8K 8K 7K',
        count: 13
      },
      {
        rack: '2B 1B 4B 4B 6B 6B 8D 2D 8D 8D 8K 8K 8K 7K',
        count: 11
      }
    ],
    permutations: 6
  },
  {
    mahjong: [
      'F F 2B 2B 2B 2B 4D 4D 6D 6D 8B 8B 8B 8B',
    ],
    counts: [
      {
        rack: 'F F 3B 2B 2B 2B 4D 4D 6D 6D 8B 8B 8B 8B',
        count: 13
      },
      {
        rack: 'N F 3B 2B 2B 2B 4D 5D 6D 6D 8B 8B 8B 8K',
        count: 10
      }
    ],
    permutations: 6
  },
  {
    mahjong: [
      '2B 2B 2B 4B 4B 4B 4B 6D 6D 6D 8D 8D 8D 8D',
    ],
    counts: [
      {
        rack: 'F F 3B 2B 2B 2B 4D 4D 6D 6D 8B 8B 8B 8B',
        count: 6
      },
      {
        rack: 'N F 2B 2B 2B 4B 4B 5D 6D 6D 8D 8B 8B 8K',
        count: 8
      }
    ],
    permutations: 6
  },
  {
    mahjong: [
      '2B 2B 4B 4B 4B 4D 4D 6D 6D 6D 8K 8K 8K 8K',
    ],
    counts: [
      {
        rack: 'F F 3B 2B 2B 2B 4D 4D 6D 6D 8B 8B 8B 8B',
        count: 8
      },
      {
        rack: 'N F 2B 2B 2B 4B 4B 5D 6D 6D 8D 8B 8B 8K',
        count: 7
      }
    ],
    permutations: 6
  },
  {
    mahjong: [
      'F F 2B 2B 2B 4B 4B 4B 6B 6B 6B 8B 8B 8B',
    ],
    counts: [
      {
        rack: 'F F 3B 2B 2B 2B 4D 4D 6D 6D 8B 8B 8B 8B',
        count: 8
      },
      {
        rack: 'N F 2B 2B 2B 4B 4B 5D 6D 6D 8D 8B 8B 8K',
        count: 8
      }
    ],
    permutations: 3
  },

  // LIKE NUMBERS
  {
    mahjong: [
      'F F 1B 1B 1B 1B 1D 1D 1D 1D 1K 1K 1K 1K'
    ],
    counts: [
      {
        rack:'F F 2B 2B 1B 5B 1D 5D 5D 2D 1K 2K 2K 2K',
        count: 8
      },
      {
        rack: 'F F 1B 1B 1B 1B 1D 1D 1D 1D 1K 1K 1K 1D',
        count: 13
      }
    ],
    permutations: 6*9
  },
  {
    mahjong: [
      '1B 1B DB DB 1D 1D 1D DD DD DD 1K 1K 1K 1K',
      '4B 4B DB DB 4D 4D 4D DD DD DD 4K 4K 4K 4K'
    ],
    counts: [
      {
        rack:'F F 2B 2B DB 5B 2D 2D DD 2D 1K 2K 2K 2K',
        count: 10
      },
      {
        rack: 'F F 1B 1B 1B 1B 1D 1D 1D 1D 1K 1K 1K 1D',
        count: 9
      }
    ],
    permutations: 6*9
  },

  // SEVEN HANDS
  {
    mahjong: [
      'F F F F 1B 1B 1B 1B 6D 6D 7K 7K 7K 7K',
      'F F F F 1B 1B 1B 1B 6B 6B 7B 7B 7B 7B'
    ],
    counts: [
      {
        rack:'F F 1K 1K DB 5B 2D 2D DD 2D 1K 6K 7K 2K',
        count: 7
      },
      {
        rack: 'F F 1B 1B 1B 1B 6D 6D 1K 1K 7K 7K 7K 7D',
        count: 11
      }
    ],
    permutations: 3+6
  },
  {
    mahjong: [
      'F F F F 2B 2B 2B 2B 5D 5D 7K 7K 7K 7K',
      'F F F F 2B 2B 2B 2B 5B 5B 7B 7B 7B 7B'
    ],
    counts: [
      {
        rack:'F F 2K 2K DB 6B 1D 1D DD 1D 2K 5K 7K 1K',
        count: 7
      },
      {
        rack: 'F F 2B 2B 2B 2B 5D 5D 2K 2K 7K 7K 7K 7D',
        count: 11
      }
    ],
    permutations: 3+6
  },
  {
    mahjong: [
      'F F F F 3B 3B 3B 3B 4D 4D 7K 7K 7K 7K',
      'F F F F 3B 3B 3B 3B 4B 4B 7B 7B 7B 7B'
    ],
    counts: [
      {
        rack:'F F 3K 3K DB 6B 1D 1D DD 1D 3K 4K 7K 1K',
        count: 7
      },
      {
        rack: 'F F 3B 3B 3B 3B 4D 4D 3K 3K 7K 7K 7K 7D',
        count: 11
      }
    ],
    permutations: 3+6
  },

/*
  // QUINTS
  {
    mahjong: [
      '3B 4B 4B 5B 4D 4D 4D 4D 4D 4K 4K 4K 4K 4K'
    ],
    counts: [
      {
        rack:'F 3K 3K 4K 5K 3B 3D 3D W W N 3B N F',
        count: 8
      },
      {
        rack:'F 3K 3K 4K 5K 3B 3D 3D DD 1D 3K 3B 7K 1K',
        count: 8
      }
    ],
    permutations: 42*3
  },
  {
    mahjong: [
      'N N N N N DD DD DD DD 1K 1K 1K 1K 1K',
      'N N N N N RD RD RD RD 3K 3K 3K 3K 3K',
    ],
    counts: [
      {
        rack:'N DK DK DK N N 3D 3D W W N 3B N F',
        count: 10
      },
      {
        rack:'E E E 4K 4K RD RD RD DD RD 4K 3B 7K 1K',
        count: 10
      }
    ],
    permutations: 4*3*3*9
  },
  {
    mahjong: [
      'F F F F 1D 1D 1D 1D 1D 2B 2B 2B 2B 2B',
      'F F F F 4D 4D 4D 4D 4D 5B 5B 5B 5B 5B',
    ],
    counts: [
      {
        rack:'N DK DK DK N N 3D 3D W W N 3B N F',
        count: 3
      },
      {
        rack:'F F E 4K 4K 5D 5D 5D 5D 4D 4K 3B 7K 1K',
        count: 9
      }
    ],
    permutations: 8*6
  },
  {
    mahjong: [
      '3B 3B 3B 3B 3B 4B 4B 4B 4B 5B 5B 5B 5B 5B'
    ],
    counts: [
      {
        rack:'N 4K 4K 4K N N 3K 3K W W N 3B N F',
        count: 5
      },
      {
        rack:'F F E 4K 4K 5K 5K 5K 5K 4K 4K 6B 6K 1K',
        count: 9
      }
    ],
    permutations: 7*3
  },*/


  // CONSECUTIVE RUN
  {
    mahjong: [
      '1B 1B 2B 2B 2B 3B 3B 3B 3B 4B 4B 4B 5B 5B',
      '5D 5D 6D 6D 6D 7D 7D 7D 7D 8D 8D 8D 9D 9D'
    ],
    counts: [
      {
        rack: '1B 1D 2B 7K 5B 4B 4D 5B 3B 8B 6K 3K 1B F',
        count: 7
      }
    ],
    permutations: 6
  },
  {
    mahjong: [
      '1B 1B 1B 2B 2B 2B 2B 3K 3K 3K 4K 4K 4K 4K',
      '4B 4B 4B 5B 5B 5B 5B 6K 6K 6K 7K 7K 7K 7K'
    ],
    counts: [
      {
        rack: '1B 1B 2B 7K 5B 4D 4D 5B 3D 8B 6K 3K 1B F',
        count: 7
      }
    ],
    permutations: 6*6
  },
  {
    mahjong: [
      'F F F F 1B 1B 1B 1B 2B 2B 2B 2B DB DB'
    ],
    counts: [
      {
        rack: '1D 1D 2D 7K 5B 4D 4D 5B 3D 8B 6K 3K 1D F',
        count: 5
      }
    ],
    permutations: 8*3
  },
  {
    mahjong: [
      '1B 1B 1B 1B 2D 2D 2B 2B 2K 2K 3B 3B 3B 3B'
    ],
    counts: [
      {
        rack: '1D 1D 2D 7K 1B 4D 4D 5B 3D 8B 7K 3K 1D F',
        count: 5
      }
    ],
    permutations: 6*7
  },
  {
    mahjong: [
      'F F 3D 3D 3D 3D 4B 4B 4B 4B 5K 5K 5K 5K'
    ],
    counts: [
      {
        rack: '1D 1D 2D 7K 1B 4D 4D 5B 3D 8B 7K 3K 1D F',
        count: 5
      }
    ],
    permutations: 6*7
  },
  {
    mahjong: [
      '3B 3B 3B 4B 4B 4B 5D 5D 5D 6D 6D 6D DK DK'
    ],
    counts: [
      {
        rack: '1D 1D F 7K 3B 3D 4B DB W 8B DK 1K 1D F',
        count: 6
      }
    ],
    permutations: 6*6
  },

  // 13579
  {
    mahjong: [
      '1B 1B 3B 3B 3B 5B 5B 5B 5B 7B 7B 7B 9B 9B'
    ],
    counts: [
      {
        rack: '1B 1B 5K 3B 3B 5B 5B 9B 8B 7B 7B 7B 9B 9B',
        count: 11
      }
    ],
    permutations: 3
  },
  {
    mahjong: [
      '1B 1B 1B 3B 3B 3B 3B 3D 3D 3D 5D 5D 5D 5D',
      '5B 5B 5B 7B 7B 7B 7B 7D 7D 7D 9D 9D 9D 9D'
    ],
    counts: [
      {
        rack: '1B 1B 5K 3B 3B 5D 5D 9B 8B 7B 7B 7B 9B 9B',
        count: 8
      }
    ],
    permutations: 6*2
  },
  {
    mahjong: [
      'F F F F 1B 1B 1B 1B 3B 3B 5B 5B 5B 5B',
      'F F F F 5D 5D 5D 5D 7D 7D 9D 9D 9D 9D',
    ],
    counts: [
      {
        rack: 'F F F 1B 1B 5K 5D 9B 8B 7B 7B 7B 9B 9B',
        count: 8
      }
    ],
    permutations: 3*2
  },
  {
    mahjong: [
      '1B 1B 3B 3B 3B DD DD DD DD 3K 3K 3K 5K 5K',
      '5B 5B 7B 7B 7B DD DD DD DD 7K 7K 7K 9K 9K',
    ],
    counts: [
      {
        rack: 'F F F 1B 1B 5K 5D 9B 8B 7B 7B 7B 9B 9B',
        count: 6
      }
    ],
    permutations: 6*2
  },
  {
    mahjong: [
      '1B 1B 1B 1B 3K 3K 5K 5K 7K 7K 9B 9B 9B 9B'
    ],
    counts: [
      {
        rack: 'F F F 1B 1B 5K 5D 9B 8B 7B 7B 7B 9B 9B',
        count: 6
      }
    ],
    permutations: 6
  },
  {
    mahjong: [
      '1B 1B 3B 3B 1K 1K 3K 3K 5K 5K 1D 1D 1D 1D',
      '1B 1B 3B 3B 1K 1K 3K 3K 5K 5K 5D 5D 5D 5D'
    ],
    counts: [
      {
        rack: 'F F W 1B 1B 5D 5D 9B 8B 5B 3B 7B 9B 9B',
        count: 6
      }
    ],
    permutations: 6*3
  },
  {
    mahjong: [
      '5B 5B 7B 7B 5K 5K 7K 7K 9K 9K 5D 5D 5D 5D',
      '5B 5B 7B 7B 5K 5K 7K 7K 9K 9K 9D 9D 9D 9D'
    ],
    counts: [
      {
        rack: 'F F W 1B 1B 5D 5D 9B 8B 5B 3B 7B 9B 9B',
        count: 6
      }
    ],
    permutations: 6*3
  },
  {
    mahjong: [
      '1B 1B 1B 3B 5B 5B 5B 1K 1K 1K 3K 5K 5K 5K',
      '5B 5B 5B 7B 9B 9B 9B 5K 5K 5K 7K 9K 9K 9K'
    ],
    counts: [
      {
        rack: 'F F W 1B 1B 5D 5D 9B 8B 5B 3B 7B 9B 9B',
        count: 7
      }
    ],
    permutations: 6*2
  },

  // WINDS - DRAGONS
  {
    mahjong: [
      'N N N N E E E E W W W W S S'
    ],
    counts: [
      {
        rack: 'W N E DD N E S RD RD RD 1K 2K 3K 4D',
        count: 6
      }
    ],
    permutations: 1
  },
  {
    mahjong: [
      'F F 0 0 0 0 N E W S RD RD RD RD'
    ],
    counts: [
      {
        rack: 'F F DD DD N E S RD RD RD 1K 2K 3K 4D',
        count: 10
      }
    ],
    permutations: 6
  },
  {
    mahjong: [
      'N N N N S S S S 1B 1B 1B 1B 1B 1B',
      'N N N N S S S S 3B 3B 3B 3B 3B 3B',
    ],
    counts: [
      {
        rack: 'N N DD DD N E S E RD RD 1K 2K 1K 4D',
        count: 6
      }
    ],
    permutations: 3*5
  },
  {
    mahjong: [
      'E E E E W W W W 4B 4B 4B 4B 4B 4B',
      'E E E E W W W W 8B 8B 8B 8B 8B 8B'
    ],
    counts: [
      {
        rack: 'E W DD DD N E S E RD RD 6K 2K 6K 4D',
        count: 6
      }
    ],
    permutations: 3*4
  },
  {
    mahjong: [
      'F F N N N N E E W W S S S S',
    ],
    counts: [
      {
        rack: 'F F DD F N W 4K DD RD 2D 6B S S E',
        count: 7
      }
    ],
    permutations: 1
  },
  {
    mahjong: [
      'F F F F DD DD DD DD RD RD GD GD GD GD',
    ],
    counts: [
      {
        rack: 'F F DD F N W 4K DD RD 2D 6B S S E',
        count: 6
      }
    ],
    permutations: 6
  },

  // 369
  {
    mahjong: [
      'F F 3D 3D 3D 6D 6D 9D 9D 9D DD DD DD DD'
    ],
    counts: [
      {
        rack: 'F F DD F N W 3D DD DD 2D 9D S S E',
        count: 7
      }
    ],
    permutations: 3
  },
  {
    mahjong: [
      '3B 3B 3B 6B 6B 6B 6B 6D 6D 6D 9D 9D 9D 9D'
    ],
    counts: [
      {
        rack: 'F F 3D F N W 3D 6D 6D 6B 9B S S E',
        count: 6
      }
    ],
    permutations: 6
  },
  {
    mahjong: [
      '3B 3B 3B 6B 6B 6B 9D 9D 9D 9D 9K 9K 9K 9K'
    ],
    counts: [
      {
        rack: 'F F 3D F N W 3D 6D 6D 9B 9B 9K S E',
        count: 7
      }
    ],
    permutations: 6
  },
  {
    mahjong: [
      'F F 3B 3B 3B 3B 6B 6B 6B 6B 9B 9B 9B 9B',
      'F F 3B 3B 3B 3B 6D 6D 6D 6D 9K 9K 9K 9K'
    ],
    counts: [
      {
        rack: 'F F 3D F N W 3D 6D 6D 9B 9B 9K S E',
        count: 6
      }
    ],
    permutations: 6+3
  },
  {
    mahjong: [
      '3B 3B 6B 6B 6B 3D 3D 6D 6D 6D 9K 9K 9K 9K'
    ],
    counts: [
      {
        rack: 'F F 3D F N W 3D 6D 6D 9B 9B 9K S E',
        count: 6
      }
    ],
    permutations: 6
  },
  {
    mahjong: [
      '3B 3B 6B 6B 3D 3D 6D 6D 9D 9D 3K 3K 3K 3K',
      '3B 3B 6B 6B 3D 3D 6D 6D 9D 9D 9K 9K 9K 9K'
    ],
    counts: [
      {
        rack: 'F F 3D F N W 3D 6D 6D 9B 9B 9K S E',
        count: 7
      }
    ],
    permutations: 6*3
  },


  // SINGLES AND PAIRS
  {
    mahjong: [
      'F F 1B 1B 2B 2B 3B 3B 4B 4B 5B 5B GD GD'
    ],
    counts: [
      {
        rack: 'F F 1B 1B 2B 2B 3B 3B 4B 4B 5B 5B GD RD',
        count: 13
      }
    ],
    permutations: 3
  },
  {
    mahjong: [
      'N N E E W W S S 4B 4B 5B 5B 6B 6B',
      'N N E E W W S S 4K 4K 5K 5K 6K 6K',
      'N N E E W W S S 1B 1B 2B 2B 3B 3B'
    ],
    counts: [
      {
        rack: 'N E W S W E N S 3K 5K 6K F F F',
        count: 10
      }
    ],
    permutations: 7*3
  },
];
