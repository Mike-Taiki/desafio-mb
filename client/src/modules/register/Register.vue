<script setup>
import { ref } from "vue";
import Heading from "@/shared/components/Heading/Heading.vue";
import Input from "@/shared/components/Input/Input.vue";
import { headingOptionsEnum } from "@/shared/components/Heading/types.js";

const name = ref("");
</script>

<template>
  <Heading :level="headingOptionsEnum.MD">Seja bem vindo(a)</Heading>
  <Input v-model="name" label="Endereço de e-mail" id="email" />
</template>
