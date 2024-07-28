import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = async (allContacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(allContacts);
}

async function getOneContact(id) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);

  return result || null;
}

async function createContact(data) {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), ...data };

  allContacts.push(newContact);

  await updateContacts(allContacts);

  return newContact;
}

async function removeContact(id) {
  const allContacts = await listContacts();

  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const [result] = allContacts.splice(index, 1);

  await updateContacts(allContacts);

  return result;
}

async function updateContactById(id, updatedData) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  allContacts[index] = { ...allContacts[index], ...updatedData };

  await updateContacts(allContacts);

  return allContacts[index];
}

export {
  listContacts,
  getOneContact,
  createContact,
  removeContact,
  updateContactById,
};
