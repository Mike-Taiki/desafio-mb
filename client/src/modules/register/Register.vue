<script setup>
import { ref } from "vue";
import { headingOptionsEnum } from "@/shared/components/Heading/types.js";
import Heading from "@/shared/components/Heading/Heading.vue";
import Input from "@/shared/components/Input/Input.vue";
import Step from "@/shared/components/Step/Step.vue";
import Button from "@/shared/components/Button/Button.vue";
import Radio from "@/shared/components/Radio/Radio.vue";

const name = ref("");
const currentStep = ref(1);
const totalSteps = ref(5);
const selectedOption = ref("");
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
    <div class="register-person-type">
      <Radio
        value="Pessoa física"
        label="Pessoa fisica"
        id="pessoa_fisica"
        v-model="selectedOption"
      />
      <Radio
        value="Pessoa juridica"
        label="Pessoa jurídica"
        id="pessoa_juridica"
        v-model="selectedOption"
      />
    </div>
    <Button class="register__button" @click="currentStep++">Continuar</Button>
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
  }

  &__heading {
    margin-bottom: $margin-6;
  }

  &__input {
    margin-bottom: $margin-3;
  }

  &-person-type {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: $margin-3;

    & > :nth-child(n + 1) {
      margin-right: $margin-3;
    }
  }
}
</style>
