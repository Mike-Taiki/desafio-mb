<script setup>
import Heading from "@/shared/components/Heading/Heading.vue";
import Input from "@/shared/components/Input/Input.vue";
import { headingOptionsEnum } from "@/shared/components/Heading/types.js";
</script>

<template>
  <Heading :level="headingOptionsEnum.MD">Seja bem vindo(a)</Heading>
  <Input v-model="name" placeholder="Digite seu nome" />
</template>
