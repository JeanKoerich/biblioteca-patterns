export class Logger {
    private static instance: Logger;
    private constructor() { }
    static get(): Logger {
        if (!Logger.instance) Logger.instance = new Logger();
        return Logger.instance;
    }
    info(msg: string) { console.log(msg); }
    warn(msg: string) { console.warn(msg); }
    error(msg: string) { console.error(msg); }
}