<script lang="ts" setup>
    import type InventoryItem from '../stores/inventory.store';

    defineProps<{ item:InventoryItem | undefined }>();

</script>

<template>
    <div v-if="item" class="inventory-item">
        <div class="item-image" >
            <img :src="item.image" :alt="item.name" />
        </div>
        <div class="count">{{ item.count }}</div>
    </div>
</template>

<style scoped lang="scss">
.inventory-item {
    position: relative;
    width: 100%;
    height: 100%;

    &:hover {
      background: #4D4D4D;
      cursor: pointer;
    }

    &:active {
        cursor: grabbing;
    }
    
}

.item-image {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.count {
    border: 1px solid #4d4d4d;
    border-bottom: 0;
    border-right: 0;
    border-radius: 6px 0 0 0;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 16px;
    line-height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4D4D4D;
    background: #2F2F2F;
}

p {
    right: 3px;
    bottom: 3px;
    margin: 0;
}

</style>