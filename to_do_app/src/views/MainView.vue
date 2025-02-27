<template>
    <v-app-bar :elevation="2">

            <div class="title">
                <h2>Bienvenido {{ username }}</h2>
            </div>

            <div class="about">
                <router-link to="/home" class="menuItem">Home</router-link>
                <router-link to="/home/about" class="menuItem">About</router-link>
            </div>

    </v-app-bar>
    <RouterView />
</template>

<script>
export default {
    name: 'MainView',
    mounted() {
        this.useremail = localStorage.getItem('email');
        this.userid = localStorage.getItem('userid');
        this.username = localStorage.getItem('username');

        if (!this.userid) {
            this.$router.push({ name: 'login' });
        }
    },
    data() {
        return {
            useremail: '',
            userid: '',
            username: ''
        }
    },
}
</script>

<style>
    #app {
        width: 100%;
    }

    .v-toolbar__content{
    padding: .5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: space-between;
    }

    .menuItem {
        margin: 0 1rem;
    }

    @media (max-width: 600px) {
        h2{
            font-size: 1.1rem;
        }
    }
</style>