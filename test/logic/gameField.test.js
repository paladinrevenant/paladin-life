import { expect, test } from "vitest";
//import sinon from "sinon";
import { CELL_STATE } from "@source/constants";
import gameFieldLogic from "@logic/gameField";

suite("initGameField", () => {
    test("Creates an array with the correct size.", () => {
        const expected = [
            [CELL_STATE.DEAD, CELL_STATE.DEAD, CELL_STATE.DEAD, CELL_STATE.DEAD, CELL_STATE.DEAD],
            [CELL_STATE.DEAD, CELL_STATE.DEAD, CELL_STATE.DEAD, CELL_STATE.DEAD, CELL_STATE.DEAD],
            [CELL_STATE.DEAD, CELL_STATE.DEAD, CELL_STATE.DEAD, CELL_STATE.DEAD, CELL_STATE.DEAD],
            [CELL_STATE.DEAD, CELL_STATE.DEAD, CELL_STATE.DEAD, CELL_STATE.DEAD, CELL_STATE.DEAD]
        ];

        const actual = gameFieldLogic.initGameField(4, 5);

        expect(actual).to.deep.equal(expected);
    });
});

suite("isGameFieldSizeValid", () => {
    test("1 is valid", () => {
        expect(gameFieldLogic.isGameFieldSizeValid(1)).to.be.true;
    });

    test("0 is not valid", () => {
        expect(gameFieldLogic.isGameFieldSizeValid(0)).to.be.false;
    });

    test("-1 is not valid", () => {
        expect(gameFieldLogic.isGameFieldSizeValid(-1)).to.be.false;
    });
});