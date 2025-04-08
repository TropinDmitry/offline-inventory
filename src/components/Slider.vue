<script setup>
import MyButton from "./MyButton.vue";
import SkeletonVue from "./Skeleton.vue";
</script>

<template>
    <div class="slider">
        <MyButton class="close-btn">✕</MyButton>
        <SkeletonVue style="margin: 0 40px 0 0; height: 36px;" />
    </div>
</template>

<style scoped lang="scss">
.slider {
    position: relative;
    border: 1px solid #4d4d4d;
    border-radius: 12px;
    margin-top: 20px;
    padding: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #2F2F2F;
}
</style>