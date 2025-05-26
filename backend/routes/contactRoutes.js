const express = require("express");
const router = express.Router();
const { 
    getContacts,
    createContact,
    getSingleContact,
    updateContact,
    deleteContact
} = require("../controllers/contactController");
const validateToken = require("../middlewares/valiidateToken");

router.use(validateToken);
//get method to fetch all contacts
//post method to create new contact
//get method to fetch single contact
//put method to update contact
//delete method to delete contact
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getSingleContact).put(updateContact).delete(deleteContact);

module.exports = router;
