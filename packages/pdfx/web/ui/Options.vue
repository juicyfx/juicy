<template>
  <div class="options flex flex-spacing-1 flex-v-center">
    <div>
      <label>Scale</label>
      <input v-model="scale" class="input-text input-text--sm" maxlength="1" type="number" min="1" max="9">
    </div>
    <div>
      <label>Format</label>
      <select class="input-select" v-model="format">
        <option value="A5">A5</option>
        <option value="A4">A4</option>
        <option value="A3">A3</option>
        <option value="A2">A2</option>
      </select>
    </div>
    <div>
      <label>Background</label>
      <input class="input-checkbox" type="checkbox" v-model="printBackground">
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    printBackground: false,
    format: 'A4',
    scale: 1
  })
};
</script>
