import { describe, it, expect } from 'vitest';
import { Config } from '../src/infra/Config.js';
import { Logger } from '../src/infra/Logger.js';
import { LateFeeStrategyCreator } from '../src/factory/StrategyFactory.js';

describe('Singleton & Factory', () => {
  it('Config e Logger retornam única instância', () => {
    expect(Config.get()).toBe(Config.get());
    expect(Logger.get()).toBe(Logger.get());
  });

  it('Factory retorna strategy por perfil', () => {
    const f = new LateFeeStrategyCreator();
    const s1 = f.create('student');
    const s2 = f.create('teacher');
    expect(s1.feePerDay()).toBe(1.5);
    expect(s2.graceDays()).toBe(5);
  });
});