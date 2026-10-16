<template>
  <div class="flex min-h-screen items-center justify-center bg-bg-muted">
    <div
      class="w-full max-w-md rounded-xl border border-border-muted bg-bg-default p-10 text-center"
    >
      <div
        aria-hidden="true"
        class="mx-auto mb-6 flex size-28 items-center justify-center rounded-xl border-2 border-dashed border-border-default bg-bg-inset text-sm text-fg-muted"
      >
        mascot
      </div>

      <h1 class="mb-2 text-2xl font-bold text-fg-default">Create your account</h1>
      <p class="mb-6 text-fg-muted">Finish tasks, earn fries, collect poutines.</p>

      <form class="text-left" @submit.prevent="handleSubmit">
        <div class="mb-5">
          <label for="username" class="mb-1 block font-semibold text-fg-default">Username</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="Username"
            required
            class="w-full rounded-md border border-border-default bg-bg-default px-3 py-2 text-fg-default"
          />
        </div>
        <div class="mb-5">
          <label for="email" class="mb-1 block font-semibold text-fg-default">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            required
            class="w-full rounded-md border border-border-default bg-bg-default px-3 py-2 text-fg-default"
          />
        </div>
        <div class="mb-5">
          <label for="password" class="mb-1 block font-semibold text-fg-default">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            minlength="8"
            required
            aria-describedby="password-hint"
            class="w-full rounded-md border border-border-default bg-bg-default px-3 py-2 text-fg-default"
          />
          <p id="password-hint" class="mt-1 text-sm text-fg-muted">At least 8 characters.</p>
        </div>
        <button
          type="submit"
          class="w-full cursor-pointer rounded-md bg-bg-primary-emphasis px-4 py-3 font-semibold text-fg-on-emphasis hover:bg-bg-primary-emphasis-hover"
        >
          Create account
        </button>
      </form>

      <p class="mt-6 text-fg-muted">
        Already have an account?
        <router-link to="/login" class="font-medium text-fg-accent hover:underline">
          Sign in
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log({ username: this.form.username, email: this.form.email });
    },
  },
};
</script>
