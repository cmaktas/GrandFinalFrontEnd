<template>
    <div class="addDivision">
        <br>
        <h3>Add New Division</h3>   
        <br>
        <b-form>
        <div class="container">           
            <div class="row justify-content-center">
                <div class="col-6">
                    <b-form-input 
                    id="text"
                    v-model="form.name"
                    required
                    trim
                    placeholder="Division Name">
                    </b-form-input>
                </div>              
            </div>
            <div class="row"><br></div>
            <div class="row justify-content-center">
                <div class="col-6">
                    <b-form-textarea 
                    id="textarea" 
                    v-model="form.description" 
                    required
                    trim
                    placeholder="Division Description"
                    rows="3" max-rows="6">
                    </b-form-textarea>
                </div>               
            </div>
            <div class="row"><br></div>
            <b-button v-b-modal.modal-1 @click="onSubmit" :disabled="this.isbuttonDisabled" type="button" variant="dark">Add</b-button>
            <b-modal 
            id="modal-1" 
            hide-header
            hide-backdrop
            footer-bg-variant= "dark"
            ok-variant= "light"
            border-0
            @ok="handleOk"
            ok-only>
                <p class="my-4">Division <strong>'{{capitalizeFirstLetter(form.name)}}'</strong> added successfully.</p>
            </b-modal>
            </div>    
        </b-form>
    </div>
</template>

<script>
import { connectionUrl } from '../globalVariables'
import axios from 'axios';

export default {
    name: 'AddDivision',

    data() {
        return {
            token: localStorage.getItem("user"),
            connectionUrl,
            isbuttonDisabled: true,
            form: {
                name: '',
                description: '',
            }
        }
    },

    methods: {
        onSubmit(){
            let token = localStorage.getItem("user");
            console.log(this.form)
            axios.post(`${this.connectionUrl}secure/division/create`, this.form, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`,
            }})
        },
   
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },

        handleOk(bvModalEvt) {
            this.form.divName = '';
            this.form.divDesc = '';
            this.$router.push({ name: 'ViewDivisions' })
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