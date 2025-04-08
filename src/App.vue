<script setup>
import InventoryGrid from './components/InventoryGrid.vue';
import Panel from './components/Panel.vue';
import Slider from './components/Slider.vue';
</script>

<template>
  <div class="inventory">
    <div class="main">
      <Panel />
      <InventoryGrid />
    </div>
    <Slider />
  </div>
</template>

<style scoped>
.inventory {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-family: 'SF Pro Display';
}

.main {
  display: flex;
  flex-direction: row;
}
</style>
