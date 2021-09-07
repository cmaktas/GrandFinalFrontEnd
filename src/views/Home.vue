<template>
<div class="HomePage">
    <br>
    <br>
    <div>
  <div class="container" align="center">
    <div>
    <b-card-group deck>
      <b-card bg-variant="primary" text-variant="white"  title="Available IPs" class="text-center">
        <b-card-text><strong>{{numOfAvIps}}</strong></b-card-text>
      </b-card>
      <b-card bg-variant="danger" text-variant="white" title="Unavailable IPs" class="text-center">
        <b-card-text><strong>{{numOfUnAvIps}}</strong></b-card-text>
      </b-card>
    </b-card-group>
    </div>
    <div class="row"><br></div>
    <div class="row"><br></div>
  </div>
  <div class="container">
    <div>
    <b-card-group deck>
      <b-card bg-variant="info" text-variant="white" title="Number of Networks" class="text-center">
        <b-card-text><strong>{{numOfNetworks}}</strong></b-card-text>
      </b-card>
      <b-card bg-variant="warning" text-variant="white" title="Number of Divisions" class="text-center">
        <b-card-text><strong>{{numOfDivisions}}</strong></b-card-text>
      </b-card>
    </b-card-group>
    </div>
  </div>
</div>
</div>
</template>

<script>
import { connectionUrl } from '../globalVariables'
import axios from 'axios';

export default {
  name: 'Home',

    data() {
      return {
        connectionUrl,
        numOfAvIps: '',
        numOfUnAvIps: '',
        numOfNetworks: '',
        numOfDivisions: '',
      }
    },

    created() {  
    this.fetchNumOfAvIps();
    this.fetchNumOfUnAvIps();
    this.fetchNumOfNetworks();
    this.fetchNumOfDivisions();
    },

    methods: {
      fetchNumOfAvIps(){
        let token = localStorage.getItem("user");
        axios.get(`${this.connectionUrl}secure/ip/getNumberOfAvIps`,{
          headers: {
            'Authorization' : `Bearer ${token}`,
        }})
        .then(response => {
          this.numOfAvIps = response.data.response; 
        })
      },

      fetchNumOfUnAvIps(){
        let token = localStorage.getItem("user");
        axios.get(`${this.connectionUrl}secure/ip/getNumberOfUnIps`,{
          headers: {
            'Authorization' : `Bearer ${token}`,
        }})
        .then(response => {
          this.numOfUnAvIps = response.data.response; 
        })
      },

      fetchNumOfNetworks(){
        let token = localStorage.getItem("user");
        axios.get(`${this.connectionUrl}secure/network/getNumberOfNetworks`,{
          headers: {
            'Authorization' : `Bearer ${token}`,
        }})
        .then(response => {
          this.numOfNetworks = response.data.response; 
        })
      },

      fetchNumOfDivisions(){
        let token = localStorage.getItem("user");
        axios.get(`${this.connectionUrl}secure/division/getNumberOfDivisions`,{
          headers: {
            'Authorization' : `Bearer ${token}`,
        }})
        .then(response => {
          this.numOfDivisions = response.data.response; 
        })
      },
    }
}
</script>

<style>

</style>