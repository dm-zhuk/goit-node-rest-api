import { Router } from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../decorators/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

const addMiddleWare = validateBody(createContactSchema);
const updMiddleWare = validateBody(updateContactSchema);
const favoriteMiddleware = validateBody(updateFavoriteSchema);

const contactsRouter = Router();

contactsRouter.get("/", contactsControllers.listContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post("/", addMiddleWare, contactsControllers.createContact);

contactsRouter.put("/:id", updMiddleWare, contactsControllers.updateContact);

contactsRouter.patch("/:id", updMiddleWare, contactsControllers.updateContact);

contactsRouter.patch(
  "/:contactId/favorite",
  favoriteMiddleware,
  contactsControllers.updateStatusContact
);

export default contactsRouter;
