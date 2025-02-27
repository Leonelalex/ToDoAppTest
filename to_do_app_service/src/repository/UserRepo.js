const { dbConnect } = require("../db/PostgressDb");
const { QueryTypes } = require('sequelize');

class userRepository{
    constructor(){
        this.db = dbConnect();
    }

    async getAll(){
        const users = await this.db.sequelize.query("SELECT * FROM users", { type: QueryTypes.SELECT });
        return users;
    }

    async getById(id){
        const user = await this.db.sequelize.query(`SELECT * FROM users WHERE id = ${id}`, { type: QueryTypes.SELECT });
        return user;
    }

    async create(user){
        const newUser = await this.db.sequelize.query(`INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}') RETURNING *`, { type: QueryTypes.SELECT });
        return newUser;
    }

    async update(id, user){
        const updatedUser = await this.db.sequelize.query(`UPDATE users SET name = '${user.name}', email = '${user.email}', password = '${user.password}' WHERE id = ${id} RETURNING *`, { type: QueryTypes.SELECT });
        return updatedUser;
    }

    async delete(id){
        const deletedUser = await this.db.sequelize.query(`DELETE FROM users WHERE id = ${id} RETURNING *`, { type: QueryTypes.SELECT });
        return deletedUser;
    }

    async login(email, password){
        try{
            let user = await this.db.sequelize.query(`SELECT * FROM todo.users WHERE email = '${email}' AND pass = '${password}'`, { type: QueryTypes.SELECT }); 
            return user;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
}

module.exports = new userRepository();