import { toLength } from "lodash";
import Cell from "@entities/Cell";
import CellState from "@enums/CellState";

export default class GameField {
    #field;

    constructor(rows, cols) {
        this.initField(rows, cols);
    }
    
    get field() {
        return this.#field;
    }

    initField(rows, cols) {
        rows = toLength(rows);
        cols = toLength(cols);

        this.dropField();
        this.#field = new Array(rows);

        for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
            this.#field[rowIdx] = new Array(cols); // I really feel like there should be a better solution for this, but nothing that I've tried works

            for (let colIdx = 0; colIdx < cols; colIdx++) {
                this.#field[rowIdx][colIdx] = new Cell();
            }
        }
    }

    dropField() {
        const rows = this.#field.length;

        for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
            const cols = this.#field[rowIdx].length;

            for (let colIdx = 0; colIdx < cols; colIdx++) {
                delete this.#field[rowIdx][colIdx];
            }

            delete this.#field[rowIdx];
        }

        this.#field = [];
    }

    fillField(state) {
        if (Object.values(CellState).includes(state)) {
            this.#field.forEach((row)=>{
                row.forEach((cell)=>{
                    cell.nextState = state;
                });
            });
        }

        this.advanceField();
    }

    advanceField() {
        this.#field.forEach((row)=>{
            row.forEach((cell)=>{
                cell.advance();
            });
        });
    }
}