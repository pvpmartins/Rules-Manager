<template>
  <div class="new-rule-modal">
    <slot></slot>
    <form @submit.prevent="submitRule()">
      <b-input-group prepend="Rule Name" class="mb-2">
        <b-form-input v-model="house_rules.name"></b-form-input>
      </b-input-group>
      <b-form-checkbox v-model="house_rules.active" switch size="lg"
        >Is it active?</b-form-checkbox
      >
      <b-button type="submit" variant="warning">Submit</b-button>
    </form>
    <div @click="$emit('close-modal')" class="close-modal">X</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      house_rules: {
        name: '',
        active: false,
      },
    }
  },
  methods: {
    submitRule() {
      const newObj = {
        ...this.house_rules,
        active: this.house_rules['active'] ? 1 : 0,
      }
      this.$emit('new-rule', newObj)
    },
  },
  emits: ['new-rule', 'close-modal'],
})
</script>

<style scoped lang="scss">
.new-rule-modal {
  width: 40%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  z-index: 4;
  background-color: #005aff;
  padding: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .custom-control {
    color: white;
  }
  .close-modal {
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 9999px;
    position: absolute;
    top: -10px;
    right: -10px;
    
    cursor: pointer; 
    box-shadow: 0 0 2px black;
  }
}
</style>
