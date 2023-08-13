const { calculatePaginationParams } = require("../../helpers/index");

const { Contact } = require("../../models/contact");

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

module.exports = getAllContacts;
