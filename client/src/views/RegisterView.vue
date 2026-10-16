<template>
  <div class="flex justify-center items-center min-h-screen bg-bg-muted">
    <div class="bg-white p-10 rounded-xl shadow-sm w-full max-w-md text-center">
      <div class="w-20 h-20 mx-auto mb-6 bg-bg-muted rounded-lg flex items-center justify-center text-fg-muted">
        <img src="../assets/logo.svg" alt="Logo" class="w-12 h-12" />
      </div>

      <h2 class="text-2xl font-bold text-fg-default mb-2">Create your account</h2>
      <p class="text-sm text-fg-muted mb-6">Finish tasks, earn fries, collect poutines.</p>

      <form class="text-left" @submit.prevent="handleSubmit" >
        <div class="mb-5">
          <label for="username" class="block text-sm font-semibold mb-1 text-fg-default">Username</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="Username"
            required
            class="w-full px-3 py-2 border border-border-default rounded-md text-sm focus:outline-none focus:border-green-600 box-border"
          />
        </div>
        <div class="mb-5">
          <label for="email" class="block text-sm font-semibold mb-1 text-fg-default">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            required
            class="w-full px-3 py-2 border border-border-default rounded-md text-sm focus:outline-none focus:border-green-600 box-border"
          />
        </div>
        <div class="mb-5">
          <label for="" class="block text-sm font-semibold mb-1 text-fg-default">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Password"
            minlength="8"
            required
            class="w-full px-3 py-2 border border-border-default rounded-md text-sm focus:outline-none focus:border-green-600 box-border"
          />
          <small class="block mt-1 text-xs text-fg-muted">Password must be at least 8 characters long.</small>
        </div>
        <p v-if="errorMessage" role="alert" class="text-sm text-fg-danger mb-4">{{ errorMessage }}</p>
        <button type="submit" class="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-md text-sm cursor-pointer mt-2">Create Account</button>
      </form>
      <p class="mt-6 text-sm text-fg-muted">
        Already have an account? <router-link to="/login" class="text-blue-600 font-medium hover:underline">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
      },
      errorMessage: '',
    };
  },
  methods: {
    handleSubmit() {
      this.errorMessage = '';
      
      if (this.form.password.length < 8) {
        this.errorMessage = 'Password must be at least 8 characters long.';
        return;
      }
      const { password, ...safeForm } = this.form;
      console.log('Form submitted:', safeForm);
    },
  },
};
</script>