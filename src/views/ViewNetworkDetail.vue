<template>
  <div class="networkDetail">
    <br>
    <div class="container">
      <h3>Network Detail</h3>
      <br>
      <div class="container">
        <b-table outlined :items="items" :fields="fields" :tbody-tr-class="rowClass" thead-class="green-bg bg-dark text-white">
          <template #cell(sync)="row">
          <b-button v-b-modal type="button" class="btn btn-dark" @click="sync(row.index)">Sync</b-button>
          </template>
          <template #cell(url)="row">
            <b-link class="btn btn-primary" :to="$route.path + '/port/' + row.item.id">Details</b-link>           
          </template>
        </b-table>  
      </div>
    </div>
  </div>
</template>

<script>
import { connectionUrl } from '../globalVariables'
import axios from 'axios';

export default {
  name: 'ViewNetworkDetail',

  data() {
    return {
      connectionUrl,
      fields: [
        {key: 'status', label: 'Status', sortable: true},
        {key: 'ip', label: 'IP', sortable: true},
        {key: 'hostName', label: 'Host Name', sortable: true},
        {key: 'sync', label: ''},
        {key: 'details', label: ''},
        {key: 'url', label: ''},
      ],
      items: [],
    }
  },

  created() {
    this.fetchNetworkDetails()
  },

  computed: {
    id() {
      return this.$route.params.id
    },
  },
  
    methods: {
      rowClass(item, type) {
        if (!item || type !== 'row') return
        if (item.status === 'Available') return 'table-success' 
        if (item.status === 'Unavailable') return 'table-danger'   
      },
      
      fetchNetworkDetails(){
        let token = localStorage.getItem("user");
        let id = parseInt(this.id);
        axios.get(`${this.connectionUrl}secure/ip/getNetIps`, {
          params:{
            'id': id
          },
          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        }})
        .then(response => {
          this.items = response.data.response;
        })
      },

      async sync(index){
        let token = localStorage.getItem("user");
        this.activeIndex = index
        let id = this.items[index].id
        id = parseInt(id);
        
        await axios.get(`${this.connectionUrl}secure/ip/syncIpInfo?id=${id}`, {        
          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json',          
        }})
        this.fetchNetworkDetails()
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