import { Router } from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../decorators/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const addMiddleWare = validateBody(createContactSchema);
const updMiddleWare = validateBody(updateContactSchema);

const contactsRouter = Router();

contactsRouter.get("/", contactsControllers.listContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post("/", addMiddleWare, contactsControllers.createContact);

contactsRouter.put("/:id", updMiddleWare, contactsControllers.updateContact);

export default contactsRouter;
