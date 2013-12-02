module.exports = [
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
    ]
  },
  {
    mahjong: [
      '1B 1B 3B 3B 3B 5B 5B 5B 5B 7B 7B 7B 9B 9B'
    ],
    counts: [
      {
        rack: '1B 1B 5K 3B 3B 5B 5B 9B 8B 7B 7B 7B 9B 9B',
        count: 11
      }
    ]
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
    ]
  },
  {
    mahjong: [
      'F F 1B 1B 2B 2B 3B 3B 4B 4B 5B 5B GD GD'
    ],
    counts: [
      {
        rack: 'F F 1B 1B 2B 2B 3B 3B 4B 4B 5B 5B GD RD',
        count: 13
      }
    ]
  },
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
    ]
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
    ]
  },
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
    ]
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
    ]
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
    ]
  }
];
