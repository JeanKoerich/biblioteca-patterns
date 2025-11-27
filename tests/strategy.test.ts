import { describe, it, expect } from 'vitest';
import { StudentStrategy } from '../src/strategies/StudentStrategy.js';
import { TeacherStrategy } from '../src/strategies/TeacherStrategy.js';

describe('Strategy: multa por perfil', () => {
    it('aluno: sem isencao, 3 dias de atraso -> 3*1.5=4.5', () => {
        const s = new StudentStrategy();
        expect(s.deadline()).toBe(7);
        expect(s.calc(3)).toBe(4.5);
    });

    it('professor: 5 dias isencao; atraso 7 -> cobra 2*1.0=2.0', () => {
        const s = new TeacherStrategy();
        expect(s.calc(7)).toBe(2.0);
    });
});