# Biblioteca — Design Patterns (TypeScript)

**Disciplina:** Linguagem de Programacao e Paradigmas  
**Professor:** Ademar Perfoll Junior  
**Tema:** Biblioteca (empréstimos, devolução, multa, lembretes)  
**Desenvolvido por:** Jean Koerich ([@JeanKoerich](https://github.com/JeanKoerich))

## Problema
Modelar a lógica de uma mini-biblioteca, permitindo **emprestar**, **devolver** (com **multa**) e **notificar** usuários quando um empréstimo está próximo do vencimento, demonstrando **padrões de projeto**.

## Padrões escolhidos
- **Strategy** — políticas de multa por **perfil** (aluno/professor)
- **Decorator** — composição de **anistias** e **descontos** sobre a multa
- **Observer** — **lembretes** de devolução via bus de eventos

Extras (não exigidos, mas presentes):
- **Factory Method** — criação da Strategy por perfil
- **Singleton** — `Config` e `Logger`

## Diagrama (mermaid)
```mermaid
classDiagram
  class LateFeeStrategy { +graceDays() +feePerDay() +deadline() +calc(lateDays) }
  class StudentStrategy
  class TeacherStrategy
  LateFeeStrategy <|.. StudentStrategy
  LateFeeStrategy <|.. TeacherStrategy

  class FeeCalculator { +calc(lateDays) }
  class BaseFeeCalculator
  class AmnestyDaysDecorator
  class PercentOffDecorator
  FeeCalculator <|.. BaseFeeCalculator
  FeeCalculator <|.. AmnestyDaysDecorator
  FeeCalculator <|.. PercentOffDecorator
  AmnestyDaysDecorator --> FeeCalculator
  PercentOffDecorator --> FeeCalculator

  class EventBus { +register() +notify() }
  class Observer { +update(ev) }
  EventBus --> Observer

  class StrategyCreator { +create(profile) }
  class LateFeeStrategyCreator
  StrategyCreator <|.. LateFeeStrategyCreator

  class Config { <<Singleton>> +get() }
  class Logger { <<Singleton>> +get() }