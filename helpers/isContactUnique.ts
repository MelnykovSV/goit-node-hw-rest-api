import { IContact } from "../interfaces";

const isContactUnique = (
  data: IContact[],
  name: string,
  email: string,
  phone: string,
  exeptionId: number
) => {
  let dataToCheck = [...data];
  if (exeptionId !== undefined) {
    dataToCheck = [...data.filter((item, i) => i !== exeptionId)];
  }
  const result = dataToCheck.some((item) => {
    return item.name === name || item.email === email || item.phone === phone;
  });

  return !result;
};

module.exports = isContactUnique;

//TODO: CHECH IF THIS IS NEEDED!
