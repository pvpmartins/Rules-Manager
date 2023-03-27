<template>
  <div class="index-page">
    <div class="index-page__results">
      <b-button class="new-rule__btn" @click="showNewModal = !showNewModal" squared variant="outline-primary">New Rule</b-button>
      <NewRuleModal v-if="showNewModal" @close-modal="showNewModal = false" @new-rule="e=>createNewRule(e)" />
      <b-input-group class="mt-3 search-input" prepend="Rule ID">
        <b-form-input type="number" v-model="ruleId"></b-form-input>
        <b-input-group-append>
          <b-button @click="getRuleById()" variant="outline-success">Search</b-button>
        </b-input-group-append>
      </b-input-group>
      <div class="rules-table"> 
        <TheTable :items='rules' @delete-rule="e=>deleteRule(e)" @edit-rule="(e)=>itemUpdated = e"/>
        <NewRuleModal @new-rule="e=>updateRule(e)" v-if="itemUpdated">
          Edit Rule:
        </NewRuleModal>
        <b-alert ref="alert" :class="!!itemDeleted ? 'alert-deleted' : ''" v-if="!!itemDeleted" show variant="success">Rule ID: {{itemDeleted}} deleted!</b-alert>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue'
import TheTable from '../components/TheTable.vue'
import NewRuleModal from '../components/NewRuleModal.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    TheTable,
    NewRuleModal
  },
  data() {
    return {
      rules: [] as Object[],
      ruleId: null,
      auth: {'Authorization': 'Bearer ' + this.$store.state.auth.accessToken},
      showNewModal: false,
      itemUpdated: 0,
      itemDeleted: 0,
    }
  },
  mounted() {
   this.getRules() 
  },
  methods: {
   async getRules() {
    try {
     const response = await this.$axios.get('admin/house_rules', {headers: this.auth})
     this.rules = response.data.data.entities
     } catch (error) {
       console.error(error)
     } 
   }, 
   async getRuleById() {
      if (!this.ruleId){
       await this.getRules()
       this.ruleId = null 
       return
      } 
      try {
      const res = await this.$axios.get(`admin/house_rules/${this.ruleId}`, {headers: this.auth})    
      this.rules = [res?.data?.data] 
      this.ruleId = null
      } catch (error) {
        console.error(error)
        this.rules = []
      }
   },
   async createNewRule(e: any) {
      try {
        const res = await this.$axios.post('admin/house_rules', {house_rules: e}, {headers: this.auth}  )    
        console.log(res)
        this.getRules()
      } catch (error) {
        console.error(error)    
      }
   },
   async deleteRule(id: number) {
    try {
      const res = await this.$axios.delete(`admin/house_rules/${id}`, {headers: this.auth})
      this.itemDeleted = id
      this.getRules()
      setTimeout(()=> {
        this.itemDeleted = 0
      }, 3000)
    } catch (error) {
    console.error(error) 
    }
   },
   async updateRule(rule:Object) {
    try {
       const res = await this.$axios.put(`admin/house_rules/${this.itemUpdated}`,{house_rules: rule}, {headers: this.auth})
       console.log(res)
       this.getRules()
       this.itemUpdated = 0
    } catch (error) {
      console.error(error)
    }
   }
  },
})
</script>

<style lang="scss" scoped>
 .index-page{
  display: flex;
  flex-direction: column;
  align-items: center;
  &__results{
    width: 70%;
    position: relative;
  > button{
    position: absolute;
    right: 2px;
    top: 1rem;
  } 
  .rules-table{
    .alert-deleted{
      position: absolute;
      top: 5rem;
      left: -20%;
       
      animation: alert-fade-in 3s ease-in-out forwards;
    } 
  }
    .search-input {
      width: 15rem;
      padding-bottom: 2rem;
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type=number] {
        -moz-appearance: textfield;
}    }
  }
  @keyframes alert-fade-in{
    0% {
      transform: translateX(-100%);
    }
    50%{
      
      transform: translateX(100%);
    }
    100%{
      transform: translateX(-100%);
    }
  }
 }

</style>
