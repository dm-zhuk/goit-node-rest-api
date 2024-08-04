import dbContacts from "../db/models/dbContacts.js";

const listContacts = () => dbContacts.findAll();

const getOneContact = (id) => dbContacts.findByPk(id);

const createContact = (data) => dbContacts.create(data);

const removeContact = async (id) => dbContacts.destroy({ where: { id } });

const updateContactById = async (id, updatedData) =>
  dbContacts.update(updatedData, { where: { id } });

export {
  listContacts,
  getOneContact,
  createContact,
  removeContact,
  updateContactById,
};
