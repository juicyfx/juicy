<template>
  <div>
    <h2>RAW data</h2>
    <div class="flex flex-row mb-2 flex-spacing-1">
      <textarea v-model="raw" class="input-text flex-grow" type="text"></textarea>
      <button class="btn" @click="toPdf()">To PDF</button>
    </div>
    <div v-if="loading" align="center">Loading...</div>
    <embed @load="loaded()" :src="pdf" width="100%" ref="pdf" height="0" />
  </div>
</template>
<script>
export default {
  data: () => ({
    raw: "This is awesome! Right?",
    pdf: undefined,
    show: false,
    loading: false
  }),
  methods: {
    toPdf() {
      this.pdf = `https://podfuk.juicyfx1.now.sh/raw/?raw=${this.raw}`;
      this.loading = true;
    },
    loaded() {
      this.show = true;
      this.loading = false;
      this.$refs.pdf.height = "500px";
    }
  }
};
</script>
