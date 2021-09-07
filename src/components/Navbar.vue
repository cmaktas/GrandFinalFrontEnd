<template>
  <div class="Navbar">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand to="/">IPAM</b-navbar-brand>
      <b-navbar-nav style="width: 100%">
        <b-nav-item-dropdown text="Networks" right>
          <b-dropdown-item to="/addnetwork">Add Network</b-dropdown-item>
          <b-dropdown-item to="/viewnetworks">View Networks</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Divisions" right>
          <b-dropdown-item to="/adddivision">Add Division</b-dropdown-item>
          <b-dropdown-item to="/viewdivisions">View Divisions</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Users" right>
          <b-dropdown-item to="/adduser">Add User</b-dropdown-item>
          <b-dropdown-item to="viewusers">View Users</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="/viewips">IPs</b-nav-item>    
      </b-navbar-nav> 
        <b-button to="/login" align='right' variant="outline-light" @click="logUserOut" class="logout-button" type="submit" >Logout</b-button> 
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: 'Navbar',

  methods: {
     logUserOut() {
      localStorage.removeItem("user");
      this.$router.push('Login');
    }
  }
}
</script>

<style lang="scss">
</style>