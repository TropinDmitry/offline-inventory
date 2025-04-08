<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { useInventoryStore } from '../stores/inventory.store';
import CardItem from './CardItem.vue';
import Slideover from './Slideover.vue';
import type InventoryItem from '../stores/inventory.store';


const store = useInventoryStore();
const { items, selectedItem } = storeToRefs(store);
const { selectItem, updatePosition, updateCount, initData } = store;

initData()


const getItemByPosition = (position: number): InventoryItem | undefined => {
    return items.value.find(item => item.position === position);
}

const handleDragStart = (e: DragEvent, position: number): void => {
    const item: InventoryItem | undefined = getItemByPosition(position);
    if (!item) {
        e.preventDefault();
        return;
    }
    
    e.dataTransfer?.setData('drag-item', item.id.toString());

    const dragImage = (e.currentTarget as HTMLElement).cloneNode(true) as HTMLElement;
    dragImage.style.width = `${(e.currentTarget as HTMLElement).offsetWidth}px`;
    dragImage.classList.add('dragging');

    const countElement = dragImage.querySelector('.count');

    if (countElement) {
        countElement.remove();
    }

    document.body.appendChild(dragImage);
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-9999px';

    e.dataTransfer?.setDragImage(dragImage, e.offsetX, e.offsetY);

    setTimeout(() => document.body.removeChild(dragImage), 0);
}

const handleDrop = (e: DragEvent, position: number) => {
    e.preventDefault();
    const itemId = parseInt(e.dataTransfer?.getData('drag-item') || '0');
    if (itemId) updatePosition(itemId, position);
}

const handleSelectItem = (position: number): void => {
    const item = getItemByPosition(position);
    if (item) selectItem(item);
    
}

const handleDelete = ({ itemId, count }: { itemId: number; count: number}) => {
    updateCount(itemId, count);
}

</script>

<template>
    <div class="grid">
        <div class="grid-wrapper">
            <div 
                v-for="cell in 25" 
                :key="cell" 
                class="grid-item"
                :draggable="!!getItemByPosition(cell)"
                @dragover.prevent
                @drop="handleDrop($event, cell)"
                @dragstart="handleDragStart($event, cell)"
            >
                <CardItem 
                    v-if="getItemByPosition(cell)"
                    :item="getItemByPosition(cell)"
                    @click="handleSelectItem(cell)" 
                />
            </div>
        </div>
        
        <Slideover 
            :isOpen="!!selectedItem" 
            :item="selectedItem"
            @close="selectedItem = null" 
            @delete="handleDelete" 
        />
    </div>
</template>

<style scoped lang="scss">
.grid {
    height: 500px;
    display: inline-block;
    border: 1px solid #4d4d4d;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
}

.grid-wrapper {
    position: relative;
    width: auto;
    height: auto;
    display: grid;
    grid-template-columns: repeat(5, 105px);
    grid-template-rows: repeat(5, 100px);
    background: #2F2F2F;
    overflow: hidden;
}

.grid-item {
    position: relative;
    width: 105px;
    height: 100px;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;

    border-right: 1px solid #4d4d4d;
    border-bottom: 1px solid #4d4d4d;
    box-sizing: border-box;

    &:nth-child(5n) {
        border-right: none;
    }

    &:nth-child(n+21) {
        border-bottom: none;
    }
}

.dragging {
    cursor: grabbing;
    border: 1px solid #4d4d4d;
    border-radius: 24px;
    background: #2F2F2F !important;
}
</style>