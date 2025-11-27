import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { LoanRepo, notifyDueSoon } from '../domain/services.js';
import type { Profile } from '../domain/types.js';
import { LateFeeStrategyCreator } from '../factory/StrategyFactory.js';
import type { FeeCalculator } from '../decorators/FeeCalculator.js';
import { BaseFeeCalculator } from '../decorators/BaseFeeCalculator.js';
import { AmnestyDaysDecorator } from '../decorators/AmnestyDaysDecorator.js';
import { PercentOffDecorator } from '../decorators/PercentOffDecorator.js';
import { EventBus } from '../observers/EventBus.js';
import { DueSoonObserver } from '../observers/DueSoonObserver.js';
import { Logger } from '../infra/Logger.js';

const rl = readline.createInterface({ input, output });
const repo = new LoanRepo();
const bus = new EventBus();
bus.register(new DueSoonObserver());

const strategyCreator = new LateFeeStrategyCreator();

const books = [
    { id: 1, title: 'Engenharia de Software' },
    { id: 2, title: 'Arquitetura de Computadores' },
    { id: 3, title: 'Redes de Computadores' },
    { id: 4, title: 'Inteligencia Artificial' },
    { id: 5, title: 'Banco de Dados Relacional' }
];

async function main() {
    Logger.get().info('\n=== Biblioteca — Design Patterns ===');
    Logger.get().info('1) Emprestar  2) Devolver  3) Listar ativos  4) Simular lembretes (due-soon)  5) Sair');
    Logger.get().info('Desenvolvido por: Jean Koerich (@JeanKoerich)\n');

    while (true) {
        const opt = await rl.question('> ');
        if (opt === '1') {
            console.log('\nLivros:'); books.forEach(b => console.log(` ${b.id}) ${b.title}`));
            const bid = Number(await rl.question('ID do livro: '));
            const user = await rl.question('Nome do usuário: ');
            const profile = (await rl.question('Perfil (student/teacher): ')).trim() as Profile;
            const daysWith = Number(await rl.question('Dias em posse (inicial): '));
            repo.create({ bookId: bid, user, profile, daysWith, returned: false });
            console.log('OK: Emprestado.\n');
        } else if (opt === '2') {
            const bid = Number(await rl.question('ID do livro: '));
            const user = await rl.question('Nome do usuário: ');
            const loan = repo.find(bid, user);
            if (!loan) { console.log('Não encontrado/ativo.'); continue; }
            const extraDays = Number(await rl.question('Dias totais em posse (atualize): '));
            loan.daysWith = extraDays;

            const strategy = strategyCreator.create(loan.profile);
            const lateDays = Math.max(0, loan.daysWith - strategy.deadline());

            let calc: FeeCalculator = new BaseFeeCalculator(strategy);
            calc = new AmnestyDaysDecorator(calc, 0);
            calc = new PercentOffDecorator(calc, 0);

            const fee = calc.calc(lateDays);
            console.log(`Multa final: R$ ${fee}`);
            repo.markReturned(loan);
            console.log('Devolução registrada.\n');
        } else if (opt === '3') {
            const active = repo.listActive();
            if (!active.length) console.log('Nenhum ativo.\n');
            else active.forEach(l => console.log(`Livro ${l.bookId} -> ${l.user} (${l.profile}), ${l.daysWith}d`));
        } else if (opt === '4') {
            notifyDueSoon(repo.listActive(), bus, 6);
            console.log('Lembretes simulados.\n');
        } else if (opt === '5') {
            break;
        }
    }

    rl.close();
}

main();