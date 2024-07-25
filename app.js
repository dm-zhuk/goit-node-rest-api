import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";

const app = express(); // app here == web-server

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// temp exercise
app.get("/", (request, response) => {
  response.send("<h1>Home page</h1>");
});
app.get("/users", (request, response) => {
  console.log(request.url);
  console.log(request.method);
  response.send("<h1>User's list page</h1>");
});

import temp from "./helpers/temp.js";
app.get("/temp", (req, res) => {
  res.json(temp);
});

app.use((req, res, next) => {
  console.log("1st middleware");
  next();
});
// temp exercise end

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
