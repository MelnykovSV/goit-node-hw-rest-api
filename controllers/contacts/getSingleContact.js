const { HttpError } = require("../../helpers/index");

const { Contact } = require("../../models/contact");

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

module.exports = getSingleContact;
