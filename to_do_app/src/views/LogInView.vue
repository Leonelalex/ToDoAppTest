<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title class="headline">Leonel To Do App LogIn</v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form>
                                <v-text-field
                                    label="Email"
                                    name="email"
                                    type="email"
                                    v-model="email"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    label="Password"
                                    name="password"
                                    type="password"
                                    v-model="password"
                                    required
                                ></v-text-field>
                            </v-form>
                            <h4 v-if="nouser">{{ message }}</h4>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'LogInView',
    data() {
        return {
            email: '',
            password: '',
            nouser: false,
            message: ''
        }
    },
    methods: {
        login() {
            console.log('Email:', this.email);
            console.log('Password: ', this.password);

            fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Data:', data);
                let user = data.data;
                if (data.status === 200) {
                    console.log('Login successful:', user.id);
                    localStorage.setItem('userid', user.id);
                    localStorage.setItem('useremail', user.email);
                    localStorage.setItem('username', user.name);
                    this.$router.push('/home');
                } else {
                    console.error('Login failed:', data.message);
                    this.message = 'Usuario no encontrado';
                    this.nouser = true;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                this.message = 'Usuario no encontrado';
                this.nouser = true;
            });
        }
    }
}   
</script>

<style>
h4 {
    color: red;
}
</style>