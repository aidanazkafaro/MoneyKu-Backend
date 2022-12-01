const e = require("express");
const db = require("../config/config");
const jwt = require("jsonwebtoken");
const security = require ("../utils/security")
const bcrypt = require ("bcryptjs")

async function register(body) {
  const { name, email, password } = body;
  if (!name || !email || !password) {
    return {
      message: "Empty value",
    };
  } 
  const hashPassword = await security.hashPassword(password);
  const query = `INSERT INTO account (NAME, EMAIL, PASSWORD, balance) VALUES ('${name}', '${email}','${hashPassword}', '0')`;
  const result = await db.query(query);
  if (result.rowCount !== 0) {
    return {
      message: "User Created",
    };
  } else {
    return {
      message: "Error",
    };
  }
}

async function login(body) {
  const { email, password } = body;
  const query = `SELECT * FROM account WHERE email = '${email}'`;
  const result = await db.query(query);
  if (result.rows.length === 0) {
    return {
      message: "User not found",
    };
  } else {
    const user = result.rows[0];
    if (await security.comparePassword(password, user.password)) {
      const token = jwt.sign({ idUser: user.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      return {
        message: "Login successful",
        idUser: user.id,
        token: token,
      };
    } else {
      return {
        message: "Login failed",
      };
    }
  }
}

async function createWallet(body) {
  const { balance, name, idUser } = body;
  const query = `INSERT INTO wallet (balance, name, idUser) VALUES ('${balance}', '${name}','${idUser}'); 
                 UPDATE account set balance = balance + '${balance}' where id = ${idUser};`;
  const result = await db.query(query);
  if (result[0].rowCount !== 0 && result[1].rowCount !== 0) {
    return {
      message: "Wallet Created",
    };
  } else {
    return {
      message: "Error",
    };
  }
}

async function createIncomeCategory(body) {
  const { category } = body;
  const query = `INSERT INTO incomeCategory (category) VALUES ('${category}')`;
  const result = await db.query(query);
  if (result.rowCount !== 0) {
    return {
      message: "Income Category Created",
    };
  } else {
    return {
      message: "Error",
    };
  }
}

async function getAccountDetail(body){
  const idUser  = body;
  const query = `SELECT account.name, account.balance from account where account.id =${idUser};
                 SELECT wallet.id as idWallet, wallet.name as nameWallet, wallet.balance as balanceWallet
                 from account inner join wallet on wallet.idUser = account.id where wallet.idUser =${idUser};`;
  const result = await db.query(query);
  if (result[0].rowCount !== 0 && result[1].rowCount !== 0) {
    return {
      name: result[0].rows[0].name,
      balance: result[0].rows[0].balance,
      wallet: result[1].rows,
    };
  } else {
    return {
      message: "Error",
    };
  }
}

async function createExpenseCategory(body) {
  const { category } = body;
  const query = `INSERT INTO expenseCategory (category) VALUES ('${category}')`;
  const result = await db.query(query);
  if (result.rowCount !== 0) {
    return {
      message: "Expense Category Created",
    };
  } else {
    return {
      message: "Error",
    };
  }
}

async function createIncome(body) {
  const { amount, transactionDate, idUser, incomeCategory, idWallet } = body;
  const query = `INSERT INTO income (amount, transactionDate, idUser, incomeCategory, idWallet) 
                 VALUES ('${amount}','${transactionDate}', '${idUser}','${incomeCategory}','${idWallet}' ); 
                   UPDATE wallet set balance = balance + '${amount}' where id = ${idWallet};
                   UPDATE account set balance = balance + '${amount}' where id = ${idUser}`;
  const result = await db.query(query);
  if (
    result[0].rowCount !== 0 &&
    result[1].rowCount !== 0 &&
    result[2].rowCount !== 0
  ) {
    return {
      result,
    };
  } else {
    return {
      message: "Error",
    };
  }
}

async function createExpense(body) {
  const { amount, transactionDate, idUser, expenseCategory, idWallet } = body;
  const query = `INSERT INTO expense (amount, transactionDate, idUser, expenseCategory, idWallet) 
                 VALUES ('${amount}','${transactionDate}', '${idUser}', '${expenseCategory}','${idWallet}' ); 
                   UPDATE wallet set balance = balance - '${amount}' where idUser = ${idUser};
                   UPDATE account set balance = balance - '${amount}' where id = ${idUser}`;
  const result = await db.query(query);
  if (
    result[0].rowCount !== 0 &&
    result[1].rowCount !== 0 &&
    result[2].rowCount !== 0
  ) {
    return {
      result,
    };
  } else {
    return {
      message: "Error",
    };
  }
}

async function getIncome(body) {
  const { idUser, dateBefore, dateAfter} = body;
  const query = `select incomeCategory.category, amount, wallet.name, transactiondate from income inner join wallet on 
                 income.idwallet = wallet.id inner join incomecategory on incomecategory.id = income.incomecategory
                 where transactionDate between '${dateBefore}' AND '${dateAfter}' AND income.idUser = '${idUser}' ;`
  const result = await db.query(query);
  if (result.rowCount !== 0) {
    const queryResult = result.rows
    return {
      queryResult ,
    };
  } else {
    return {
      message: "Error",
    };
  }
}

async function getExpense(body) {
  const { idUser, dateBefore, dateAfter } = body;
  const query = `select expensecategory.category, amount, wallet.name, transactiondate from expense inner join wallet on 
                 expense.idwallet = wallet.id inner join expensecategory on expensecategory.id = income.expensecategory
                 where transactionDate between '${dateBefore}' AND '${dateAfter}' AND income.idUser = '${idUser}' ;`
  const result = await db.query(query);
  if (result.rowCount !== 0) {
    const queryResult = result.rows
    return {
      queryResult ,
    };
  } else {
    return {
      message: "Error",
    };
  }
}

async function getAllTransaction(body){
  const { idUser, dateBefore, dateAfter } = body;
  const query = `SELECT * FROM income inner join expense on income.idUser = expense.idUser
                 where transactionDate between '${dateBefore}' AND '${dateAfter}' AND idUser = '${idUser}' `;
  const result = await db.query(query);
  if (result.rowCount !== 0) {
    const queryResult = result.rows
    return {
      queryResult ,
    };
  } else {
    return {
      message: "Error",
    };
  }
}

async function getWallet(body){
  const {idUser} = body;
  const query = `SELECT * FROM WALLET WHERE idUser = '${idUser}`;
  const result = await db.query(query);
  if (result.rowCount !== 0) {
    const queryResult = result.rows
    return {
      queryResult ,
    };
  } else {
    return {
      message: "Error",
    };
  }
}

async function getIncomeByWallet(body) {
  const { idUser, dateBefore, dateAfter, idWallet} = body;
  const query = `select incomeCategory.category, amount, wallet.name, transactiondate from income inner join wallet on 
                 income.idwallet = wallet.id inner join incomecategory on incomecategory.id = income.incomecategory
                 where transactionDate between '${dateBefore}' AND '${dateAfter}' AND income.idUser = '${idUser}' AND income.idWallet ='${idWallet}' ;`
  const result = await db.query(query);
  if (result.rowCount !== 0) {
    const queryResult = result.rows
    return {
      queryResult ,
    };
  } else {
    return {
      message: "Error",
    };
  }
}

async function getExpenseByWallet(body) {
  const { idUser, dateBefore, dateAfter, idWallet } = body;
  const query = `select expensecategory.category, amount, wallet.name, transactiondate from expense inner join wallet on 
                 expense.idwallet = wallet.id inner join expensecategory on expensecategory.id = income.expensecategory
                 where transactionDate between '${dateBefore}' AND '${dateAfter}' AND income.idUser = '${idUser}' AND expense.idWallet ='${idWallet}' ;`
  const result = await db.query(query);
  if (result.rowCount !== 0) {
    const queryResult = result.rows
    return {
      queryResult ,
    };
  } else {
    return {
      message: "Error",
    };
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
  getExpense,
  getAllTransaction,
  getWallet,
  getIncomeByWallet,
  getExpenseByWallet,
  getAccountDetail
};
