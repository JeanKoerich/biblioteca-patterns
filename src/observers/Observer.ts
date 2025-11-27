export interface Event {
    type: 'due-soon' | 'blocked';
    payload: any;
}
export interface Observer {
    update(ev: Event): void;
}