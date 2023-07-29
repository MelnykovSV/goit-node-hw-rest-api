const {
  HttpError,
  ctrlWrapper,
  calculatePaginationParams,
  contactUniquenessChecker,
} = require("./../helpers/index");

const { Contact } = require("./../models/contact");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 3, favorite = null } = req.query;
  const searchQueryBody = { owner };
  if (favorite !== null) {
    searchQueryBody.favorite = favorite;
  }

  const response = await Contact.find(
    searchQueryBody,
    "-createdAt -updatedAt -owner",
    calculatePaginationParams(page, limit)
  );

  res.status(200).json({
    status: "success",
    code: 200,
    message: "ok",
    data: response,
  });
};

const getSingleContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId: _id } = req.params;

  const response = await Contact.findOne(
    { _id, owner },
    "-createdAt -updatedAt -owner"
  );
  if (!response) {
    throw HttpError(404);
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "OK",
    data: response,
  });
};

const addNewContact = async (req, res) => {
  const { _id: owner } = req.user;

  const userContacts = await Contact.find(
    { owner },
    "-createdAt -updatedAt -owner"
  );

  const { unique, field } = contactUniquenessChecker(userContacts, req.body);

  if (!unique) {
    throw HttpError(400, `This ${field} is already in your contacts`);
  }


  const { name, email, phone, favorite, _id } = await Contact.create({
    ...req.body,
    owner,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    message: "New contact created",
    data: { name, email, phone, favorite, _id },
  });
};

const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const response = await Contact.findOneAndRemove({
    _id: req.params.contactId,
    owner,
  });
  if (!response) {
    throw HttpError(404, "Not found");
  }

  const { name, email, phone, favorite, _id } = response;

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: { name, email, phone, favorite, _id },
  });
};

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;

  const userContacts = await Contact.find(
    { owner },
    "-createdAt -updatedAt -owner"
  );

  const { unique, field } = contactUniquenessChecker(
    userContacts,
    req.body,
    req.params.contactId
  );

  if (!unique) {
    throw HttpError(400, `This ${field} is already in your contacts`);
  }

  const response = await Contact.findOneAndUpdate(
    {
      _id: req.params.contactId,
      owner,
    },
    req.body,
    { new: true }
  );

  if (!response) {
    throw HttpError(404, "Not found");
  }

  const { name, email, phone, favorite, _id } = response;

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact updated",
    data: { name, email, phone, favorite, _id },
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getSingleContact: ctrlWrapper(getSingleContact),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
