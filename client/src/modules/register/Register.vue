<script setup>
import { ref } from "vue";
import { headingOptionsEnum } from "@/shared/components/Heading/types.js";
import Heading from "@/shared/components/Heading/Heading.vue";
import Input from "@/shared/components/Input/Input.vue";
import Step from "@/shared/components/Step/Step.vue";

const name = ref("");
const currentStep = ref(1);
const totalSteps = ref(5);
</script>

<template>
  <section class="register">
    <Step
      class="register__step"
      :current-step="currentStep"
      :total-steps="totalSteps"
    />
    <Heading class="register__heading" :level="headingOptionsEnum.MD"
      >Seja bem vindo(a)</Heading
    >
    <Input
      class="register__input"
      label="Endereço de e-mail"
      id="email"
      v-model="name"
    />
  </section>
</template>
<style lang="scss" scoped>
.register {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;

  &__step {
    margin-bottom: $margin-1;
    grid-column: 2 / 3;
  }

  &__heading {
    margin-bottom: $margin-6;
    grid-column: 2 / 3;
  }

  &__input {
    grid-column: 2 / 3;
  }
}
</style>
