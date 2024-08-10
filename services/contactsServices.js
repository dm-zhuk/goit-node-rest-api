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

const getOneContact = (query) => dbContacts.findOne({ where: query });

const createContact = (data) => dbContacts.create(data);

const removeContact = async (query) => dbContacts.destroy({ where: query });

const updateContact = async (query, updatedData) => {
  const contact = await getOneContact(query);
  if (!contact) {
    return null;
  }
  return dbContacts.update(updatedData, { returning: true });
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
  updateContact,
  updateStatusContact,
};
