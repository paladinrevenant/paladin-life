<template>
    <div :class="classes" />
</template>

<script>
    import { CELL_STATE } from "@source/constants.js";

    export default {
        name: "GameFieldCell",
        props: {
            modelValue: {
                type: Number,
                default: 0
            }
        },
        emits: ["update:modelValue"],
        computed: {
            classes() {
                let classList = ["game-field-cell"];
                
                switch (this.modelValue) {
                    case CELL_STATE.DEAD:
                        classList.push("dead");
                        break;
                    case CELL_STATE.ALIVE:
                        classList.push("alive");
                        break;
                    default:
                        break;
                }

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

        .dead {
            background-color: #202020;
        }

        .alive {
            background-color: #2BD5F3;
        }
    }
</style>