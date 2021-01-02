<template>
  <div class="antialiased text-gray-900 px-6">
    <div class="max-w-xl mx-auto divide-y md:max-w-4xl">
      <div class="py-8">
        <h1 class="text-3xl font-bold">Githubber by <a class="underline text-blue-600" href="https://github.com/f3l1x">@f3l1x</a></h1>
      </div>
      <div class="py-8">
        <div class="flex space-x-4">
          <router-link to="/release" v-slot="{ href, route, navigate, isActive, isExactActive }">
            <a :href="href" @click="navigate" :class="[isActive ? 'underline text-black': 'text-gray-500']"  class="text-2xl font-bold">Release</a>
          </router-link>
          <router-link to="/readme" v-slot="{ href, route, navigate, isActive, isExactActive }">
            <a :href="href" @click="navigate" :class="[isActive ? 'underline text-black': 'text-gray-500']"  class="text-2xl font-bold">Readme</a>
          </router-link>
        </div>
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

