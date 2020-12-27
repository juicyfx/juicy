<template>
  <textarea v-model="internal" ref="textarea" @input="onChange"></textarea>
</template>
<script>
export default {
  props: ["value"],
  data: () => ({
    internal: null
  }),
  watch: {
    internal(value) {
      this.$emit("input", value);
    },
    value: {
      handler(value) {
        this.internal = value;
        this.onChange();
      },
      immediate: true
    }
  },
  methods: {
    onChange() {
      if (!this.$refs.textarea) return;
      this.$nextTick(() => {
        this.$refs.textarea.style.height = "auto";
        this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + "px";
      });
    }
  }
};
</script>
<style scoped>
textarea {
  resize: none;
  min-height: 100px;
  padding: 5px;
  box-sizing: border-box;
}
</style>
