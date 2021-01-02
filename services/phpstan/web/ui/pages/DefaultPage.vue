<template>
  <div>
    <form @submit="generate" class="mt-8">
      <div class="grid grid-cols-1 gap-6">
        <div class="flex space-x-4">
          <label class="block w-32">
            <span class="text-gray-700">Level</span>
            <select v-model="level.value" class="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="max">max</option>
            </select>
          </label>
          <div class="flex flex-col">
            <span class="text-gray-700">Options</span>
            <div class="flex-1 flex content-center space-x-2">
              <label class="inline-flex items-center">
                <input v-model="strict.value" type="checkbox" class="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500">
                <span class="ml-2">Strict</span>
              </label>
              <label class="inline-flex items-center">
                <input v-model="bleeding.value" type="checkbox" class="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500">
                <span class="ml-2">Bleeding edge</span>
              </label>
              <label class="inline-flex items-center">
                <input v-model="phpdoc.value" type="checkbox" class="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500">
                <span class="ml-2">PHPDoc</span>
              </label>
            </div>
          </div>
        </div>
        <label class="block">
          <span class="text-gray-700">Code <small @click.prevent.stop="copyCode">(copy)</small></span>
          <textarea ref="code" v-model="code.value" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" rows="20" placeholder="Place your code here..."></textarea>
        </label>
        <div class="block flex space-x-2 justify-end">
          <button
              @click.prevent.stop="embed"
              class="hover:bg-yellow-800 flex space-x-2 justify-center items-center bg-yellow-600 focus:outline-none text-white font-bold py-1 px-4 rounded"
              type="submit"
          >
            <span>Embed</span>
          </button>
          <button
              @click.prevent.stop="generate"
              class="hover:bg-blue-800 flex space-x-2 justify-center items-center bg-blue-600 focus:outline-none text-white font-bold py-1 px-4 rounded"
              type="submit"
          >
            <img v-if="loading" src="https://obr.now.sh/remix/business/donut-chart-line/24/ffffff" class="animate-spin"/>
            <span>Analyse</span>
          </button>
        </div>
        <div v-if="embedded" class="block flex flex-col space-y-2">
          <pre class="bg-gray-100 p-4 rounded-md"><code v-text="embedded.url" class="whitespace-pre-wrap"></code></pre>
          <pre class="bg-gray-100 p-4 rounded-md"><code v-text="embedded.iframe" class="whitespace-pre-wrap"></code></pre>
        </div>
        <div v-if="errors.length > 0" class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden border-b border-gray-200">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Line
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Error
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(error, index) of errors" :key="index" :class="[index % 2 === 0 ? 'bg-white' : 'bg-gray-50']">
                    <td class="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ error.line }}
                    </td>
                    <td class="px-6 py-2 whitespace-nowrap text-sm">
                      {{ error.message }}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    code: {
      value: "$foo = bar;\n$baz++;",
    },
    level: {
      value: 'max',
    },
    strict: {
      value: false,
    },
    bleeding: {
      value: false,
    },
    phpdoc: {
      value: false,
    },
    loading: false,
    embedded: null,
    errors: [],
  }),
  watch: {
    'code.value': {
      handler() {
        this.embedded = null;
      }
    },
    'level.value': {
      handler() {
        this.embedded = null;
      }
    },
    'strict.value': {
      handler() {
        this.embedded = null;
      }
    },
    'bleeding.value': {
      handler() {
        this.embedded = null;
      }
    },
    'phpdoc.value': {
      handler() {
        this.embedded = null;
      }
    }
  },
  created() {
    const url = new URL(window.location.href);
    const params = Object.fromEntries(url.searchParams);

    if (params.code) {
      this.code.value = atob(params.code);
    }
    if (params.level) {
      this.level.value = params.level;
    }
    if (params.strict) {
      this.strict.value = params.strict;
    }
    if (params.bleeding) {
      this.bleeding.value = params.bleeding;
    }
    if (params.phpdoc) {
      this.phpdoc.value = params.phpdoc;
    }
  },
  methods: {
    async generate() {
      this.loading = true;
      this.errors = [];

      await this._doGenerate();

      this.loading = false;
    },
    async embed() {
      this._doEmbed();
    },
    async copyCode() {
      this.$refs.code.select();
      this.$refs.code.setSelectionRange(0, 99999);
      document.execCommand("copy");
      this.$refs.code.setSelectionRange(0, 0);
    },
    async _doGenerate() {
      const url = new URL('/api', process.env.API_URL || window.location.origin);
      const res = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code: this.code.value,
          level: this.level.value,
        })
      });
      const data = await res.json();
      this.errors = this.errors.concat(...data.result);
    },
    _doEmbed() {
      const url = new URL('/_/embed', window.location.origin);

      url.searchParams.append('level', this.level.value);
      if (this.strict.value) {
        url.searchParams.append('strict', this.level.value);
      }
      if (this.bleeding.value) {
        url.searchParams.append('bleeding', this.bleeding.value);
      }
      if (this.phpdoc.value) {
        url.searchParams.append('phpdoc', this.phpdoc.value);
      }
      url.searchParams.append('code', btoa(this.code.value));

      this.embedded = {
        url: url.toString(),
        iframe: `<iframe src="${url.toString()}" sandbox="allow-forms allow-same-origin allow-scripts" style="width: 100%; height: 1000px; border: 0; border-radius: 4px; overflow: hidden;"></iframe>`,
      }
    }
  },
};
</script>

