import { defineStore } from "pinia"
import { ref } from "vue"
import greenItemImage from '../assets/green-item.svg';
import orangeItemImage from '../assets/orange-item.svg';
import pirpleItemImage from '../assets/pirple-item.svg';

export default interface InventoryItem {
    id: number
    name: string
    image: string
    position: number,
    count: number
}

const DEFAILT_ITEMS: InventoryItem[] = [
    {
        id: 1,
        name: 'Меч',
        image: greenItemImage,
        position: 4,
        count: 1
      },
      {
        id: 2,
        name: 'Щит',
        image: orangeItemImage,
        position: 2,
        count: 10
      },
      {
        id: 3,
        name: 'Зелье здоровья',
        image: pirpleItemImage,
        position: 6,
        count: 6
      }
];

export const useInventoryStore = defineStore('inventory', {
    state: () => ({
        items: [] as InventoryItem[],
        selectedItem: null as InventoryItem | null
    }),

    getters: {
        itemIndex: (state) => (itemId: number) => state.items.findIndex(item => item.id === itemId),
    },

    actions: {
        loadFromLocalStorage() {
            const savedItems = localStorage.getItem('inventory');
            if (savedItems) {
                this.items = JSON.parse(savedItems);
            }
        },

        initData() {
            if (this.items.length === 0) {
                this.items = [...DEFAILT_ITEMS];
            }
        },

        selectItem(item: InventoryItem) {
            this.selectedItem = item;
        },

        updatePosition(itemId: number, position: number) {
            const itemIndex = this.itemIndex(itemId);
            
            const existingItem = this.items.findIndex(item => item.position === position);
    
            if (existingItem !== -1) {
                const oldPosition = this.items[itemIndex].position;
                this.items[existingItem].position = oldPosition;
            }
    
            this.items[itemIndex].position = position;
            localStorage.setItem('inventory', JSON.stringify(this.items));
        },
    
        updateCount(itemId: number, count: number) {
            const itemIndex = this.itemIndex(itemId);
            this.items[itemIndex].count -= count;
            localStorage.setItem('inventory', JSON.stringify(this.items));
        }
    }

    //return {items, selectItem, selectedItem, updatePosition, updateCount};
})