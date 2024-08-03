import Contact from "../db/models/Contact.js";

const listContacts = () => Contact.findAll();

const getOneContact = (id) => Contact.findByPk(id);

const createContact = (data) => Contact.create(data);

const removeContact = async (id) => Contact.destroy({ where: { id } });

const updateContactById = async (id, updatedData) =>
  Contact.update(updatedData, { where: { id } });

export {
  listContacts,
  getOneContact,
  createContact,
  removeContact,
  updateContactById,
};
