<script setup>
import SkeletonVue from "./Skeleton.vue";
</script>

<template>
    <div class="panel">
        <img class="image" src="../assets/inventory-img.svg" />
        <div v-if="false" class="content">

        </div>
        <div v-else class="skeleton-wrapper">
            <SkeletonVue v-for="i in 7" :key="i" />
        </div>

    </div>
</template>

<style scoped lang="scss">
.panel {
    box-sizing: border-box;
    width: 236px;
    height: 500px;
    background: #2F2F2F;
    padding: 15px 10px;
    border: 1px solid #4d4d4d;
    border-radius: 8px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    img {
        width: 208px;
    }
}

.image {
    width: 200px;
}

.skeleton-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 8px;

    .skeleton-text {
        &:nth-child(1) {
            height: 26px;
            width: 190px;
            margin: 20px;
            border-radius: 8px;
        }

        &:nth-child(2) {
            width: 155px;
        }

        &:nth-child(3) {
            width: 190px;
        }

        &:nth-child(4) {
            width: 170px;
        }

        &:nth-child(5) {
            width: 160px;
        }

        &:nth-child(6) {
            width: 140px;
        }

        &:nth-child(7) {
            width: 80px;
            margin: 15px 0 20px 0;
        }
    }
}

.skeleton-text {
    margin: 8px;
}
</style>