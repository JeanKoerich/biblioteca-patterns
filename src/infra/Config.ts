export class Config {
    private static instance: Config;
    private constructor(public readonly deadline = 7) { }
    static get(): Config {
        if (!Config.instance) Config.instance = new Config();
        return Config.instance;
    }
}