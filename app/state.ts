import { makeAutoObservable } from 'mobx';
import _ from 'lodash';

interface Card {
  color: string;
  isGuessed: boolean;
}

const COLORS = [
  'aqua',
  'lime',
  'olive',
  'turquoise',
  'plum',
  'wheat',

  'tomato',
  'darkorange',
  'crimson',
  'teal',
  'goldenrod',
  'hotpink',

  'royalblue',
  'snow',
  'yellow',
  'sienna',
  'dodgerblue',
  'dimgray',
];

class MatchingPairs {
  colorCount = 6;
  cards: Card[] = [];
  recentlyOpened: number[] = [];
  steps = 0;

  reset(colorCount: number) {
    this.steps = 0;
    this.recentlyOpened = [];
    this.cards = this.cards.map((card) => ({ ...card, isGuessed: false }));

    setTimeout(() => {
      if (colorCount) {
        this.colorCount = colorCount;
      }
      const usedColors = _.shuffle(COLORS).slice(0, this.colorCount);
      this.cards = _.shuffle(_.concat(usedColors, usedColors)).map((color) => ({
        color,
        isGuessed: false,
      }));
    }, 300);
  }

  open(index: number) {
    this.recentlyOpened.push(index);

    if (this.recentlyOpened.length < 2) {
      return;
    }

    const [first, second] = this.recentlyOpened;

    if (this.cards[first].color === this.cards[second].color) {
      this.cards[first].isGuessed = true;
      this.cards[second].isGuessed = true;
      this.recentlyOpened = [];
    } else {
      setTimeout(() => {
        this.steps++;
        this.recentlyOpened = [];
      }, 1000);
    }
  }

  get isWin() {
    return this.cards.length > 0 && this.cards.every((card) => card.isGuessed);
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const game = new MatchingPairs();
