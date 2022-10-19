<template>
    <div>
        <a-card class="x-card">
            <div class="center">测试考场</div>
            <div class="center">测试考台</div>
        </a-card>
        <a-card class="x-card">
            <div>考生信息</div>
            <a-image :width="100" src="https://hpic.cysq.com/photo/120"></a-image>
            <a-row>
                <a-col :span="14">考生姓名:</a-col>
                <a-col :span="10">{{userInfo.name}}</a-col>
            </a-row>
            <a-row>
                <a-col :span="14">性别:</a-col>
                <a-col :span="10">{{userInfo.sex}}</a-col>
            </a-row>
            <a-row>
                <a-col :span="14">考试科目:</a-col>
                <a-col :span="10">{{userInfo.level}}</a-col>
            </a-row>
            <a-row>
                <a-col :span="14">考试车型:</a-col>
                <a-col :span="10">{{userInfo.type}}</a-col>
            </a-row>
            <a-row>
                <a-col :span="14">考试原因:</a-col>
                <a-col :span="10">{{userInfo.reason}}</a-col>
            </a-row>
        </a-card>
        <a-card class="x-card">
            剩余时间
            <a-statistic-countdown :valueStyle="{color: 'red','font-weight': 'bold'}"
                :value="Date.now() + 1000 * 60 * 45" @finish="onFinish" />
        </a-card>
    </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['onFinish'])
const onFinish = () => emits('onFinish')
const userInfo = {
    name: '测试',
    sex: '男',
    level: '科目四',
    type: 'C1',
    reason: '初次申领'
}
</script>

<style scoped>
.center {
    margin-top: 10px;
    text-align: center;
}

.x-card {
    margin-top: 10px;
}
</style>