<template>
  <div class="ipDetail">
    <br>
    <div class="container" align="center">
      <br>
      <div v-if="ipShown.status == 'Available' " class="container">       
        <b-jumbotron bg-variant="success" text-variant="white">
          <template #header>{{ ipShown.ip }}</template>
          <template  #lead>is available</template>
          <h3>Host Name:</h3>
          <div v-if="ipShown.hostName === null || '' ">
            <h4>Undefined</h4>
          </div>
          <div v-else-if="ipShown.hostName !== null">
            <h4>{{ ipShown.hostName }}</h4>
          </div>
        </b-jumbotron>     
      </div>
      <div v-else-if="ipShown.status == 'Unavailable' " class="container">       
        <b-jumbotron bg-variant="danger" text-variant="white">
          <template #header>{{ ipShown.ip }}</template>
          <template  #lead>is unavailable</template>
          <h3>Host Name:</h3>
          <div v-if="ipShown.hostName !== null">
            <h4>{{ ipShown.hostName }}</h4>
          </div>
          <div v-else>
            <h4>Undefined</h4>
          </div>
        </b-jumbotron>   
        <div v-if="openports.length > 0" class="container">       
        <b-jumbotron bg-variant="secondary" text-variant="white">
          <h4>Unavailable Ports</h4>
          <p> <strong>{{openports.join(' | ')}}</strong> </p>
        </b-jumbotron>     
        </div>
        <div v-if="closedports.length > 0" class="container">       
        <b-jumbotron bg-variant="info" text-variant="white">          
          <h4>Available Ports</h4>
          <p> <strong>{{closedports.join(' | ')}}</strong></p>
        </b-jumbotron>     
        </div>                  
      </div>
    </div>
  </div>
</template>

<script>
import { connectionUrl } from '../globalVariables'
import axios from 'axios';

export default {
  name: 'ViewIpDetail',

    computed: {
    id() {
      return this.$route.params.portId
    },
  },

  data() {
    return {
      connectionUrl,
      openportfields: [
        {key: 'port', label: 'Available Ports'},
      ],
      openports: [],
      closedports: [],
      ipShown: {status: '' ,ip: '', hostName: ''},
    }
  },

  created() {  
    this.fetchSelectedIp()
  },

  methods: {
    
    async fetchSelectedIp(){
        let token = localStorage.getItem("user");
        let id = parseInt(this.id);
      await axios.get(`${this.connectionUrl}secure/ip/getIpDetails`, {
          params:{
            'id': id
          },
          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        }})
        .then(response => {
          this.ipShown.status = response.data.response.info.status;
          this.ipShown.ip = response.data.response.info.ip;
          this.ipShown.hostName = response.data.response.info.hostName;
          this.openports = response.data.response.open;
          this.closedports = response.data.response.close;      
        })
      },
  }
}
</script>

<style>
</style>