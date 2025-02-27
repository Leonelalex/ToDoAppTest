<template>
    <v-main>
        <div class="homeheader">
            <v-btn color="black" text="Crear Tareas" @click="dialog = true"></v-btn>
            <h1>Mis Tareas</h1>
        </div>
        <v-container>
            <v-row>
                <v-col
                    v-for="task in tasks"
                    :key="task.id"
                >
                    <tasksCard
                        :id="task.id"
                        :title="task.title"
                        :subtitle="task.status"
                        :text="task.description"
                    ></tasksCard>
                </v-col>
            </v-row>
        </v-container>
    </v-main>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        min-width="600"
        prepend-icon="mdi-update"
        title="Nueva Tarea"
      >
        <v-card-text>
          <v-form>
            <v-text-field
              label="Titulo"
              name="title"
              v-model="title"
              required
            ></v-text-field>
            <v-text-field
              label="Descripcion"
              name="description"
              v-model="description"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>

        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="crear"
            @click="createTask"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>

<script>
import tasksCard from '../components/TaskCard.vue';
export default {
    name: 'HomeView',
    mounted() {
        this.useremail = localStorage.getItem('email');
        this.userid = localStorage.getItem('userid');
        this.username = localStorage.getItem('username');

        if (!this.userid) {
            this.$router.push({ name: 'login' });
        }else{
            this.getTasks();
        }       
    },
    data() {
        return {
            useremail: '',
            userid: '',
            username: '',
            tasks: [],
            dialog: false,
            title: '',
            description: ''
        }
    },
    methods: {
        getTasks(){
            fetch(`http://localhost:3000/todo/${this.userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Data:', data);
                let tasks = data.data;
                if (data.status === 200) {
                    console.log('Tasks:', tasks);
                    this.tasks = tasks;
                } else {
                    console.error('Tasks not found:', data.message);
                    this.message = 'Tareas no encontradas';
                    this.notasks = true;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                this.message = 'Tareas no encontradas';
                this.notasks = true;
            });
        },
        createTask(){
            fetch('http://localhost:3000/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: this.title,
                    description: this.description,
                    id_usuario: this.userid
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Data:', data);
                let task = data.data;
                if (data.status === 200) {
                    console.log('Task created:', task.id);
                    this.getTasks();
                    this.description = '';
                    this.title = '';
                    this.dialog = false;
                } else {
                    console.error('Task creation failed:', data.message);
                    this.message = 'Tarea no creada';
                    this.notasks = true;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                this.message = 'Tarea no creada';
                this.notasks = true;
            });
            this.dialog = false;
        }
    },
    components: {
        tasksCard
    }
}
</script>

<style scoped>
.homeheader{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
}

h1{
    margin-left: 3rem;
}

@media (max-width: 600px) {
    .homeheader {
        flex-direction: column;
        align-items: flex-start;
    }

    h1 {
        margin-left: 0;
        margin-top: 1rem;
        font-size: 2rem;
    }

    .v-card {
        min-width: 100%;
    }
}
</style>