<template>
    <div class="addDivision">
        <br>
        <h3>Add New User</h3>
        <br>
        <b-form @submit="onSubmit">
        <div class="container">           
            <div class="row justify-content-center">
                <div class="col-6">
                    <b-form-input 
                    id="text"
                    v-model="form.username"
                    required
                    trim
                    placeholder="Username">
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
                    required
                    trim
                    placeholder="Password">
                    </b-form-input>
                </div>
            </div>    
            <div class="row"><br></div>
            <b-button v-b-modal.modal-1 type="button" @click="onSubmit" :disabled="this.isbuttonDisabled"  variant="dark">Add</b-button>
            <b-modal 
            id="modal-1" 
            hide-header
            hide-backdrop
            footer-bg-variant= "dark"
            ok-variant= "light"
            border-0
            @ok="handleOk"
            ok-only>
                <p class="my-4">User <strong>'{{capitalizeFirstLetter(form.username)}}'</strong> added successfully.</p>
            </b-modal>
            
            </div>    
        </b-form>
    </div>
</template>

<script>
import { connectionUrl } from '../globalVariables'
import axios from 'axios';

export default {
  name: 'AddUser',

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
        onSubmit(event){
            let token = localStorage.getItem("user");
            axios.post(`${this.connectionUrl}secure/user/createUser`, this.form, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`,
            }})
        },
   
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },

      handleOk(bvModalEvt) {
        this.form.username = '';
        this.form.password = '';
        this.$router.push({ name: 'ViewUsers' })
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


