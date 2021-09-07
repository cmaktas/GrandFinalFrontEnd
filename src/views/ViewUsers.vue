<template>
    <div class="viewUsers">
        <br>
        <h3>Users</h3>
        <br>
        <div v-if="items.length > 0" class="container">
      <b-table hover outlined :items="items" :fields="fields" thead-class="green-bg bg-dark text-white">
        <template #cell(url)="row">
          <b-button  v-b-modal.modal-1 type="button" class="btn btn-danger" @click="deleteUser(row.index)">Delete</b-button>
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
                <p class="my-4">User <strong>'{{capitalizeFirstLetter(items[activeIndex].username)}}'</strong> deleted successfully.</p>
      </b-modal>
    </div>   
    </div>
</template>

<script>
import { connectionUrl } from '../globalVariables'
import VueJwtDecode from "vue-jwt-decode";
import axios from 'axios';

export default {
  name: 'ViewUsers',
    
  data() {
    return {
      user: {},
      connectionUrl,
      activeIndex: 0,
      fields: [
      {key: 'username', label: 'User'},
      {key: 'delete', label: ''},
      {key: 'url', label: ''},
      ],
      items: [],
    }
  },

  created() { 
    this.getUserDetails()
    this.fetchUserList()
  },
  

  methods: {
    deleteUser(index){
        let token = localStorage.getItem("user");
        this.activeIndex = index
        let id = this.items[index].id
        id = parseInt(id);
        axios.get(`${this.connectionUrl}secure/user/delete?id=${id}`, {        
          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json',          
        }})
        this.fetchUserList()
      },
    

    fetchUserList(){
        let token = localStorage.getItem("user");
        axios.get(`${this.connectionUrl}secure/user/getAll`,{
          headers: {
            'Authorization' : `Bearer ${token}`,
        }})
        .then(response => {
          this.items = response.data.response.filter(item => item.username.toUpperCase() !=  this.user.sub.toUpperCase() && item.username.toUpperCase() != 'SYSTEM')
        })
      },


    handleOk(bvModalEvt) {
        this.$bvModal.hide("modal-1");
    },

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    getUserDetails() {     
      let token = localStorage.getItem("user");
      try {
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;   
      } catch (error) {
        console.log(error)
      }
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