import { describe, it, expect } from 'vitest';
import { BaseFeeCalculator } from '../src/decorators/BaseFeeCalculator.js';
import { AmnestyDaysDecorator } from '../src/decorators/AmnestyDaysDecorator.js';
import { PercentOffDecorator } from '../src/decorators/PercentOffDecorator.js';
import { StudentStrategy } from '../src/strategies/StudentStrategy.js';

describe('Decorator: composição de regras', () => {
  it('anistia de 2 dias + 50% off', () => {
    const base = new BaseFeeCalculator(new StudentStrategy());
    const amnesty = new AmnestyDaysDecorator(base, 2);
    const promo = new PercentOffDecorator(amnesty, 0.5);

    expect(promo.calc(5)).toBe(2.25);
  });
});