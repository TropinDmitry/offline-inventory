<script lang="ts" setup>
</script>

<template>
    <div class="skeleton-text">

    </div>
</template>

<style scoped lang="scss">
.skeleton-text {
    width: 100%;
    height: 10px;
    background: #444;
    background: linear-gradient(
        90deg,
        #3C3C3C 25%,
        #444 50%,
        #333 75%,
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite linear;
    margin: 8px 0px;
    border-radius: 12px;
}

@keyframes shimmer {
    0% {
        background-position: 100% 0;
    }

    100% {
        background-position: -100% 0;
    }
}
</style>