<template>
  <div>
    <h2>URL</h2>
    <div class="flex flex-row mb-2 flex-spacing-1">
      <input v-model="url" class="input-text flex-grow" type="text" />
      <button class="btn" @click="toPdf()">To PDF</button>
    </div>
    <Options ref="options"></Options>
    <div v-if="loading" align="center">Loading...</div>
    <embed @load="loaded()" :src="pdf" width="100%" ref="pdf" height="0" />
  </div>
</template>
<script>
import Options from "./Options";

export default {
  components: {
    Options
  },
  data: () => ({
    url: "https://f3l1x.io",
    pdf: undefined,
    show: false,
    loading: false
  }),
  methods: {
    toPdf() {
      const params = new URLSearchParams({
        ...this.$refs.options.$data,
        ...{ url: this.url }
      });
      this.pdf = `https://podfuk.juicyfx1.now.sh/url/?${params.toString()}`;
      this.loading = true;
    },
    loaded() {
      console.log('X');
      this.show = true;
      this.loading = false;
      this.$refs.pdf.height = "500px";
    }
  }
};
</script>
