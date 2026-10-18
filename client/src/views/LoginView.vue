<script>
import MascotSprite from '../components/MascotSprite.vue';

export default {
  components: {
    MascotSprite,
  },
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    onSubmit() {
      this.emailError = this.email.trim() === '' ? 'Email is required.' : '';
      this.passwordError = this.password === '' ? 'Password is required.' : '';

      if (this.emailError !== '' || this.passwordError !== '') {
        return;
      }
      console.log(this.email);
    },
  },
};
</script>

<template>
  <form
    novalidate
    class="flex w-full max-w-md flex-col gap-4 rounded-xl border border-border-muted bg-bg-default p-8"
    @submit.prevent="onSubmit"
  >
    <MascotSprite class="mx-auto size-24" />

    <div class="text-center">
      <h1 class="text-2xl font-bold text-fg-default">Welcome back</h1>
      <p class="mt-2 text-fg-muted">Your poutines missed you.</p>
    </div>

    <div class="flex flex-col gap-1">
      <label for="email" class="font-semibold text-fg-default">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="you@example.com"
        class="rounded-md border border-border-default bg-bg-default px-3 py-2 text-fg-default"
      />
      <p v-if="emailError" role="alert" class="text-sm text-fg-danger">{{ emailError }}</p>
    </div>

    <div class="flex flex-col gap-1">
      <label for="password" class="font-semibold text-fg-default">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        class="rounded-md border border-border-default bg-bg-default px-3 py-2 text-fg-default"
      />
      <p v-if="passwordError" role="alert" class="text-sm text-fg-danger">{{ passwordError }}</p>
    </div>

    <button
      type="submit"
      class="rounded-md bg-bg-primary-emphasis px-4 py-3 text-fg-on-emphasis hover:bg-bg-primary-emphasis-hover"
    >
      Sign in
    </button>

    <p class="text-center text-fg-muted">
      New here?
      <router-link to="/register" class="text-fg-accent">Create an account</router-link>
    </p>
  </form>
</template>
