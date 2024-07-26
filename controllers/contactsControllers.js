import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.getAllContacts();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsControllers.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// export const getOneContact = (req, res, nexts) => {
//   console.log(req.params);
// };

// export const deleteContact = (req, res, next) => {};

// export const createContact = (req, res, next) => {};

// export const updateContact = (req, res, next) => {};

export default { getAllContacts, getContactById };
