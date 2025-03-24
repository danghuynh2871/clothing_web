const express = require('express');
const router = express.Router();
const {
    getContacts,
    createContacts,
    getContact,
    updateContact,
    deleteContact,
} = require('../controllers/contactController');

//Root path
router.route("/")
    .get(getContacts)
    .post(createContacts);

//Root parameter /:id
router.route("/:id")
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact);

module.exports = router;
