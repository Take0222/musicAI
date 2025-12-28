
export enum Mood {
  Happy = 'ハッピー',
  Sad = '悲しい',
  Chill = 'リラックス',
  Energetic = '元気',
}

export enum Weather {
  Sunny = '晴れ',
  Rainy = '雨',
  Cloudy = '曇り',
  Snowy = '雪',
}

export interface Recommendation {
  songTitle: string;
  artist: string;
  album: string;
  reason: string;
}
