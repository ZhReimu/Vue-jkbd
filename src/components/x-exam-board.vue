<template>
    <a-card class="answer-info">
        <div class="header">
            答题信息
        </div>
        <div class="answer-board">
            <a-row align="center" v-for="i in 5">
                <a-col :class="cellClass(i*j)" v-for="j in 10" :span="2">{{i*j}}
                </a-col>
            </a-row>
        </div>
    </a-card>
</template>

<script setup lang="ts">
const props = defineProps({
    currentSubject: {
        type: Number,
        required: true
    }
})

const cellClass = computed(() => {
    return (cellId: Number) => 'cell ' + (props.currentSubject + 1 == cellId ? 'current' : '')
})

</script>

<style scoped>
.current {
    background-color: #93F0E4;
}

.answer-info {
    width: 500px;
    min-height: 422px;
}

.cell {
    width: 34px;
    height: 34px;
    border: 1px solid;
}

.answer-board {
    padding-top: 10px;
    text-align: center;
}
</style>