import dbContacts from "../db/models/dbContacts.js";

export const getAllContacts = (query = {}, pagination = {}) => {
  const { page = 1, limit = 20 } = pagination;
  const normalizedLimit = Number(limit);
  const offset = (Number(page) - 1) * normalizedLimit;

  return dbContacts.findAll({
    where: query,
    offset,
    limit: normalizedLimit,
    order: [["id", "asc"]],
  });
};
export const getOneContact = (query) => dbContacts.findOne({ where: query });

export const createContact = (data) => dbContacts.create(data);

export const removeContact = async (query) =>
  dbContacts.destroy({ where: query });

export const updateContact = async (query, updatedData) => {
  const contact = await getOneContact(query);
  if (!contact) {
    return null;
  }
  return dbContacts.update(updatedData, { returning: true });
};

export const updateStatusContact = async (id, { favorite }) => {
  await dbContacts.update({ favorite }, { where: { id } });

  return await getOneContact(id);
};
