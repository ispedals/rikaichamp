const fs = require('fs');

import { deinflect, DeinflectReason } from '../src/deinflect';

describe('deinflect', () => {
  it('performs de-inflection', () => {
    const result = deinflect('走ります');
    const match = result.find(candidate => candidate.word === '走る');
    expect(match).toEqual({
      reasons: [[DeinflectReason.Polite]],
      type: 2,
      word: '走る',
    });
  });

  it('performs de-inflection recursively', () => {
    const result = deinflect('踊りたくなかった');
    const match = result.find(candidate => candidate.word === '踊る');
    expect(match).toEqual({
      reasons: [
        [DeinflectReason.Tai, DeinflectReason.Negative, DeinflectReason.Past],
      ],
      type: 2,
      word: '踊る',
    });
  });
});
