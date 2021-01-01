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
        <div class="flex space-x-4">
          <label class="flex-1">
            <span class="text-gray-700">Base <small class="text-gray-500">vX.Y.Z</small></span>
            <input v-model="base.value" type="text" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="v1.2.3"/>
          </label>
          <label class="flex-1">
            <span class="text-gray-700">Version <small class="text-gray-500">vX.Y.Z</small></span>
            <input v-model="version.value" type="text" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="v1.2.3"/>
          </label>
        </div>
        <label class="block">
          <span class="text-gray-700">Release notes</span>
          <textarea v-model="notes.value" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" rows="10" placeholder="Will be generated..."></textarea>
        </label>
        <div class="block">
          <div class="mt-2 flex space-x-4">
            <div class="flex-1 flex justify-end space-x-2">
              <button
                  :disabled="!pkg.valid"
                  @click.prevent.stop="changeSemver(null)"
                  :class="[semver === null ? 'bg-gray-600 border-gray-600 text-white' : 'text-gray-400', pkg.valid ? 'hover:bg-gray-600 hover:border-gray-600 ' : 'cursor-default opacity-50']"
                  class="flex border border-gray-400 focus:outline-none font-bold py-1 px-4 rounded"
                  type="button"
              >
                None
              </button>
              <button
                  :disabled="!pkg.valid"
                  @click.prevent.stop="changeSemver('major')"
                  :class="[semver === 'major' ? 'bg-gray-600 border-gray-600 text-white' : 'text-gray-400', pkg.valid ? 'hover:bg-gray-600 hover:border-gray-600 ' : 'cursor-default opacity-50']"
                  class="flex border border-gray-400 focus:outline-none font-bold py-1 px-4 rounded"
                  type="button"
              >
                Major
              </button>
              <button
                  :disabled="!pkg.valid"
                  @click.prevent.stop="changeSemver('minor')"
                  :class="[semver === 'minor' ? 'bg-gray-600 border-gray-600 text-white' : 'text-gray-400', pkg.valid ? 'hover:bg-gray-600 hover:border-gray-600 ' : 'cursor-default opacity-50']"
                  class="flex border border-gray-400 focus:outline-none font-bold py-1 px-4 rounded"
                  type="button"
              >
                Minor
              </button>
              <button
                  :disabled="!pkg.valid"
                  @click.prevent.stop="changeSemver('patch')"
                  :class="[semver === 'patch' ? 'bg-gray-600 border-gray-600 text-white' : 'text-gray-400', pkg.valid ? 'hover:bg-gray-600 hover:border-gray-600 ' : 'cursor-default opacity-50']"
                  class="flex border border-gray-400 focus:outline-none font-bold py-1 px-4 rounded"
                  type="button"
              >
                Patch
              </button>
            </div>
            <div class="w-px bg-gray-200"></div>
            <div>
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
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import * as semver from "../../lib/semver";

export default {
  data: () => ({
    pkg: {
      valid: false,
      value: null,
    },
    base: {
      valid: null,
      value: null,
    },
    version: {
      valid: null,
      value: null,
    },
    notes: {
      valid: null,
      value: null,
    },
    semver: 'minor',
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

      if (this.semver) {
        await this.fetchSemver();
      }

      await this.fetch();

      this.loading = false;
    },
    async fetch() {
      const url = new URL(`/repos/${this.pkg.value}/release/notes`, window.location.origin);

      if (this.base.value) {
        url.searchParams.append("base", this.base.value);
      }
      if (this.version.value) {
        url.searchParams.append("version", this.version.value);
      }

      const res = await fetch(url.toString());

      if (!res.ok) {
        this.errors.push(await res.text());
      } else {
        const data = await res.json();
        this.notes.value = data.release;
      }
    },
    async fetchSemver() {
      const res = await fetch(`/repos/${this.pkg.value}/tags`);

      if (!res.ok) {
        this.errors.push(await res.text());
      } else {
        const data = await res.json();
        const tag = Array.from(data.tags).shift();

        if (tag) {
          this.version.value = 'v' + semver.next(tag, this.semver);
        }
      }
    },
    changeSemver(semver) {
      this.semver = semver;
    },
  },
};
</script>

