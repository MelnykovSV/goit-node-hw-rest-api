const { HttpError, contactUniquenessChecker } = require("../../helpers/index");

const { Contact } = require("../../models/contact");

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

module.exports = addNewContact;
