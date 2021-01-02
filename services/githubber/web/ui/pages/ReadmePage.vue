<template>
  <div>
    <form @submit="generate" class="mt-8">
      <div class="grid grid-cols-1 gap-6">
        <label class="block">
          <span class="text-gray-700">Package <small class="text-gray-500">vendor/repo</small></span>
          <input
              v-model="pkg.value"
              type="text"
              :class="[pkg.value && !pkg.valid ? 'focus:border-red-500' : 'focus:border-gray-500 ']"
              class="mt-1 w-2/4 block rounded-md bg-gray-100 border-transparent focus:bg-white focus:ring-0"
              placeholder="f3l1x/f3l1x"
          />
        </label>
        <label class="block">
          <span class="text-gray-700">Readme</span>
          <textarea v-model="notes.value" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" rows="20" placeholder="Will be generated..."></textarea>
        </label>
        <div class="block flex flex-row-reverse">
          <button
              :disabled="!pkg.valid"
              @click.prevent.stop="generate"
              :class="[pkg.valid ? 'hover:bg-blue-800' : 'cursor-default opacity-50']"
              class="flex space-x-2 justify-center items-center bg-blue-600 focus:outline-none text-white font-bold py-1 px-4 rounded"
              type="submit"
          >
            <img v-if="loading" src="https://obr.now.sh/remix/business/donut-chart-line/24/ffffff" class="animate-spin"/>
            <span>Generate</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    pkg: {
      valid: false,
      value: null,
    },
    notes: {
      value: null,
    },
    loading: false,
    errors: [],
  }),
  watch: {
    "pkg.value": {
      handler(value) {
        this.pkg.valid = /\w+\/\w+/.test(value);
      },
    },
  },
  methods: {
    async generate() {
      if (!this.pkg.valid) return;

      this.loading = true;
      this.errors = [];

      await this.fetch();

      this.loading = false;
    },
    async fetch() {
      const url = new URL(`/repos/${this.pkg.value}/readme/notes`, window.location.origin);
      const res = await fetch(url.toString());

      if (!res.ok) {
        this.errors.push(await res.text());
      } else {
        const data = await res.json();
        this.notes.value = data.readme;
      }
    }
  },
};
</script>

