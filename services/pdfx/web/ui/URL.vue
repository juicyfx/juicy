<template>
  <div>
    <h2>URL</h2>
    <div class="flex flex-row mb-2 flex-spacing-1">
      <input v-model="url" class="input-text flex-grow" type="text"/>
      <button class="btn" @click="toPdf()">To PDF</button>
    </div>
    <Options ref="options"></Options>
    <div v-if="loading" align="center">Loading...</div>
    <embed @load="loaded()" :src="pdf" :key="pdf" width="100%" ref="pdf" height="0"/>
  </div>
</template>
<script>
import Options from "./Options";
import {API_URL} from "./../utils/api";

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
      this.$refs.pdf.height = "0px";
      this.loading = true;

      const params = new URLSearchParams({
        ...this.$refs.options.$data,
        ...{url: this.url, time: Math.floor(Date.now() / 1000)}
      });
      this.pdf = `${API_URL}/url/?${params.toString()}`;
    },
    loaded() {
      this.show = true;
      this.loading = false;
      this.$refs.pdf.height = "500px";
    }
  }
};
</script>
