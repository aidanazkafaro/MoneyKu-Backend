const e = require("express");
const db = require("../config/config");


async function register (body){
    const {name, email, password} = body;
    const query = `INSERT INTO account (NAME, EMAIL, PASSWORD, balance) VALUES ('${name}', '${email}','${password}', '0')`;
    const result = await db.query(query);
    if (result.rowCount !== 0 ){
        return{
            message: 'User Created'
        }
    }
    else{
        return{
            message: 'Error'
        }
    }
}

async function login (body){
    const {email, password} = body;
    const query = `SELECT * FROM account WHERE email = '${email}'`;
    const result = await db.query (query);
    if (result.rows.length === 0 ){
        return{
            message: "User not found"
        }
    }
    else{
        const user = result.rows[0]
        if (user.password === password){
            return{
                message: "Login successful"
            }
        }
        else{
            return{
                message: "Login failed"
            }
        }
    }
}

module.exports = {
    register,
    login
}