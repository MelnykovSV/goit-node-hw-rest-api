const { HttpError } = require("../../helpers/index");

const { Contact } = require("../../models/contact");

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

module.exports = deleteContact;
