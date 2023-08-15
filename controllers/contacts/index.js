const { ctrlWrapper } = require("../../helpers/index");

const getAllContacts = require("./getAllContacts");
const getSingleContact = require("./getSingleContact");
const addNewContact = require("./addNewContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getSingleContact: ctrlWrapper(getSingleContact),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
