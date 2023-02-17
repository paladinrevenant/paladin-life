export default class CellState {
    static Dead = new CellState("dead");
    static Alive = new CellState("alive");

    constructor(name) {
        this.name = name;
    }
}