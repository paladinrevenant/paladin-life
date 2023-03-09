import { toLength, isNil } from "lodash";
import Cell from "@entities/Cell";
import CellState from "@enums/CellState";
import Rules from "@world/Rules.js";

export default class GameField {
    #matrix;
    #rules;

    constructor(rows, cols) {
        this.initMatrix(rows, cols);
        this.#rules = new Rules();
    }
    
    get matrix() {
        return this.#matrix;
    }

    initMatrix(rows, cols) {
        rows = toLength(rows);
        cols = toLength(cols);

        this.dropMatrix();
        this.#matrix = new Array(rows);

        for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
            this.#matrix[rowIdx] = new Array(cols); // I really feel like there should be a better solution for this, but nothing that I've tried works

            for (let colIdx = 0; colIdx < cols; colIdx++) {
                this.#matrix[rowIdx][colIdx] = new Cell();
            }
        }
    }

    dropMatrix() {
        const rows = this.#matrix.length;

        for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
            const cols = this.#matrix[rowIdx].length;

            for (let colIdx = 0; colIdx < cols; colIdx++) {
                delete this.#matrix[rowIdx][colIdx];
            }

            delete this.#matrix[rowIdx];
        }

        this.#matrix = [];
    }

    fillMatrix(state) {
        if (Object.values(CellState).includes(state)) {
            this.#matrix.forEach((row)=>{
                row.forEach((cell)=>{
                    cell.nextState = state;
                });
            });
        }

        this.advanceMatrix();
    }

    advanceMatrix() {
        this.#matrix.forEach((row)=>{
            row.forEach((cell)=>{
                cell.advance();
            });
        });
    }

    isInBounds(row, col) {
        return (
            row >= 0 &&
            row < this.#matrix.length &&
            col >= 0 &&
            col < this.#matrix[row].length
        );
    }

    getNeighbors(row, col) {
        if (this.isInBounds(row, col)) {
            let neighbors = new Array(8); // Set the length of the array here to avoid reallocating memory thousands of times
            let numNeighbors = 0;

            for (let a = -1; a <= 1; a++) {
                for (let b = -1; b <= 1; b++) {
                    if (((a + b) !== 0) && this.isInBounds(row + a, col + b)) {
                        neighbors[((a + 1) * 3) + (b + 1)] = this.#matrix[row + a][col + b];
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