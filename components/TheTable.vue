<template>
  <div class="cmp">
   <b-table :per-page="perPage" :currentPage="currentPage" striped hover :items="formatRule" :fields="fields">
 
  <template #cell(action)="data" >
    
      <b-dropdown
          right
          variant="primary"
style="width: 2rem;"
      >
          <template style="width: 2rem;" v-slot:button-content>
            Select One
          </template>

          <b-dropdown-item @click="emitEdit(data.item.id)">
            Edit
          </b-dropdown-item>

          <b-dropdown-item @click="emitDelete(data.item.id)">
            Delete
          </b-dropdown-item>
          
      </b-dropdown>

  </template>
   </b-table> 
   <b-pagination
v-if="items"
     :total-rows="items.length" 
     :per-page="perPage"
     v-model="currentPage"
   ></b-pagination> 

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PropType } from 'vue/types/v3-component-props';
import {IRule} from '../types'

export default defineComponent({
  data() {
    return {
     currentPage: 1,
     perPage: 6,
     fields: [
          {
            key: 'id',
            sortable: true
          },
          {
            key: 'name',
            sortable: true
          },
          {
            key: 'active',
            sortable: true,
          },
          {
            key: 'order',
            sortable: true
          },
          {
            key: "action",
            label:"Action"
          }
     ]
    }
  },
  computed: {
    formatRule():any[]   {
      return this.items.map((item: IRule)=> {
        const activeFormatted = item.active === 1 ? "True" : "False" 
        const newObj = {
          ...item,
          active: activeFormatted
        }
        return newObj
      })
    }
  },
  methods: {
    emitEdit(id: number) {
      this.$emit('edit-rule', id) 
    },
    emitDelete(id: number) {
      this.$emit('delete-rule', id) 
    } 
  },
  
  props: ['items']
})
</script>

<style lang="scss" scoped>
  .cmp{
    

    
    .b-pagination{
      
      justify-content: center;
    }
  }
</style>
