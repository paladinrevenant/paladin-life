<template>
    <div :class="classes" />
</template>

<script>
    import CellState from "@enums/CellState";

    export default {
        name: "GameFieldCell",
        props: {
            cellData: {
                type: Object,
                default: ()=>{
                    return {
                    state: CellState.Dead
                    };
                }
            }
        },
        emits: ["update:modelValue"],
        computed: {
            classes() {
                let classList = ["game-field-cell"];
                
                if (this.cellData.state == CellState.Dead)
                    classList.push("dead");
                else if (this.cellData.state == CellState.Alive)
                    classList.push("alive");
                // switch (this.cellData.state) {
                //     case CellState.Dead:
                //         break;
                //     case CellState.Alive:
                //         break;
                //     default:
                //         break;
                // }

                return classList;
            }
        }
    };
</script>

<style lang="scss">
    .game-field-cell{
        margin: 0;
        box-sizing: border-box;
        height: 1em;
        width: 1em;
        border: 1px solid black;
        display: table-cell;

        .dead {
            background-color: #202020;
        }

        .alive {
            background-color: #2BD5F3;
        }
    }
</style>