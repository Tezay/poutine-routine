<template>
  <section class="settings">
    <div class="card">
      <h2>Daily goal</h2>
      <button @click="dailyGoal--">-</button>
      <span>{{ dailyGoal }}</span>
      <button @click="dailyGoal++">+</button>
      <span>tasks per day · reaching it earns {{ user.goalReward }} 🍟</span>
      <p>🔥 {{ user.streak }} Current streak · best streak {{ user.bestStreak }} days</p>
    </div>

    <div class="card">
      <h2>Companion</h2>
      <p>The poutine that keeps you company on the board.</p>
      <button
        v-for="poutine in ownedPoutines"
        :key="poutine.id"
        :class="{ selected: poutine.id === companionId }"
        @click="companionId = poutine.id"
      >
        {{ poutine.name }}
      </button>
    </div>

    <div class="card">
      <h2>Account</h2>
      <label>Email</label>
      <input v-model="email" type="email" />
      <label>Password</label>
      <input v-model="password" type="password" />
      <p>Changing your password signs you out everywhere.</p>
      <button>Update account</button>
      <button>Sign out</button>
    </div>

    <div class="card danger">
      <h2>Delete account</h2>
      <p>Your tasks and your whole collection are deleted. This cannot be undone.</p>
      <button>Delete my account</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { user } from '../mock/user.js';
import { poutines } from '../mock/poutines.js';

const dailyGoal = ref(user.dailyGoal);
const companionId = ref(user.companionId);
const email = ref(user.email);
const password = ref(user.password);

const ownedPoutines = poutines.filter((poutine) => poutine.quantity > 0);
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 44rem;
}

.card {
  padding: 1rem;
  border: 1px solid #e6dfd2;
  border-radius: 8px;
}

.danger {
  border-color: #d9383a;
}

.danger button {
  color: #d9383a;
}

.selected {
  border: 2px solid #2563eb;
}
</style>
