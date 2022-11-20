const moneykuService = require ('../services/moneykuService');

async function register (req, res){
    try{
        const result = await moneykuService.register(req.body);
        res.json (result)
    }
    catch(err){
        res.json (err.detail);
    }
}

async function login (req, res){
    try{
        const result = await moneykuService.login(req.body);
        res.json(result)
    }
    catch (err){
        res.json (err.detail)
    }
}

async function createWallet (req, res){
    try{
        const result = await moneykuService.createWallet(req.body);
        res.json(result)
    }
    catch (err){
        res.json (err.detail)
    }
}

async function createIncomeCategory (req, res){
    try{
        const result = await moneykuService.createIncomeCategory(req.body);
        res.json(result)
    }
    catch (err){
        res.json (err.detail)
    }
}

async function createExpenseCategory (req, res){
    try{
        const result = await moneykuService.createExpenseCategory(req.body);
        res.json(result)
    }
    catch (err){
        res.json (err.detail)
    }
}

async function createIncome (req, res){
    try{
        const result = await moneykuService.createIncome(req.body);
        res.json(result)
    }
    catch (err){
        res.json (err.detail)
    }
}

async function createExpense (req, res){
    try{
        const result = await moneykuService.createExpense(req.body);
        res.json(result)
    }
    catch (err){
        res.json (err.detail)
    }
}

async function getIncome (req, res){
    try{
        const result = await moneykuService.getIncome(req.body);
        res.json(result)
    }
    catch (err){
        res.json (err.detail)
    }
}

async function getExpense (req, res){
    try{
        const result = await moneykuService.getExpense(req.body);
        res.json(result)
    }
    catch (err){
        res.json (err.detail)
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