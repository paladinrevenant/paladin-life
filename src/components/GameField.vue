<template>
    <div class="game-field">
        <GameFieldRow
            v-for="(row, index) in gameWorld.matrix"
            :key="index"
            :v-model="row"
        />
    </div>
</template>

<script>
    import logic from "@logic/gameField.js";
    import GameFieldRow from "@components/GameFieldRow.vue";
    import GameWorld from "@world/GameWorld.js";

    export default {
        name: "GameField",
        components: {
            GameFieldRow
        },
        data() {
            return {
                gameWorld: { matrix: [] }
            };
        },
        mounted() {
            this.gameWorld = new GameWorld(20, 20);
        }
    };
</script>

<style scoped lang="scss">
    .game-field {
        padding: 0;
    }
</style>