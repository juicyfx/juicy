<template>
  <div>
    <h2>Post data</h2>
    <div class="flex flex-row mb-2 flex-spacing-1">
      <auto-textarea v-model="data" class="input-text flex-grow"></auto-textarea>
      <button class="btn" @click="toPdf()">To PDF</button>
    </div>
    <div v-if="loading" align="center">Loading...</div>
    <embed v-if="file" :src="file" width="100%" height="500px"/>
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
    data: "This is awesome! Right?",
    file: undefined,
    loading: false
  }),
  methods: {
    async toPdf() {
      this.loading = true;
      this.file = undefined;

      const body = this.data;
      const res = await fetch(`${API_URL}/post/`, {
        body,
        headers: {
          "Content-Type": "text/plain",
          "Content-Length": body.length
        },
        method: "POST"
      });

      const text = await res.blob();
      const file = new Blob([text], {type: "application/pdf"});
      const fileurl = URL.createObjectURL(file);
      this.file = fileurl;
      this.loading = false;
    },
    type(data) {
      this.data = data;
      this.file = undefined;
    }
  }
};
</script>
