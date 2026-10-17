<template>
  <section class="flex max-w-2xl flex-col gap-5">
    <div class="rounded-xl border border-stone-200 bg-[#fffdf8] p-5">
      <h2 class="mb-3 text-base font-semibold">Daily goal</h2>
      <div class="flex items-center gap-3">
        <div class="flex items-center rounded-md border border-stone-200 bg-stone-100">
          <button
            type="button"
            class="h-8 w-8 cursor-pointer disabled:opacity-40"
            :disabled="dailyGoal <= 1"
            @click="dailyGoal--"
          >
            −
          </button>
          <span class="w-10 bg-[#fffdf8] text-center font-semibold leading-8">
            {{ dailyGoal }}
          </span>
          <button type="button" class="h-8 w-8 cursor-pointer" @click="dailyGoal++">+</button>
        </div>
        <span class="text-stone-500"> tasks per day · reaching it earns {{ GOAL_REWARD }} 🍟 </span>
      </div>
      <hr class="my-4 border-stone-200" />
      <div class="flex items-center gap-3">
        <span class="rounded-full border border-stone-200 px-3 py-0.5 font-semibold">
          🔥 {{ user.current_streak }}
        </span>
        <span class="text-stone-500">
          Current streak · best streak {{ user.best_streak }} days
        </span>
      </div>
    </div>

    <div class="rounded-xl border border-stone-200 bg-[#fffdf8] p-5">
      <h2 class="mb-3 text-base font-semibold">Companion</h2>
      <p class="text-stone-500">The poutine that keeps you company on the board.</p>
      <div class="mt-3 flex flex-wrap gap-3">
        <button
          v-for="poutine in ownedPoutines"
          :key="poutine.id"
          type="button"
          class="flex w-24 cursor-pointer flex-col items-center gap-1 rounded-lg border-2 bg-[#fffdf8] p-1.5 text-xs"
          :class="
            poutine.id === companionId
              ? 'border-blue-600 font-semibold text-blue-600'
              : 'border-stone-200 text-stone-500'
          "
          @click="companionId = poutine.id"
        >
          <span class="grid h-16 w-full place-items-center rounded-md bg-stone-100">32×32</span>
          <span>{{ poutine.name }}</span>
        </button>
      </div>
    </div>

    <div class="rounded-xl border border-stone-200 bg-[#fffdf8] p-5">
      <h2 class="mb-3 text-base font-semibold">Account</h2>
      <label for="email" class="mb-1 mt-3 block font-semibold">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        class="w-full rounded-md border border-stone-200 bg-[#fffdf8] px-3 py-2"
      />
      <label for="password" class="mb-1 mt-3 block font-semibold">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        class="w-full rounded-md border border-stone-200 bg-[#fffdf8] px-3 py-2"
      />
      <p class="mb-3 mt-1 text-xs text-stone-500">
        Changing your password signs you out everywhere.
      </p>
      <div class="flex gap-2">
        <button
          type="button"
          class="cursor-pointer rounded-md border border-stone-200 bg-stone-100 px-3 py-1.5"
        >
          Update account
        </button>
        <button
          type="button"
          class="cursor-pointer rounded-md border border-stone-200 bg-stone-100 px-3 py-1.5"
        >
          Sign out
        </button>
      </div>
    </div>

    <div class="rounded-xl border border-red-600 bg-[#fffdf8] p-5">
      <h2 class="mb-3 text-base font-semibold">Delete account</h2>
      <p class="mb-3 text-stone-500">
        Your tasks and your whole collection are deleted. This cannot be undone.
      </p>
      <button
        type="button"
        class="cursor-pointer rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-red-600"
      >
        Delete my account
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import user from '../mock/user.js';
import poutines from '../mock/poutines.js';

const GOAL_REWARD = 20;

const dailyGoal = ref(user.daily_goal);
const companionId = ref(user.companion_poutine_id);
const email = ref(user.email);
const password = ref('password');

const ownedPoutines = poutines.filter((poutine) => poutine.quantity > 0);
</script>
