<script setup>
import SkeletonVue from "./Skeleton.vue";

</script>

<template>
    <div class="btn">
        <button>
            <slot />
        </button>
    </div>
</template>

<style scoped lang="scss">
.btn {
    border-radius: 8px;
    cursor: pointer;

    button:focus {
        outline: none;
    }
}
</style>