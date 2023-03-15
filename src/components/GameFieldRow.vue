<template>
    <div class="game-field-row">
        <GameFieldCell
            v-for="(cell, index) in rowData"
            :key="index"
            :cellData="cell"
        />
    </div>
</template>

<script>
    import GameFieldCell from "@components/GameFieldCell.vue";

    export default {
        name: "GameFieldRow",
        components: {
            GameFieldCell
        },
        props: {
            rowData: {
                type: Array,
                default: ()=>[]
            }
        },
        emits: ["update:modelValue"]
    };
</script>

<style>
    .game-field-cell {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>