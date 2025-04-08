<script setup lang="ts">
import MyButton from "./MyButton.vue";
import SkeletonVue from "./Skeleton.vue";
import type InventoryItem from "../stores/inventory.store";
import { ref, watch, computed } from "vue";

const deleteCount = ref<number | ''>('');
const showDeleteField = ref<boolean>(false);
const localItem = ref<InventoryItem | null>(null);

const props = defineProps<{ 
    item: InventoryItem; 
    isOpen: boolean 
}>();

const emit = defineEmits(["close", "delete"]);

const isValideCount = computed(() => {
    if (typeof deleteCount.value === 'number' && deleteCount.value > 0 && deleteCount.value <= props.item.count) {
        return true;
    }
})

const handleDelete = () => {
    if (!isValideCount.value) return;

    emit('delete', {
        itemId: props.item?.id,
        count: Number(deleteCount.value)
    });

    cancelDelete();
    
    emit('close');
}

const cancelDelete = () => {
    showDeleteField.value = false;
    deleteCount.value = '';
}

watch(() => props.isOpen, (newValue) => {
    if (newValue) {
        localItem.value = props.item;
    }
})
</script>

<template>
    <aside 
        class="slideover" 
        :aria-hidden="!isOpen" 
        aria-modal="true" 
        :class="{ 'open': isOpen, 'closed': !isOpen }"
    >
        <MyButton 
            @click="emit('close')" 
            class="close-btn"
        >
            ✕
        </MyButton>

        <div class="slideover-info">
            <div class="img-wrapper">
                <img :src="localItem?.image" alt="" />
            </div>

            <hr class="line" />
            
            <div class="info-wrapper">
                <div class="info-header">
                    <SkeletonVue class="skeleton" style="height: 30px; margin: 18px 0 15px 0;" />
                </div>
                <div class="info-content">
                    <SkeletonVue class="skeleton" v-for="i in 5" :key="i" />
                </div>
            </div>

            <hr class="line" />
        </div>

        <div class="footer">
            <MyButton 
                @click="showDeleteField = true" 
                class="delete-btn"
            >
                Удалить предмет
            </MyButton>

            <div v-show="showDeleteField" class="confirm-count">
                <input 
                    v-model.number="deleteCount" 
                    placeholder="Введите количество" 
                    class="input-count" 
                />
                <div class="btn-wrapper">
                    <MyButton @click="cancelDelete" class="cancel">Отмена</MyButton>
                    <MyButton @click="handleDelete" class="apply">Подтвердить</MyButton>
                </div>
            </div>
        </div>
    </aside>
</template>

<style scoped lang="scss">
.slideover {
    width: 250px;
    height: 500px;
    right: -300px;
    position: absolute;
    top: 0;
    background: rgba(47, 47, 47, 0.5);
    transition-property: transform, translate, scale, rotate;
    border-left: 1px solid #4d4d4d;
    backdrop-filter: blur(8px);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &.open {
        transform: translateX(-120%);
    }

    &.closed {
        transform: translateX(0);
    }
}

.slideover-info {
    padding: 0px 15px;
}

.slideover-info .line {
    border: none;
    border-top: 1px solid #4d4d4d;
    margin: 0;


}

.footer {
    position: relative;
    height: 60px;
}

.info-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 5px;
}

.info-header,
.info-content {
    width: 100%;
}

.info-content {
    display: flex;
    flex-direction: column;
    align-items: center;

    .skeleton {

        &:nth-last-child(2) {
            width: 180px;
        }

        &:last-child {
            width: 80px;
            margin-bottom: 25px;
        }
    }
}

.img-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 55px;
    margin-bottom: 30px;
}

.img-wrapper img {
    width: 130px;
    // margin: 55px 0 25px 0;
}

.input-count {
    margin: 0px 0px 15px 0px;
    width: -webkit-fill-available;
    border: 1px solid #4d4d4d;
    border-radius: 4px;
    background: #333;
    padding: 10px;
}

.confirm-count {
    border: 1px solid #4d4d4d;
    padding: 15px;
    border-bottom: 0;
    border-left: 0;
    border-right: 0;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(47, 47, 47, 0.6);
    backdrop-filter: blur(8px);

}

.btn-wrapper {
    display: flex;
    justify-content: space-between;
}

.delete-btn {
    position: absolute;
    width:-webkit-fill-available;
    bottom: 15px;
    padding: 0 15px;

    :deep(button) {
        width: 100%;
    }
}

:deep(.btn.close-btn button) {
    background-color: transparent;
    width: 24px;
}

:deep(.delete-btn button),
:deep(.apply button) {
    background-color: #FA7272;

    &:focus {
        background-color: #FF8888;
    }
}

:deep(.cancel button) {
    background-color: #fff;
    color: black;
}
</style>