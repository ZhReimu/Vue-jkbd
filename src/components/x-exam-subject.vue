<template>
    <a-card class="exam-subject">
        <div class="x-header">
            {{type4Show}}
        </div>
        <div class="subject">
            <div class="subject-title">{{`${currentSubject + 1}. ${subject.title}`}}</div>
            <div class="selections">
                <div v-if="subject.type !== SubjectType.JUDGE" v-for="answer in subject.answers" :key="answer.id">
                    {{`${answer.id}. ${answer.value}`}}
                </div>
            </div>
            <div class="result">
                <div class="your-answer">您的答案: {{currentAnswer}}</div>
                <div class="selection" v-if="!subject.yourAnswer">
                    <span style="margin-right: 10px;">选择: </span>
                    <a-button v-for="answer in subject.answers" :key="answer.id" type="primary"
                        @click="doAnswer(answer)">{{answer.id}}
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
                <a-button type="primary" @click="submitExam">交卷</a-button>
            </div>
        </div>
    </a-card>
</template>

<script setup lang="ts">
import { getSubjects } from '../api/api';
import { Answer, Subject } from '../types/x-exam';
import { SubjectType } from '../types/x-exam-enums'
import { showConfirm, showInfo } from '../utils/dialogUtils';

const emits = defineEmits(['changePic', 'changeSubject', 'onAnswerError', 'onAnswerCorrect'])
const currentSubject = ref(0)
const currentAnswer = ref('')
const subjects = ref<Subject[]>([])
const subject = computed(() => {
    const subject = subjects.value[currentSubject.value] || {
        title: '默认标题',
        pic: ''
    }
    emits('changePic', subject.pic)
    return subject
})
const disabled = computed(() => {
    return (increment: number) => currentSubject.value == Math.max(0, Math.min(subjects.value.length - 1, currentSubject.value + increment))
})
const isCorrect = computed(() => (subject: Subject) => subject.yourAnswer == subject.correct)
const strEquals = (a: string, b: string) => {
    return [...a].sort((a, b) => {
        return a.localeCompare(b, "zh-CN")
    }).join("") === [...b].sort((a, b) => {
        return a.localeCompare(b, "zh-CN")
    }).join("")
}
const changeSubject = (increment: number) => {
    subject.value.yourAnswer = currentAnswer.value
    const question = subject.value
    if (question.yourAnswer) {
        if (!(strEquals(question.yourAnswer, question.correct))) {
            emits('onAnswerError', currentSubject.value)
        }
        else {
            emits('onAnswerCorrect', currentSubject.value)
        }
    }
    // currentSubject 不能小于 0, 不能大于 subjects.length
    currentSubject.value = Math.max(0, Math.min(subjects.value.length - 1, currentSubject.value + increment))
    currentAnswer.value = subject.value.yourAnswer || ''
    emits('changeSubject', currentSubject.value)
}
const countScores = () => subjects.value.reduce((prev: number, curr: Subject): number => {
    return prev += curr.yourAnswer == curr.correct ? 2 : 0
}, 0)
const onSubmitExam = () => {
    showInfo('作答结束!', `您的成绩为 ${countScores()} 分, 满分 100 分, 90 分 及格`, () => window.location.reload())
}
const submitExam = () => {
    showConfirm('真的要交卷🐎?', '交卷之后不可作答', onSubmitExam)
}
const doAnswer = (answer: Answer) => {
    switch (subject.value.type) {
        case SubjectType.JUDGE:
        case SubjectType.SELECTION:
            currentAnswer.value = answer.id
            break
        case SubjectType.MULT_SELECTION:
            const current = [...currentAnswer.value]
            if (current.includes(answer.id)) {
                currentAnswer.value = current.filter(it => it !== answer.id).join('')
            } else {
                currentAnswer.value += answer.id
            }
    }
}
const type4Show = computed(() => {
    switch (subject.value.type) {
        case SubjectType.JUDGE:
            return "判断题"
        case SubjectType.SELECTION:
            return "单选题"
        case SubjectType.MULT_SELECTION:
            return "多选题"
    }
})
const onChangeSubject = (target: number) => {
    currentSubject.value = target
    emits('changeSubject', currentSubject.value)
}
getSubjects().then((data) => subjects.value = data)
defineExpose({ onSubmitExam, onChangeSubject })
</script>

<style scoped>
.exam-subject {
    max-height: 540px;
    height: 100%;
}

.selections {
    margin-top: 20px;
    font-size: 20px;
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
.x-header,
.result-hint {
    font-size: 20px;
    font-weight: bold;
}

.error-hint {
    color: red;
}
</style>