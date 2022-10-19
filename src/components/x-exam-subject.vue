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
                <div class="your-answer">您的答案: {{currentAnswer}}</div>
                <div class="selection" v-if="!subject.yourAnswer">
                    <span style="margin-right: 10px;">选择: </span>
                    <a-button v-for="answer in subject.answers" :key="answer.id" type="primary"
                        @click="currentAnswer=answer.id">{{answer.id}}
                    </a-button>
                </div>
                <div :class="'result-hint ' + (isCorrect(subject) ? '' : 'error-hint')" v-else>
                    {{ isCorrect(subject) ? '回答正确' : '回答错误'}}
                </div>
            </div>
            <div class="operations">
                <a-button type="primary">暂停</a-button>
                <a-button type="primary" :disabled="disabled(-1)" @click="changeSubject(-1)">上一题</a-button>
                <a-button type="primary" :disabled="disabled(1)" @click="changeSubject(1)">下一题</a-button>
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

const emits = defineEmits(['changePic', 'changeSubject', 'onAnswerError'])
const currentSubject = ref(0)
const currentAnswer = ref('')
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
        answers: [
            { id: 'A', value: '我是 A 答案嗷' },
            { id: 'B', value: '我是 B 答案嗷' },
            { id: 'C', value: '我是 C 答案嗷' },
            { id: 'D', value: '我是 D 答案嗷' },
        ],
        correct: 'A'
    },
    {
        type: SubjectType.SELECTION,
        title: '测试题目 3',
        answers: [
            { id: 'A', value: '我是 A 答案嗷' },
            { id: 'B', value: '我是 B 答案嗷' },
            { id: 'C', value: '我是 C 答案嗷' },
            { id: 'D', value: '我是 D 答案嗷' },
        ],
        correct: 'B'
    },
    {
        type: SubjectType.SELECTION,
        title: '测试题目 4',
        answers: [
            { id: 'A', value: '我是 A 答案嗷' },
            { id: 'B', value: '我是 B 答案嗷' },
            { id: 'C', value: '我是 C 答案嗷' },
            { id: 'D', value: '我是 D 答案嗷' },
        ],
        correct: 'C'
    }
]
const subject = computed(() => {
    const subject = subjects[currentSubject.value]
    emits('changePic', subject.pic)
    return subject
})
const disabled = computed(() => {
    return (increment: number) => currentSubject.value == Math.max(0, Math.min(subjects.length - 1, currentSubject.value + increment))
})
const isCorrect = computed(() => (subject: Subject) => subject.yourAnswer == subject.correct)
const changeSubject = (increment: number) => {
    subject.value.yourAnswer = currentAnswer.value
    if (subject.value.yourAnswer && !(subject.value.yourAnswer == subject.value.correct)) emits('onAnswerError', currentSubject.value)
    // currentSubject 不能小于 0, 不能大于 subjects.length
    currentSubject.value = Math.max(0, Math.min(subjects.length - 1, currentSubject.value + increment))
    currentAnswer.value = subject.value.yourAnswer || ''
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
    margin-bottom: 70px;
}

.subject-title,
.your-answer,
.result-hint {
    font-size: 26px;
    font-weight: bold;
}

.error-hint {
    color: red;
}
</style>