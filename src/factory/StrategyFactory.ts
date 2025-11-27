import type { Profile } from '../domain/types.js';
import type { LateFeeStrategy } from '../strategies/LateFeeStrategy.js';
import { StudentStrategy } from '../strategies/StudentStrategy.js';
import { TeacherStrategy } from '../strategies/TeacherStrategy.js';

export abstract class StrategyCreator {
    abstract create(profile: Profile): LateFeeStrategy;
}

export class LateFeeStrategyCreator extends StrategyCreator {
    create(profile: Profile): LateFeeStrategy {
        switch (profile) {
            case 'student': return new StudentStrategy();
            case 'teacher': return new TeacherStrategy();
            default: throw new Error('Unknown profile');
        }
    }
}
