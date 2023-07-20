const { HttpError, ctrlWrapper } = require("./../helpers/index");

const { Contact } = require("./../models/contact");

const getAllContacts = async (req, res) => {
  const response = await Contact.find();

  res.status(200).json({
    status: "success",
    code: 200,
    message: "ok",
    data: response,
  });
};

const getSingleContact = async (req, res) => {
  const response = await Contact.findById(req.params.contactId);
  if (!response) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "ok",
    data: response,
  });
};

const addNewContact = async (req, res) => {
  const response = await Contact.create(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "New contact created",
    data: response,
  });
};

const deleteContact = async (req, res, next) => {
  const response = await Contact.findByIdAndRemove(req.params.contactId);
  if (!response) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: response,
  });
};

const setContact = async (req, res, next) => {
  const response = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );

  if (!response) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact updated",
    data: response,
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getSingleContact: ctrlWrapper(getSingleContact),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  setContact: ctrlWrapper(setContact),
};
