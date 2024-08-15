import path from "node:path";
import * as fs from "node:fs/promises";
import * as s from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import EmptyRequestBodyError from "../helpers/EmptyRequestBodyError.js";

const avatarsPath = path.resolve("public", "avatars");

const createContact = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "No file uploaded");
  }

  const { path: oldPath, filename } = req.file;
  console.log(oldPath);
  console.log(filename);

  // const newPath = path.join(avatarsPath, filename);
  // await fs.rename(oldPath, newPath);
  // const { id: owner } = req.user;
  // const avatar = path.join("avatars", filename);
  // const result = await s.createContact({ ...req.body, avatar, owner });
  // res.status(201).json(result);
};

/* const createContact = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "No file uploaded");
  }

  const { path: oldPath, filename } = req.file;
  console.log(req.file);
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const { id: owner } = req.user;
  const avatar = path.join("avatars", filename);
  const result = await s.createContact({ ...req.body, avatar, owner });
  res.status(201).json(result);
  console.log(newPath);
  console.log(req.body);
}; 
// -b auth:
const createContact = async (req, res) => {
  const { id: owner } = req.user;

  const result = await s.createContact({ ...req.body, owner });
  res.status(201).json(result);
};
*/

const getContacts = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const result = await s.getAllContacts({ owner }, { page, limit });
  res.json(result);
};

const getTrueFavorites = async (req, res) => {
  const { id: owner } = req.user;
  const result = await s.getAllContacts({ owner, favorite: true });
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const result = await s.getOneContact({ id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const result = await s.removeContact({ id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }

  res.json({
    "Contact delete success": result,
  });
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const updatedData = req.body;

  EmptyRequestBodyError(updatedData);

  const updatedContact = await s.updateContact({ id, owner }, updatedData);
  if (!updatedContact) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const { id: owner } = req.user;

  EmptyRequestBodyError({ favorite });

  const updatedStatus = await s.updateContact({ id, owner }, { favorite });
  if (!updatedStatus) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }

  res.json(updatedStatus);
};

export default {
  getContacts: ctrlWrapper(getContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  getTrueFavorites: ctrlWrapper(getTrueFavorites),
};
