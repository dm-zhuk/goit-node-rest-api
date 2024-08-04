import dbContacts from "../db/models/dbContacts.js";

const listContacts = () => dbContacts.findAll({ order: [["id", "asc"]] });

const getOneContact = (id) => dbContacts.findByPk(id);

const createContact = (data) => dbContacts.create(data);

const removeContact = async (id) => {
  const removedContact = await getOneContact(id);
  dbContacts.destroy({ where: { id } });

  return removedContact;
};

const updateContactById = async (id, updatedData) => {
  await dbContacts.update(updatedData, { where: { id } });

  return await getOneContact(id);
};

const updateStatusContact = async (id, { favorite }) => {
  await dbContacts.update({ favorite }, { where: { id } });

  return await getOneContact(id);
};

export {
  listContacts,
  getOneContact,
  createContact,
  removeContact,
  updateContactById,
  updateStatusContact,
};
