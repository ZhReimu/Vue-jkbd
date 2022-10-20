<template>
    <a-card class="answer-info">
        <div class="header">
            答题信息
        </div>
        <div class="answer-board">
            <a-row align="center" v-for="i in 5">
                <a-col @click="cellClickHandler(numbers(i,j))" :class="cellClass(numbers(i,j))" v-for="j in 10"
                    :span="2">
                    {{numbers(i,j)}}
                </a-col>
            </a-row>
        </div>
    </a-card>
</template>

<script setup lang="ts">

const emits = defineEmits(['cellClick'])

const props = defineProps({
    currentSubject: {
        type: Number,
        required: true
    },
    errorSubjects: {
        type: Array<Number>,
        require: true
    },
    correctSubjects: {
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
        // @ts-ignore 错误的题目样式
        if (props.errorSubjects.includes(cellId) && currentId != cellId) css += 'error '
        // @ts-ignore 正确的题目样式
        if (props.correctSubjects.includes(cellId) && currentId != cellId) css += 'correct '
        return css
    }
})

const cellClickHandler = (e: number) => {
    emits('cellClick', e)
}

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

.correct {
    background-color: green;
}

.answer-board {
    padding-top: 10px;
    text-align: center;
}
</style>