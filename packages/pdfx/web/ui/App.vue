<template>
  <div id="app">
    <main>
      <article>
        <aside>
          <h1>Juicy(fx) / PDF[x]</h1>
          <span class="time">
            Creates PDF from URL, RAW data or POST data easily. Running on
            <a href="https://zeit.co">ZEIT Now</a>.
          </span>
        </aside>
        <div class="content">
          <URL></URL>
          <Raw></Raw>
          <Post ref="post"></Post>
          <Features @showtime="onShowtime"></Features>
        </div>
      </article>
    </main>
  </div>
</template>

<script>
import URL from "./URL";
import Raw from "./Raw";
import Post from "./Post";
import Features from "./Features";

export default {
  components: {
    URL,
    Raw,
    Post,
    Features
  },
  methods: {
    onShowtime(feature) {
      this.$refs.post.type(feature);
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
  Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  margin: 0;
}

main {
  padding: 30px;
  box-sizing: border-box;
  position: relative;
  min-height: 100%;
}

article {
  overflow-wrap: break-word;
  hyphens: auto;
  max-width: 620px;
  margin: 0px auto;

  .time {
    color: rgb(124, 124, 124);
    font-size: 0.9rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.6rem;
    margin: 22px 0px;
  }

  a {
    color: #0033ce;
    text-decoration: none;
    border-bottom: 1px solid currentColor;
  }

  figure {
    width: 100%;
    font-size: 0px;
    line-height: 0;
    margin: 0px 0px 40px;
    border-radius: 6px;
    overflow: hidden;
    text-align: center;
    position: relative;

    img {
      max-width: none;
      width: 100%;
      object-fit: cover;
    }
  }

  h1 {
    font-weight: 500;
    margin: 0 0 8px 0;
    padding-right: 0;
    line-height: 1.3em;
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }
}

.input-text {
  border: 1px solid #eaeaea;
  border-radius: 5px;
  color: #000;
  background-color: transparent;
  caret-color: #000;
  outline: 0px;
  font-size: 1rem;
  padding: 0.5rem;
}

.input-checkbox {
  margin: 0.5rem 0;
}

.input-text--sm {
  font-size: 0.8rem;
  padding: 0.2rem;
}

.input-select {
  border: 1px solid #eaeaea;
  border-radius: 5px;
  color: #000;
  background-color: transparent;
  caret-color: #000;
  outline: 0px;
  padding: 0.2rem;
  font-size: 0.8rem;
  padding: 0.25rem;
  -webkit-appearance: none;
}

.btn {
  background: #3291ff;
  color: #fff;
  border-radius: 5px;
  outline: 0px;
  border: 0;
  font-size: 1rem;
  padding: 0.5rem 2rem;
}

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

.flex-grow {
  flex-grow: 1;
}

.flex-v-center {
  align-content: center;
  vertical-align: middle;
}

.mb-2 {
  margin-bottom: 1rem;
}

.options {
  font-size: 0.8rem;
}

.flex-spacing-1 {
  * {
    margin-right: 0.5rem;
  }

  *:last-child {
    margin-right: 0;
  }
}

aside {
  margin-bottom: 35px;
  margin-top: 14px;
}

@media (min-width: 768px) {
  main {
    padding: 45px;
  }
}
</style>
