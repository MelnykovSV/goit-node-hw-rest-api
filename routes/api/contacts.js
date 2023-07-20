const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getSingleContact,
  addNewContact,
  deleteContact,
  updateContact,
} = require("./../../controllers/contacts");

const { isValidId, validateBody } = require("./../../middlewares/index");

const {
  contactJoiSchema,
  updateFavoriteJoiSchema,
} = require("./../../schemas/contacts");

router.get("/", getAllContacts);
router.get("/:contactId", isValidId, getSingleContact);
router.post("/", validateBody(contactJoiSchema), addNewContact);
router.delete("/:contactId", isValidId, deleteContact);
router.put(
  "/:contactId",
  isValidId,
  validateBody(contactJoiSchema),
  updateContact
);
router.patch(
  "/:contactId",
  isValidId,
  validateBody(updateFavoriteJoiSchema),
  updateContact
);

module.exports = router;
