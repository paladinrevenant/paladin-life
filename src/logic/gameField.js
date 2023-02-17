import { CELL_STATE } from "@source/constants";

/**
 * Generates the game field and initializes the cells
 * 
 * @param {number} cols The number of columns for the game grid
 * @param {number} rows The number of rows for the game grid
 * @returns {number[]} The created game field
 */
export function initGameField(cols, rows) {
    let gameField = new Array(cols);

    if (!isGameFieldSizeValid(cols)) {
        console.log("Flag! 2");
        throw new RangeError("Invalid 'cols' size");
    }

    if (!isGameFieldSizeValid(rows))
        throw new RangeError("Invalid 'rows' size");
    
    for (let a = 0; a < cols; a++) {
        gameField[a] = new Array(rows).fill(CELL_STATE.DEAD);
    }
    console.log("Flag! 1");

    return gameField;
}

/**
 * Validates the desired number of columns for the game field
 * 
 * @param {number} cols The number of columns desired for the game field
 * @returns {boolean} Is the number valid
 */
export function isGameFieldSizeValid(size) {
    if (size < 1)
        return false;
    
    return true;
}

export function fillField(field) {
    field.foreach( col => {
        col.foreach( cell => {
            cell = CELL_STATE.ALIVE; // eslint-disable-line no-unused-vars
        });
    });
}

export function emptyField(field) {
    field.foreach( col => {
        col.foreach( cell => {
            cell = CELL_STATE.DEAD; // eslint-disable-line no-unused-vars
        });
    });
}

// export function updateField(field) {

// }

export function randomizeField(field) {
    field.forEach( col => {
        col.forEach( cell => {
            cell = Math.random() < .50 ? CELL_STATE.ALIVE : CELL_STATE.DEAD; // eslint-disable-line no-unused-vars
        });
    });
}

export function ringField(field) {
    field[0].foreach(cell => {
        cell = CELL_STATE.ALIVE; // eslint-disable-line no-unused-vars
    });

    field[field.length - 1].foreach(cell => {
        cell = CELL_STATE.ALIVE; // eslint-disable-line no-unused-vars
    });

    for(let a = 1; a < field.length - 2; a++) {
        field[a][0] = CELL_STATE.ALIVE; // eslint-disable-line no-unused-vars
        field[a][field[a].length - 1] = CELL_STATE.ALIVE; // eslint-disable-line no-unused-vars
    }
}

export default {
    initGameField,
    isGameFieldSizeValid,
    fillField,
    emptyField,
    randomizeField
};