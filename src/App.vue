<template>
  <a-config-provider :locale="zhCN">
    <a-layout>
      <a-layout>
        <a-layout-sider theme="light" :width="240">
          <x-exam-info @onFinish="onFinish" />
        </a-layout-sider>
        <a-layout-content>
          <x-exam-subject ref="exam" @changePic="changePic" @changeSubject="changeSubject"
            @onAnswerError="onAnswerError" @onAnswerCorrect="onAnswerCorrect" />
        </a-layout-content>
        <div theme="light">
          <x-exam-board :currentSubject="currentSubject" :errorSubjects="errorSubjects"
            :correctSubjects="correctSubjects" @cellClick="cellClick" />
        </div>
      </a-layout>
      <a-layout>
        <x-exam-pic :src="src"></x-exam-pic>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';

const src = ref('')
const currentSubject = ref(0)
const errorSubjects = ref<number[]>([])
const correctSubjects = ref<number[]>([])
const exam = ref()
const changePic = (e: string) => {
  src.value = e
}
const changeSubject = (e: number) => {
  currentSubject.value = e
}
const onAnswerError = (e: number) => {
  errorSubjects.value.push(e + 1)
}
const onAnswerCorrect = (e: number) => {
  correctSubjects.value.push(e + 1)
}
const onFinish = () => {
  exam.value.submitExam()
  console.log('结束作答');
}
const cellClick = (e: number) => {
  exam.value.onChangeSubject(e - 1)
}
</script>

<style scoped>

</style>