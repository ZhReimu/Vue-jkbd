<template>
    <a-card class="exam-subject">
        <div class="header">
            考试题目
        </div>
        <div class="subject">
            <div class="subject-title">{{`${currentSubject + 1}. ${subject.title}`}}</div>
            <div class="selections">
                <div v-if="subject.type === SubjectType.SELECTION" v-for="answer in subject.answers" :key="answer.id">
                    {{`${answer.id}. ${answer.value}`}}
                </div>
            </div>
            <div class="result">
                <div>您的答案</div>
                <div class="selection">
                    <span style="margin-right: 10px;">选择: </span>
                    <a-button v-for="answer in subject.answers" :key="answer.id" type="primary">{{answer.id}}
                    </a-button>
                </div>
            </div>
            <div class="operations">
                <a-button type="primary">暂停</a-button>
                <a-button type="primary" :disabled="hasNext(-1)" @click="changeSubject(-1)">上一题</a-button>
                <a-button type="primary" :disabled="hasNext(1)" @click="changeSubject(1)">下一题</a-button>
                <a-button type="primary">交卷</a-button>
            </div>
        </div>
    </a-card>
</template>

<script setup lang="ts">
import { Subject } from '../types/x-exam';

enum SubjectType {
    SELECTION = 0,
    JUDGE = 1,
    MULT_SELECTION = 2
}

const emits = defineEmits(['changePic', 'changeSubject'])

const subjects: Subject[] = [
    {
        type: SubjectType.JUDGE,
        title: '测试题目',
        pic: 'https://sucimg.itc.cn/sblog/jdN42qbpXY1',
        answers: [
            {
                id: '√',
                value: '√',
            },
            {
                id: '×',
                value: '×',
            }],
        correct: '√'
    },
    {
        type: SubjectType.SELECTION,
        title: '测试题目 2',
        pic: 'https://sucimg.itc.cn/sblog/jdN42qbpXY1',
        answers: [
            { id: 'A', value: '我是 A 答案嗷' },
            { id: 'B', value: '我是 B 答案嗷' },
            { id: 'C', value: '我是 C 答案嗷' },
            { id: 'D', value: '我是 D 答案嗷' },
        ],
        correct: 'A'
    }
]

const currentSubject = ref(0)
const subject = computed(() => {
    const subject = subjects[currentSubject.value]
    if (subject.pic) emits('changePic', subject.pic)
    return subject
})

const hasNext = computed(() => {
    return (increment: number) => currentSubject.value == Math.max(0, Math.min(subjects.length - 1, currentSubject.value + increment))
})

const changeSubject = (increment: number) => {
    // currentSubject 不能小于 0, 不能大于 subjects.length
    currentSubject.value = Math.max(0, Math.min(subjects.length - 1, currentSubject.value + increment))
    emits('changeSubject', currentSubject.value)
    console.log('切换题目', currentSubject.value);
}

</script>

<style scoped>
.exam-subject {
    height: 100%;
}

.selections {
    margin-top: 20px;
    font-size: 26px;
    font-weight: bold;
    min-height: 250px;
}

.operations {
    display: flex;
    justify-content: end;
}

.ant-btn {
    margin-right: 10px;
}

.result {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.subject-title {
    font-size: 26px;
    font-weight: bold;
}
</style>