<template>
  <div class="antialiased text-gray-900 px-6">
    <div class="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
      <div class="py-8">
        <h1 class="text-3xl font-bold">Githubber by <a class="underline text-blue-600" href="https://github.com/f3l1x">@f3l1x</a></h1>
      </div>
      <div class="py-12">
        <h2 class="text-2xl font-bold">Release</h2>
        <div class="mt-8">
          <div class="grid grid-cols-1 gap-6">
            <label class="block">
              <span class="text-gray-700">Package <small class="text-gray-500">vendor/repo</small></span>
              <input v-model="package" type="text" class="mt-1 w-2/4 block rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="f3l1x/f3l1x"/>
            </label>
            <label class="block">
              <span class="text-gray-700">Version <small class="text-gray-500">vX.Y.Z</small></span>
              <input v-model="version" type="text" class="mt-1 block w-2/4 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="v1.2.3"/>
            </label>
            <label class="block">
              <span class="text-gray-700">Release notes</span>
              <textarea v-model="notes" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" rows="10" placeholder="Will be generated..."></textarea>
            </label>
            <div class="block">
              <div class="mt-2">
                <button @click.prevent.stop="generate" class="bg-gray-400 hover:bg-blue-dark focus:outline-none hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    package: null,
    version: null,
    notes: null,
  }),
  methods: {
    async generate() {
      const url = new URL(`/release/${this.package}`, window.location.origin);

      if (this.version) {
        url.searchParams.append('version', this.version);
      }

      const res = await fetch(url.toString());

      if (!res.ok) {
        console.error(await res.text());
        return;
      }

      const data = await res.json();
      this.notes = data.release;
    }
  }
};
</script>

