<script setup>
import { ref } from "vue";
import Input from "@/shared/components/Input/Input.vue";
import Radio from "@/shared/components/Radio/Radio.vue";
import { PersonTypeEnum } from "@/modules/register/types.js";

const name = ref("");
const selectedOption = ref("");
const personTypeOptions = [
  {
    value: PersonTypeEnum.PHYSICAL,
    label: "Pessoa fisica",
    id: "pessoa_fisica",
  },
  {
    value: PersonTypeEnum.LEGAL,
    label: "Pessoa jurídica",
    id: "pessoa_juridica",
  },
];

const emit = defineEmits(["selectedPersonType"]);
</script>

<template>
  <Input
    class="register__input"
    label="Endereço de e-mail"
    id="email"
    v-model="name"
  />
  <div class="register-person-type">
    <Radio
      v-for="option in personTypeOptions"
      :key="option.value"
      :value="option.value"
      :label="option.label"
      :id="option.id"
      v-model="selectedOption"
      @change="$emit('selectedPersonType', selectedOption)"
    />
  </div>
</template>
<style lang="scss" scoped>
.register {
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
