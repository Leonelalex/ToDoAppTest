const todoRepo = require('../repository/ToDoRepo.js');

class ToDoService {
    async getById(id){
        try{
            let todo = await todoRepo.getById(id);
            return todo;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    async create(title, description, id_usuario){
        try{
            let newTodo = await todoRepo.create(title, description, id_usuario);
            return newTodo;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    async close(id, todo){
        try{
            let updatedTodo = await todoRepo.close(id);
            return updatedTodo;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    async delete(id){
        try{
            let deletedTodo = await todoRepo.delete(id);
            return deletedTodo;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
}

module.exports = new ToDoService();