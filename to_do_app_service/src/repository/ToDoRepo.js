const { dbConnect } = require("../db/PostgressDb");
const { QueryTypes } = require('sequelize');

class ToDoRepository{
    constructor(){
        this.db = dbConnect();
    }

    async getById(id){
        try{
            const todo = await this.db.sequelize.query(`SELECT * FROM todo.tasks WHERE id_usuario = ${id} AND status != 'Eliminada'`, { type: QueryTypes.SELECT });
            return todo;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    async create(title, description, id_usuario){
        try{
            const newTodo = await this.db.sequelize.query(
                `INSERT INTO todo.tasks
                (title, description, status, id_usuario)
                VALUES('${title}', '${description}', 'Abierta', ${id_usuario}) RETURNING *;`, 
                { type: QueryTypes.SELECT });
            return newTodo;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    async close(id){
        const updatedTodo = await this.db.sequelize.query(`UPDATE todo.tasks SET status = 'Cerrada' WHERE id = ${id} RETURNING *`, { type: QueryTypes.SELECT });
        return updatedTodo;
    }

    async delete(id){
        try{
            const deletedTodo = await this.db.sequelize.query(`UPDATE todo.tasks SET status = 'Eliminada' WHERE id = ${id} RETURNING *`, { type: QueryTypes.SELECT });
            return deletedTodo;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
}

module.exports = new ToDoRepository();