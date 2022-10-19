<template>
    <a-card class="answer-info">
        <div class="header">
            答题信息
        </div>
        <div class="answer-board">
            <a-row align="center" v-for="i in 5">
                <a-col :class="cellClass(numbers(i,j))" v-for="j in 10" :span="2">{{numbers(i,j)}}
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
    },
    errorSubjects: {
        type: Array<Number>,
        require: true
    }
})

const numbers = computed(() => {
    return (i: number, j: number) => {
        return (i - 1) * 10 + j
    }
})

const cellClass = computed(() => {
    const currentId = props.currentSubject + 1
    return (cellId: Number) => {
        // 基础的 cell 样式
        var css = 'cell '
        //当前正在答的题目的样式
        if (currentId == cellId) css += 'current '
        // @ts-ignore
        if (props.errorSubjects.includes(cellId) && currentId != cellId) css += 'error '
        return css
    }
})

</script>

<style scoped>
.current {
    background-color: #93F0E4;
}

.answer-info {
    width: 450px;
    min-height: 422px;
    height: 100%;
}

.cell {
    width: 34px;
    height: 34px;
    border: 1px solid;
}

.error {
    background-color: red;
}

.answer-board {
    padding-top: 10px;
    text-align: center;
}
</style>