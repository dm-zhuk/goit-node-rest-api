import * as s from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import EmptyRequestBodyError from "../helpers/EmptyRequestBodyError.js";

const listContacts = async (req, res) => {
  const result = await s.listContacts();
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await s.getOneContact(id);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await s.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }

  res.json({
    "Contact delete success": result,
  });
};

const createContact = async (req, res) => {
  const result = await s.createContact(req.body);

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  EmptyRequestBodyError(updatedData);

  const updatedContact = await s.updateContactById(id, updatedData);

  if (!updatedContact) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }

  res.json(updatedContact);
};

export default {
  listContacts: ctrlWrapper(listContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
