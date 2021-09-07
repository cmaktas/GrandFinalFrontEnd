<template>
    <div class="login">
        <br>
        <h3>Please Login</h3>
        <br>
        <b-form @submit="onSubmit">
        <div class="container">           
                <div class="row justify-content-center">                   
                <div class="col-6">
                    <b-form-input 
                    id="text"                  
                    v-model="form.username" 
                    placeholder="Username"
                    required
                    trim
                    >
                    </b-form-input>
                </div>              
            </div>
            <div class="row"><br></div>
            <div class="row justify-content-center">
                <div class="col-6">                  
                    <b-form-input 
                    id="password"
                    type="password"
                    v-model="form.password" 
                    placeholder="Password"
                    required
                    trim>
                    </b-form-input>              
                </div>               
            </div>
            <div class="row"><br></div>
            <b-button type="button" @click="onSubmit" :disabled= this.isbuttonDisabled  variant="dark">Login</b-button>                    
        </div>
        </b-form>
    </div>
</template>

<script>
import { connectionUrl } from '../globalVariables'
import axios from 'axios';

export default {
  name: 'Login',
  
    data() {
      return {
        connectionUrl,
        isbuttonDisabled: true,
        form: {
                username: '',
                password: '',
            }
      }
    },

    methods: {
        async onSubmit(event){             
            try {
                await axios.post(`${this.connectionUrl}login/signin`, this.form, {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    let token = response.data.response;
                    this.$root.token = token
                    localStorage.setItem("user", token);
                    this.$router.push({ name: 'Home' }) 
                })               
                
            } catch (error) {
                console.log(error.response);
            }  
             
        },
    },

    watch: {
        form: {
            handler(newValue) {
                this.isbuttonDisabled = false
                Object.keys(newValue).forEach(key => {
                    if(newValue[key].trim() == '')
                        this.isbuttonDisabled = true
                })
            },
            deep: true
        }
    }
}
</script>

<style>

</style>