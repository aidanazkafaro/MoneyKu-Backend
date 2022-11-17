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

module.exports = {
    register,
    login
}