<template>
    <div class="addNetwork">
        <br>
        <h3>Add New Network</h3>
        <br>
        <div class="col" align="center">
            <div class="row justify-content-center">
                <div class="col-4">
                    <b-form-input 
                    id="ip"
                    v-model="form.address" 
                    placeholder="IP">
                    </b-form-input>
                </div>
                <div class="col-2">
                    <b-form-input 
                    id="mask"
                    v-model="form.mask" 
                    placeholder="/MASK">
                    </b-form-input>
                </div>
            </div>
            <div class="row"><br></div>
            <div class="row justify-content-center">
                <div class="col-6">
                    <b-form-select 
                    v-model="form.divId" 
                    :options="divisions" 
                    placeholder="Select a division" 
                    value-field="id"
                    text-field="name">
                    <template #first>
                        <b-form-select-option value="" disabled> Please select a division </b-form-select-option>
                    </template>       
                    </b-form-select>
                </div>              
            </div>
            <div class="row"><br></div>
            <div class="row justify-content-center">
                <div class="col-6">
                    <b-form-textarea 
                    id="textarea" 
                    v-model="form.description" 
                    placeholder="Description" 
                    rows="3" 
                    max-rows="6">
                    </b-form-textarea>
                </div>               
            </div>
            <div class="row"><br></div>
            <div>
            <b-button v-b-modal.modal-1 variant="dark" type="button" @click="onSubmit" :disabled="this.isbuttonDisabled" >Add</b-button>
                <b-modal 
                id="modal-1" 
                hide-header
                hide-backdrop
                footer-bg-variant= "dark"
                ok-variant= "light"
                border-0
                @ok="handleOk"
                ok-only>
                    <p class="my-4">Network <strong>'{{this.form.cidr}}'</strong> added successfully.</p>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
import { connectionUrl } from '../globalVariables'
import axios from 'axios';

export default {
    name: 'AddNetwork',
    
    data() {
      return {
        connectionUrl,
        isbuttonDisabled: true,
        name: '',
        form: {
                description: '',
                address: '',
                mask: '',  
                divId: '',  
                cidr: '',   
            },
        submitForm: {
            name: '',
            description: '',
            divId: '',
            cidr: '',
        },
        divisions: [],
          
      }
    },
    created() {  
        this.fetchDivisions();  
    },

    methods: {      
        onSubmit(event){         
            this.formCidr(); 
            this.form.name = this.form.cidr
            this.submitForm.name = this.form.name
            this.submitForm.description = this.form.description
            this.submitForm.divId = this.form.divId
            this.submitForm.cidr = this.form.cidr             
            let token = localStorage.getItem("user");
            axios.post(`${this.connectionUrl}secure/network/createNetwork`, this.submitForm, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`,
            }})          
        },

        fetchDivisions(){
        let token = localStorage.getItem("user");
        axios.get(`${this.connectionUrl}secure/division/getAll`,{
          headers: {
            'Authorization' : `Bearer ${token}`,
        }})
        .then(response => {
          response.data.response.forEach(division => {
                this.divisions.push(new Object({
                    id: division.id,
                    name: division.name
                }));
            }); 
        })
      },

        formCidr() {         
            const dash = '/'
            if(this.form.mask.includes(dash) || this.form.address.includes(dash)){
                this.form.cidr = this.form.address + this.form.mask;
                return this.cidr;
            }else {
                this.form.cidr = this.form.address + '/' + this.form.mask;
                return this.form.cidr;
            }          
        },

        handleOk(bvModalEvt) {
            this.form.networkDesc = '';
            this.form.ip = '';
            this.form.mask = '';
            this.form.selected = '';
            this.$router.push({ name: 'ViewNetworks' })
        },

    },
    watch: {
        form: {
            handler(newValue) {
                this.isbuttonDisabled = false
                this.form.name = this.form.cidr
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