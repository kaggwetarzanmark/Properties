const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const landlordController = require('../controllers/landlord');
const landlordviewController = require('../controllers/landlordviewController');
const adminController = require('../controllers/adminController');
const customerController = require('../controllers/customerController');
const commentController = require('../controllers/commentController'); // Import the comment controller

const { isAuthenticated } = require('./auth');

router.get(['/', '/login'], loginController.renderLoginPage);
router.get('/register', registerController.renderRegisterPage);
router.get('/landlord', isAuthenticated, landlordController.renderReportsPage);
router.post('/register', registerController.registerUser);
router.post('/landlord', isAuthenticated, landlordController.addProperty);
router.get('/landlordview', isAuthenticated, landlordviewController.renderlandlordviewPage);
router.get('/landlordview', isAuthenticated, landlordviewController.renderlandlordviewPage);
router.post('/update-property', isAuthenticated, landlordviewController.updateProperty);
router.post('/delete-property', isAuthenticated, landlordviewController.deleteProperty);
router.get('/admin', isAuthenticated, adminController.renderadmin);
router.post('/admin', isAuthenticated, adminController.updatePropertyStatus);
router.get('/customer', isAuthenticated, customerController.renderCustomer);
router.post('/customer', isAuthenticated, customerController.commentsHandler);

// Handle POST request to add a new comment
router.post('/comments', isAuthenticated, commentController.addComment);

module.exports = router;
