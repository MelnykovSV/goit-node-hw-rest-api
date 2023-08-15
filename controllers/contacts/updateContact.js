const { HttpError, contactUniquenessChecker } = require("../../helpers/index");

const { Contact } = require("../../models/contact");

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

module.exports = updateContact;
