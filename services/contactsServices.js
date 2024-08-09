import dbContacts from "../db/models/dbContacts.js";

const getContacts = ({ page = 1, limit = 20 }, query = {}) => {
  const normalizedLimit = Number(limit);
  const offset = (Number(page) - 1) * normalizedLimit;

  return dbContacts.findAll({
    where: query,
    offset,
    limit: normalizedLimit,
    order: [["id", "asc"]],
  });
};

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
  getContacts,
  getOneContact,
  createContact,
  removeContact,
  updateContactById,
  updateStatusContact,
};
