import { toLength, isNil } from "lodash";
import Cell from "@entities/Cell";
import CellState from "@enums/CellState";
import Rules from "@world/Rules.js";

export default class GameField {
    _matrix; // Can't set these to private because Vue wrapping this in a proxy breaks it.
    _rules;

    constructor(rows, cols) {
        this.initMatrix(rows, cols);
        this._rules = new Rules();
    }
    
    get matrix() {
        return this._matrix;
    }

    initMatrix(rows, cols) {
        rows = toLength(rows);
        cols = toLength(cols);

        this.dropMatrix();
        this._matrix = new Array(rows);

        for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
            this._matrix[rowIdx] = new Array(cols); // I really feel like there should be a better solution for this, but nothing that I've tried works

            for (let colIdx = 0; colIdx < cols; colIdx++) {
                this._matrix[rowIdx][colIdx] = new Cell();
            }
        }
    }

    dropMatrix() {
        if (!isNil(this._matrix)) {
            const rows = this._matrix.length;

            for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
                const cols = this._matrix[rowIdx].length;

                for (let colIdx = 0; colIdx < cols; colIdx++) {
                    delete this._matrix[rowIdx][colIdx];
                }

                delete this._matrix[rowIdx];
            }
        }

        this._matrix = [];
    }

    fillMatrix(state) {
        if (Object.values(CellState).includes(state)) {
            this._matrix.forEach((row)=>{
                row.forEach((cell)=>{
                    cell.nextState = state;
                });
            });
        }

        this.advanceMatrix();
    }

    advanceMatrix() {
        this._matrix.forEach((row)=>{
            row.forEach((cell)=>{
                cell.advance();
            });
        });
    }

    isInBounds(row, col) {
        return (
            row >= 0 &&
            row < this._matrix.length &&
            col >= 0 &&
            col < this._matrix[row].length
        );
    }

    getNeighbors(row, col) {
        if (this.isInBounds(row, col)) {
            let neighbors = new Array(8); // Set the length of the array here to avoid reallocating memory thousands of times
            let numNeighbors = 0;

            for (let a = -1; a <= 1; a++) {
                for (let b = -1; b <= 1; b++) {
                    if (((a + b) !== 0) && this.isInBounds(row + a, col + b)) {
                        neighbors[((a + 1) * 3) + (b + 1)] = this._matrix[row + a][col + b];
                        numNeighbors++; // Count the number of found neighbors so we can filter down the list only when we find fewer than 8 neighbors
                    }
                }
            }

            // Filter down the list of neighbors only when we find fewer than 8 so that we don't run through this operation unnecessarily
            if (numNeighbors < 8) {
                neighbors = neighbors.filter(cell => !isNil(cell));
            }

            return neighbors;
        }

        return [];
    }
}