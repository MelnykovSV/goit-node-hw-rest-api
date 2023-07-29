const contactUniquenessChecker = (data, element, _id = "") => {
  const { name, email, phone } = element;

  const result = { unique: true, field: null };

  data.find(
    (item) => item.name === name || item.email === email || item.phone === phone
  );

  for (const item of data) {
    if (item.name === name && item._id.toString() !== _id) {
      result.unique = false;
      result.field = "name";

      break;
    }
    if (item.email === email && item._id.toString() !== _id) {
      result.unique = false;
      result.field = "email";

      break;
    }
    if (item.phone === phone && item._id.toString() !== _id) {
      result.unique = false;
      result.field = "phone";
   
      break;
    }
  }

  return result;
};

module.exports = contactUniquenessChecker;
