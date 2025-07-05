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
  <Step :current-step="currentStep" :total-steps="totalSteps" />
  <Heading :level="headingOptionsEnum.MD">Seja bem vindo(a)</Heading>
  <Input label="Endereço de e-mail" id="email" v-model="name" />
</template>
