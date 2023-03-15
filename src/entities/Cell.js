import CellState from "@enums/CellState";

export default class Cell {
    _state;
    _nextState;

    constructor(initialState = CellState.Dead) {
        this._state = initialState;
    }

    get state() {
        return this._state;
    }

    set nextState(inState) {
        if (Object.values(CellState).includes(inState))
            this._nextState = inState;
    }

    advance() {
        if (this._nextState) {
            this._state = this._nextState;
            this._nextState = null;
        }
    }
}