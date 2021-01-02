<template>
  <div>
    <h2>RAW data</h2>
    <div class="flex flex-row mb-2 flex-spacing-1">
      <auto-textarea v-model="raw" class="input-text flex-grow"></auto-textarea>
      <button class="btn" @click="toPdf()">To PDF</button>
    </div>
    <div v-if="loading" align="center">Loading...</div>
    <embed @load="loaded()" :src="pdf" :key="pdf" width="100%" ref="pdf" height="0"/>
  </div>
</template>
<script>
import {API_URL} from "./../utils/api";
import AutoTextarea from "./components/AutoTextarea";

export default {
  components: {
    AutoTextarea,
  },
  data: () => ({
    raw: "This is awesome! Right?",
    pdf: undefined,
    show: false,
    loading: false
  }),
  methods: {
    toPdf() {
      this.pdf = `${API_URL}/raw/?raw=${this.raw}&_time=${Math.floor(Date.now() / 1000)}`;
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
