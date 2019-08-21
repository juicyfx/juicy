<template>
  <div>
    <h2>Features</h2>
    <ul>
      <li>
        <a @click.prevent="onFeature('EMOJI')" href="#">Emoji</a> 🚀🔥👍
      </li>
      <li>
        <a @click.prevent="onFeature('FONTS')" href="#">Fonts</a>
      </li>
    </ul>
  </div>
</template>
<script>
import * as showtime from "./../data/showtime";

export default {
  methods: {
    onFeature(feature) {
      this.$emit("showtime", showtime[feature].trim());
    }
  }
};
</script>
