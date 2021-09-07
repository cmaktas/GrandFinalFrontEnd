<template>
  <div class="viewDivisions">
    <br>
    <div v-if="items.length > 0" class="container">
      <h3>Divisions</h3>
      <br>
      <b-table hover outlined :items="items" :fields="fields" thead-class="green-bg bg-dark text-white">
        <template #cell(delete)="row">
          <b-button v-b-modal.modal-1 type="button" class="btn btn-danger" @click="deleteDivision(row.index)">Delete</b-button>
          <b-modal 
            id="modal-1" 
            hide-header
            hide-backdrop
            footer-bg-variant= "dark"
            ok-variant= "light"
            border-0
            @ok="handleOk"
            ok-only>
                <p class="my-4">Division <strong>'{{capitalizeFirstLetter(items[activeIndex].name)}}'</strong> deleted successfully.</p>
            </b-modal>
          </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { connectionUrl } from '../globalVariables'
import axios from 'axios';

export default {
  name: 'ViewDivisions',

  data() {
    return {
      connectionUrl,
      activeIndex: 0,
      fields: [
        {key: 'name', label: 'Division Name', sortable: true},
        {key: 'description', label: 'Description'},
        {key: 'delete', label: ''},
        {key: 'url', label: ''},
        
      ],
      items: []
    }
  },

  created() {
    this.fetchDivisions()
  },
  methods: {
    fetchDivisions(){
        let token = localStorage.getItem("user");
        axios.get(`${this.connectionUrl}secure/division/getAll`,{
          headers: {
            'Authorization' : `Bearer ${token}`,
        }})
        .then(response => {
          this.items = response.data.response; 
          this.items = response.data.response.filter(item => item.name !=  'Administration')
        })
      },
    
   async deleteDivision(index){
        let token = localStorage.getItem("user");
        this.activeIndex = index
        let id = this.items[index].id
        id = parseInt(id);
        
        await axios.get(`${this.connectionUrl}secure/division/delete?id=${id}`, {        
          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json',          
        }})
        this.fetchDivisions()
      },

    handleOk(bvModalEvt) {
      this.$bvModal.hide("modal-1");
      this.created();   
    },

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },  
  },
}
</script>

<style>
.table thead th {
    vertical-align: bottom;
    border-bottom: 0px solid #007fff !important;
}
</style>