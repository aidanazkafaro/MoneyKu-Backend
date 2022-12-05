const moneykuService = require("../services/moneykuService");

async function register(req, res) {
  try {
    const result = await moneykuService.register(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function login(req, res) {
  try {
    const result = await moneykuService.login(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function createDefaultWallet(req, res) {
  try {
    const result = await moneykuService.createDefaultWallet(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}
async function createWallet(req, res) {
  try {
    const result = await moneykuService.createWallet(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function createIncomeCategory(req, res) {
  try {
    const result = await moneykuService.createIncomeCategory(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function createExpenseCategory(req, res) {
  try {
    const result = await moneykuService.createExpenseCategory(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function createIncome(req, res) {
  try {
    const result = await moneykuService.createIncome(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function createExpense(req, res) {
  try {
    const result = await moneykuService.createExpense(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function getIncome(req, res) {
  try {
    const result = await moneykuService.getIncome(req.query);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function getExpense(req, res) {
  try {
    const result = await moneykuService.getExpense(req.query);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function getAllTransaction(req, res) {
  try {
    const result = await moneykuService.getAllTransaction(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function getWallet(req, res) {
  try {
    const result = await moneykuService.getWallet(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function getIncomeByWallet(req, res) {
  try {
    const result = await moneykuService.getIncomeByWallet(req.query);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function getExpenseByWallet(req, res) {
  try {
    const result = await moneykuService.getExpenseByWallet(req.query);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function getAllTransactionByWallet(req, res) {
  try {
    const result = await moneykuService.getAllTransactionByWallet(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function getAccountDetail(req, res) {
  try {
    const result = await moneykuService.getAccountDetail(req.query.idUser);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function getCategory(req, res) {
  try {
    const result = await moneykuService.getCategory();
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

module.exports = {
  register,
  login,
  createWallet,
  createDefaultWallet,
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
  getAllTransactionByWallet,
  getAccountDetail,
  getCategory,
};
