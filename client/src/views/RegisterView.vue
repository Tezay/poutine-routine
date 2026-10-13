<template>
    <div class="register-container">
        <div class = "register-card">
            <div class ="logo-placeholder">
                <img src="../assets/logo.svg" alt="Logo" class="logo-image" />
            </div>

            <h2 >Create your account</h2>
            <p class="subtitle">Finish tasks, earn fries, collect poutines.</p>

            <form @submit.prevent="handleSubmit" class="register-form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" v-model="form.username" placeholder="Username" required />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="form.email" placeholder="you@example.com" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="form.password" placeholder="Password" minlength="8" required />
                    <small class="password-hint">Password must be at least 8 characters long.</small>

                </div>
                <button type="submit" class="register-button">Create Account</button>
            </form>
            <p class="login-link">Already have an account? <router-link to="/login">Sign in</router-link></p>
        </div>
    </div> 
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
    username: '',
    email: '',
    password: ''
});

const handleSubmit = () => {
    if (form.password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }
    console.log('Form submitted:', { ...form });
};
</script>

<style scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f6f3eb;
}

.register-card {
    background-color: #ffffff;
    padding: 2.5rem 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 400px;
    text-align: center;
}

.logo-placeholder {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    background-color: #f1ede4;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8c8273;
}
h2 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: #111827;
}

.subtitle {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.register-form {
  text-align: left;
}

.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  color: #111827;
}

input {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.95rem;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #16a34a;
}

.password-hint {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.775rem;
  color: #6b7280;
}

.register-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #16803d; /* Vert correspondant au bouton */
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  margin-top: 0.5rem;
}

.register-button:hover {
  background-color: #146c34;
}

.login-link {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.login-link a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>

