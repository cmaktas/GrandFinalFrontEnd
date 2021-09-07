<template>
<div class="ViewIps">
  <div class="container">
      <br>
    <div>
      <div class="row">
        <div class="col">
          <ul role="menubar" class="pagination b-pagination">           
          <li class="page-item">
              <button type="button" 
                      tabindex="-1" 
                      class="page-link"
                      @click="gotoPage(currentPage - 1)">‹</button>
          </li>
          <li class="page-item">
              <button type="button" 
                      class="page-link active" 
                      tabindex="-1" >{{ currentPage }}</button>
          </li>
          <li class="page-item">
              <button type="button" 
                      :aria-checked="currentPage == 3" 
                      tabindex="-1" 
                      class="page-link" @click="gotoPage(currentPage + 1)">›</button>
          </li>
      </ul>
        </div>
        <div class="col">
          <h3>All IPs</h3>
        </div>
        <div class="col">
        </div>
      </div>  
        <b-table outlined :items="items" :fields="fields" :tbody-tr-class="rowClass" thead-class="bg-dark text-white">   
        <template #cell(url)="row">
          <b-button v-b-modal type="button" class="btn btn-dark" @click="sync(row.index)">Sync</b-button>
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
    name: 'ViewIps',
    
    data() {
      return {
        activeIndex: 0,
        connectionUrl,
        perPage: 100,
        currentPage: 1,
        maxPage: 0,
        
        fields: [
        {key: 'status', label: 'Status', sortable: true},
        {key: 'ip', label: 'Ip Address', sortable: true},
        {key: 'hostName', label: 'Host', sortable: true},
        {key: 'sync', label: ''},
        {key: 'url', label: ''},
        ],
        items: [],
      }
    },

    created() {      
        this.fetchList()
    },

    computed: {
      rows() {
        return this.items.length
      },
    },

    methods: {
        fetchList(){
        let token = localStorage.getItem("user");
        axios.get(`${connectionUrl}secure/ip/getAllIps?page=${this.currentPage}`,{
          headers: {
            'Authorization' : `Bearer ${token}`,
        }})
        .then(response => {
          this.items = response.data.response; 
          this.maxPage = parseInt(response.message)  
        })
      },

        gotoPage(pageNum) {
            if(pageNum > 0 && pageNum <= this.maxPage) {
                this.currentPage = pageNum
                this.fetchList()
            }
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
        this.fetchList();
      },

        rowClass(item, type) {
        if (!item || type !== 'row') return
        if (item.status === 'Available') return 'table-success' 
        if (item.status === 'Unavailable') return 'table-danger'    
      },
    }
  }
</script>

<style scoped>
.page-link:focus{
    box-shadow: none;
}
.page-link.active{
    color: #fff;
    background-color: #161c2d;
    border-color: #161c2d;
}
.syncButton{
  float: right;
}

.table thead th {
    vertical-align: bottom;
    border-bottom: 0px solid #007fff !important;
}
</style>