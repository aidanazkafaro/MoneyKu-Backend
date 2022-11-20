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

async function createWallet (body){
    const {balance, idUser} = body;
    const query = `INSERT INTO wallet (balance, idUser) VALUES ('${balance}', '${idUser}')`;
    const result = await db.query(query);
    if (result.rowCount !== 0 ){
        return{
            message: 'Wallet Created'
        }
    }
    else{
        return{
            message: 'Error'
        }
    }
}

async function createIncomeCategory (body){
    const {category} = body;
    const query = `INSERT INTO incomeCategory (category) VALUES ('${category}')`;
    const result = await db.query(query);
    if (result.rowCount !== 0 ){
        return{
            message: 'Income Category Created'
        }
    }
    else{
        return{
            message: 'Error'
        }
    }
}

async function createExpenseCategory (body){
    const {category} = body;
    const query = `INSERT INTO expenseCategory (category) VALUES ('${category}')`;
    const result = await db.query(query);
    if (result.rowCount !== 0 ){
        return{
            message: 'Expense Category Created'
        }
    }
    else{
        return{
            message: 'Error'
        }
    }
}

async function createIncome (body){
    const {amount, transactionDate, idUser, idWallet} = body;
    const query = `INSERT INTO income (amount, transactionDate, idUser) VALUES ('${amount}','${transactionDate}', '${idUser}'); 
                   UPDATE wallet set balance = balance + '${amount}' where idUser = ${idUser};
                   UPDATE account set balance = balance + '${amount}' where id = ${idUser}`;
    const result = await db.query(query);
    if (result[0].rowCount !== 0 && result[1].rowCount !==0 && result[2].rowCount !==0){
        return{
           result
        }
    }
    else{
        return{
            message: 'Error'
        }
    }
}

async function createExpense (body){
    const {amount, transactionDate, idUser, idWallet} = body;
    const query = `INSERT INTO expense (amount, transactionDate, idUser) VALUES ('${amount}','${transactionDate}', '${idUser}'); 
                   UPDATE wallet set balance = balance - '${amount}' where idUser = ${idUser};
                   UPDATE account set balance = balance - '${amount}' where id = ${idUser}`;
    const result = await db.query(query);
    if (result[0].rowCount !== 0 && result[1].rowCount !==0 && result[2].rowCount !==0){
        return{
           result
        }
    }
    else{
        return{
            message: 'Error'
        }
    }
}

async function getIncome (body){
    const {idUser, dateBefore, dateAfter} = body;
    const query = `SELECT * FROM income where transactionDate between '${dateBefore}' AND '${dateAfter}' AND idUser = '${idUser}' `;
    const result = await db.query(query);
    if (result.rowCount !== 0 ){
        return{
           result
        }
    }
    else{
        return{
            message: 'Error'
        }
    }
}

async function getExpense (body){
    const {idUser, dateBefore, dateAfter} = body;
    const query = `SELECT * FROM expense where transactionDate between '${dateBefore}' AND '${dateAfter}' AND idUser = '${idUser}' `;
    const result = await db.query(query);
    if (result.rowCount !== 0 ){
        return{
           result
        }
    }
    else{
        return{
            message: 'Error'
        }
    }
}


module.exports = {
    register,
    login,
    createWallet,
    createIncomeCategory,
    createExpenseCategory,
    createIncome,
    createExpense,
    getIncome,
    getExpense
}