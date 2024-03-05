'use client';

import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { game } from '@/app/state';
import cx from 'clsx';

export const Game = observer(() => {
  useEffect(() => {
    game.reset(game.colorCount);
  }, []);

  return (
    <main className="m-12 text-center">
      <nav className="fixed top-2 left-2">
        <ul className="flex gap-2">
          <li>
            <button className="bg-slate-300 px-4 py-1 rounded" onClick={() => game.reset(6)}>
              6 colors
            </button>
          </li>
          <li>
            <button className="bg-slate-300 px-4 py-1 rounded" onClick={() => game.reset(12)}>
              12 colors
            </button>
          </li>
          <li>
            <button className="bg-slate-300 px-4 py-1 rounded" onClick={() => game.reset(18)}>
              18 colors
            </button>
          </li>
        </ul>
      </nav>
      <p className="mb-4">Steps: {game.steps}</p>
      <ul className="flex items-center justify-center flex-wrap gap-4">
        {_.map(Array.from(game.cards), ({ color, isGuessed }, index) => (
          <li key={index}>
            <button
              className={cx('card', {
                'mini-card': game.cards.length > 12,
                'micro-card': game.cards.length > 24,
                'is-open': isGuessed || game.recentlyOpened.includes(index),
                'is-guessed': isGuessed,
              })}
              style={{ backgroundColor: color }}
              disabled={isGuessed || game.recentlyOpened.includes(index) || game.recentlyOpened.length >= 2}
              onClick={() => game.open(index)}
            >
              {color}
            </button>
          </li>
        ))}
      </ul>
      {game.isWin && (
        <div className="mt-6">
          <p>You win!</p>
          <button className="px-4 py-1 rounded bg-slate-100" onClick={() => game.reset(game.colorCount)}>
            Play Again
          </button>
        </div>
      )}
    </main>
  );
});
