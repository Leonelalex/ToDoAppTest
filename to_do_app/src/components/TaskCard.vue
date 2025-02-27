<template>
    <v-card
        :subtitle="localsubtitle"
        :text="text"
        :title="title"
        :color="color"
    >
        <template v-slot:actions>
            <v-btn color="black" text="Cerrar" v-if="localsubtitle != 'Cerrada'" @click="closeTask"></v-btn>
            <v-btn color="red" text="Eliminar" @click="deleteTask"></v-btn>
        </template>
    </v-card>
  </template>

<script>
export default {
    name: 'TaskCard',
    props: {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
    mounted() {
        if (this.subtitle === 'Cerrada') {
            this.color = '#82e0aa';
        } else {
            this.color = '#85c1e9';
        }   
    },
    data() {
        return {
            color: 'primary',
            localsubtitle: this.subtitle
        }
    },
    methods: {
        closeTask() {
            console.log('Closing task:', this.id);
            fetch(`http://localhost:3000/todo/close/${this.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.id
                })
            })
            .then(response => response.json())
            .then(data => {
                    if(data.status === 200){
                        this.localsubtitle = 'Cerrada';
                    }
            })
            .catch(error => {
                console.error('Error:', error);
                this.message = 'Usuario no encontrado';
                this.nouser = true;
            });
        },
        deleteTask() {
            fetch(`http://localhost:3000/todo/${this.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.id
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.status === 200){
                    console.log('Task deleted:', this.id);
                    this.$router.push('/home');
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
.v-card-subtitle{
    color: black !important;
    font-weight: bold;
    font-size: .9rem;
}

.v-card{
    min-width: 12rem;
}
</style>