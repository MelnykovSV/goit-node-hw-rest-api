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
      console.log(item);
      console.log(_id);
      break;
    }
    if (item.email === email && item._id.toString() !== _id) {
      result.unique = false;
      result.field = "email";
      console.log(item._id);
      console.log(_id);
      break;
    }
    if (item.phone === phone && item._id.toString() !== _id) {
      result.unique = false;
      result.field = "phone";
      console.log(item);
      console.log(_id);
      break;
    }
  }

  return result;
};

module.exports = contactUniquenessChecker;
