const messageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

export const validateReqBody = (body) => {
  if (Object.keys(body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
};

const HttpError = (status, message = messageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;
