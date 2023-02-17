import CellState from "@enums/CellState";

export default class Cell {
    #state;
    #nextState;

    constructor(initialState = CellState.Dead) {
        this.#state = initialState;
    }

    get state() {
        return this.#state;
    }

    set nextState(inState) {
        if (Object.values(CellState).includes(inState))
            this.#nextState = inState;
    }

    advance() {
        if (this.#nextState) {
            this.#state = this.#nextState;
            this.#nextState = null;
        }
    }
}