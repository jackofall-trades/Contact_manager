//contains all the logic for the contact routes

const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//adesc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });

    res.status(200).json({ message: "Get all contacts" , contacts });
});

//@desc Create new contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log("contact data", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json({ message: "Create contact" , contact });
});

//@desc Get single contact
//@route GET /api/contacts/:id
//@access private
const getSingleContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    } 
    res.status(200).json({ message: `contact info of ${req.params.id}`, contact });
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res)=> {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    //check if user is authorized to update the contact
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User not authorized to update this contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    res.status(200).json({ message: "contact updated" , updatedContact });
    // res.status(200).json({ message: `Update contact for ${req.params.id}`});
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    //check if user is authorized to update the contact
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User not authorized to update this contact");
    }
    
    //await Contact.findByIdAndDelete(req.params.id);
    await contact.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Contact deleted", contact });
});

module.exports = {
    getContacts,
    createContact,
    getSingleContact,
    updateContact,
    deleteContact
};

