<template>
  <AppTopbar title="Settings" action-label="Save changes" />

  <div class="flex max-w-2xl flex-col gap-5 p-6">
    <section class="rounded-xl border border-border-default bg-bg-default p-5">
      <h2 class="mb-3 text-base font-semibold">Daily goal</h2>
      <div class="flex items-center gap-3">
        <div class="flex items-center rounded-md border border-border-default bg-bg-muted">
          <button
            type="button"
            aria-label="Decrease daily goal"
            class="h-8 w-8 cursor-pointer disabled:opacity-40"
            :disabled="dailyGoal <= 1"
            @click="dailyGoal--"
          >
            −
          </button>
          <span class="w-10 bg-bg-default text-center font-semibold leading-8">{{
            dailyGoal
          }}</span>
          <button
            type="button"
            aria-label="Increase daily goal"
            class="h-8 w-8 cursor-pointer"
            @click="dailyGoal++"
          >
            +
          </button>
        </div>
        <span class="text-fg-muted">tasks per day · reaching it earns {{ goalReward }} 🍟</span>
      </div>
      <hr class="my-4 border-border-default" />
      <div class="flex items-center gap-3">
        <span class="rounded-full border border-border-default px-3 py-0.5 font-semibold">
          🔥 {{ user.current_streak }}
        </span>
        <span class="text-fg-muted">Current streak · best streak {{ user.best_streak }} days</span>
      </div>
    </section>

    <section class="rounded-xl border border-border-default bg-bg-default p-5">
      <h2 class="mb-3 text-base font-semibold">Companion</h2>
      <p class="text-fg-muted">The poutine that keeps you company on the board.</p>
      <div class="mt-3 flex flex-wrap gap-3">
        <button
          v-for="poutine in ownedPoutines"
          :key="poutine.id"
          type="button"
          :aria-pressed="poutine.id === companionId"
          class="flex w-28 cursor-pointer flex-col items-center gap-1 rounded-lg border-2 p-1.5 text-center text-xs"
          :class="
            poutine.id === companionId
              ? 'border-border-accent font-semibold text-fg-accent'
              : 'border-border-default text-fg-muted'
          "
          @click="companionId = poutine.id"
        >
          <span class="flex w-full justify-center rounded-md bg-bg-inset py-1">
            <PoutineSprite :slug="poutine.slug" class="size-24" />
          </span>
          <span>{{ poutine.name }}</span>
        </button>
      </div>
    </section>

    <section class="rounded-xl border border-border-default bg-bg-default p-5">
      <h2 class="mb-3 text-base font-semibold">Account</h2>
      <label for="email" class="mb-1 block font-semibold">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        class="w-full rounded-md border border-border-default bg-bg-default px-3 py-2"
      />
      <label for="password" class="mb-1 mt-3 block font-semibold">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        aria-describedby="password-hint"
        class="w-full rounded-md border border-border-default bg-bg-default px-3 py-2"
      />
      <p id="password-hint" class="mb-3 mt-1 text-xs text-fg-muted">
        Changing your password signs you out everywhere.
      </p>
      <div class="flex gap-2">
        <button
          type="button"
          class="cursor-pointer rounded-md border border-border-default bg-bg-muted px-3 py-1.5 hover:bg-bg-muted-hover"
        >
          Update account
        </button>
        <button
          type="button"
          class="cursor-pointer rounded-md border border-border-default bg-bg-muted px-3 py-1.5 hover:bg-bg-muted-hover"
        >
          Sign out
        </button>
      </div>
    </section>

    <section class="rounded-xl border border-border-danger bg-bg-default p-5">
      <h2 class="mb-3 text-base font-semibold">Delete account</h2>
      <p class="mb-3 text-fg-muted">
        Your tasks and your whole collection are deleted. This cannot be undone.
      </p>
      <button
        type="button"
        class="cursor-pointer rounded-md border border-border-danger px-3 py-1.5 text-fg-danger hover:bg-bg-danger-muted"
      >
        Delete my account
      </button>
    </section>
  </div>
</template>

<script>
import AppTopbar from '../components/AppTopbar.vue';
import PoutineSprite from '../components/PoutineSprite.vue';
import user from '../mock/user.js';
import poutines from '../mock/poutines.js';

export default {
  components: {
    AppTopbar,
    PoutineSprite,
  },
  data() {
    return {
      user,
      goalReward: 20,
      dailyGoal: user.daily_goal,
      companionId: user.companion_poutine_id,
      email: user.email,
      password: '',
      ownedPoutines: poutines.filter((poutine) => poutine.quantity > 0),
    };
  },
};
</script>
