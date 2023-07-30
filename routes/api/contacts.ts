const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getSingleContact,
  addNewContact,
  deleteContact,
  updateContact,
} = require("./../../controllers/contacts");

const {
  isValidId,
  validateBody,
  authenticate,
} = require("./../../middlewares/index");

const {
  contactJoiSchema,
  updateFavoriteJoiSchema,
} = require("./../../schemas/contacts");

router.get("/", authenticate, getAllContacts);
router.get("/:contactId", authenticate, isValidId, getSingleContact);
router.post("/", authenticate, validateBody(contactJoiSchema), addNewContact);
router.delete("/:contactId", authenticate, isValidId, deleteContact);
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(contactJoiSchema),
  updateContact
);
router.patch(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(updateFavoriteJoiSchema),
  updateContact
);

module.exports = router;
