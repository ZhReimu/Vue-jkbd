<template>
    <a-card class="exam-pic">
        <div class="header">
            考试图片信息
        </div>
        <div class="x-image" v-show="src">
            <a-image width="500px" :src="src"></a-image>
        </div>
    </a-card>
</template>

<script setup lang="ts">
defineProps({
    src: String
})
</script>

<style scoped>
.exam-pic {
    height: 300px;
}

.x-image {
    text-align: center;
}
</style>