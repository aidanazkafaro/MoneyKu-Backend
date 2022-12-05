const express = require("express");
const router = express.Router();
const moneykuController = require("../controller/moneykuController");

router.post("/register", moneykuController.register);
router.post("/login", moneykuController.login);
router.post("/createWallet", moneykuController.createWallet);
router.post("/createDefaultWallet", moneykuController.createDefaultWallet);
router.post("/createIncomeCategory", moneykuController.createIncomeCategory);
router.post("/createExpenseCategory", moneykuController.createExpenseCategory);
router.post("/createIncome", moneykuController.createIncome);
router.post("/createExpense", moneykuController.createExpense);
router.get("/getIncome", moneykuController.getIncome);
router.get("/getExpense", moneykuController.getExpense);
router.get("/getAllTransaction", moneykuController.getAllTransaction);
router.get("/getWallet", moneykuController.getWallet);
router.get("/getIncomeByWallet", moneykuController.getIncomeByWallet);
router.get("/getExpenseByWallet", moneykuController.getExpenseByWallet);
router.get("/getAccountDetail", moneykuController.getAccountDetail);
router.get("/getCategory", moneykuController.getCategory);

module.exports = router;
