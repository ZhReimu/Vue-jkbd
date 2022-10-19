<template>
  <a-layout>
    <a-layout>
      <a-layout-sider theme="light">
        <x-exam-info></x-exam-info>
      </a-layout-sider>
      <a-layout-content>
        <x-exam-subject @changePic="changePic" @changeSubject="changeSubject" />
      </a-layout-content>
      <div theme="light">
        <x-exam-board :currentSubject="currentSubject" />
      </div>
    </a-layout>
    <a-layout>
      <x-exam-pic :src="src"></x-exam-pic>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
const src = ref('')
const currentSubject = ref(0)

const changePic = (e: string) => {
  src.value = e
}
const changeSubject = (e: number) => {
  currentSubject.value = e
}

</script>

<style scoped>

</style>