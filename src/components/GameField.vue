<template>
    <div class="game-field">
        <GameFieldRow
            v-for="(row, index) in gameField"
            :key="index"
            :v-model="row"
        />
    </div>
</template>

<script>
    import logic from "@logic/gameField.js";
    import GameFieldRow from "@components/GameFieldRow.vue";

    export default {
        name: "GameField",
        components: {
            GameFieldRow
        },
        data() {
            return {
                gameField: []
            };
        },
        mounted() {
            this.gameField = logic.initGameField(20, 20);
            logic.randomizeField(this.gameField);
        }
    };
</script>

<style scoped lang="scss">
    .game-field {
        padding: 0;
    }
</style>