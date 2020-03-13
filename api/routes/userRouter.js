const express = require('express');
const router = express.Router();


const {
    getAccountData,
    createAccount,
    accessAccount,
    addSavings,
    cashOut
} = require('../controllers/userController');

router.post('/create-account', createAccount);
router.post('/access-account', accessAccount);
router.post('/add-savings', addSavings);
router.post('/cashout', cashOut);
router.post('/retrieve-data', getAccountData);

module.exports = router;

