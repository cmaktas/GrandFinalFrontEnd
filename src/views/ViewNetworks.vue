<template>
  <div class="viewNetworks">
    <br>
    <h3>Networks</h3>
    <br>
    <div v-if="items.length > 0" class="container">
      <b-table hover outlined :items="items" :fields="fields" thead-class="green-bg bg-dark text-white">
        
        <template #cell(url)="row">
          <b-link class="btn btn-primary" :to="$route.path + '/' + row.item.id">Details</b-link>
        </template>

        <template #cell(delete)="row">
          <b-button v-b-modal.modal-1 type="button" class="btn btn-danger" @click="deleteNetwork(row.index)">Delete</b-button>  
        </template>
      </b-table>  
      <b-modal 
            id="modal-1" 
            hide-header
            hide-backdrop
            footer-bg-variant= "dark"
            ok-variant= "light"
            border-0
            @ok="handleOk"
            ok-only>
              <p class="my-4">Network <strong>'{{capitalizeFirstLetter(items[activeIndex].ip)}}'</strong> deleted successfully.</p>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { connectionUrl } from '../globalVariables'
import axios from 'axios';

export default {
  name: 'ViewNetworks',
  
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  
  data() {
    return {
      connectionUrl,
      activeIndex: 0,
      fields: [
        {key: 'ip', label: 'Network', sortable: true},
        {key: 'divisionName', label: 'Division', sortable: true},
        {key: 'description', label: 'Description'},
        {key: 'details', label: ''},
        {key: 'delete', label: ''},
        {key: 'url', label: ''},
      ],
      items: [],
    }
  },

  created() {  
    this.fetchNetworks() 
  },

  methods: {
    async deleteNetwork(index){
        let token = localStorage.getItem("user");
        this.activeIndex = index
        let id = this.items[index].id
        id = parseInt(id);
        await axios.get(`${this.connectionUrl}secure/network/deleteNetwork?id=${id}`, {        
          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json',          
        }})
        this.fetchNetworks()
      },

    fetchNetworks(){
        let token = localStorage.getItem("user");
        axios.get(`${this.connectionUrl}secure/network/getAll`,{
          headers: {
            'Authorization' : `Bearer ${token}`,
        }})
        .then(response => {
          this.items = response.data.response.filter(item => item.divisionName.toUpperCase() != 'DEFAULT')
        })
      },

    handleOk(bvModalEvt) {
      this.$bvModal.hide("modal-1");  
    },

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  }
}
</script>

<style>
.table thead th {
    vertical-align: bottom;
    border-bottom: 0px solid #007fff !important;
}
</style>