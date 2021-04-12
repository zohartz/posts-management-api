const Ajv = require("ajv");
const swagger = require("../swagger.json");
const { TRAILING_SLASH_REGEX } = require("./constants");

var ajv = new Ajv({
  allErrors: true,
}).addSchema(swagger, "swagger.json");

exports.validate = (req, res, next) => {
  let validated;

  // get route schema
  // Extract resource from originalUrl
  const striptOriginalUrl = req.originalUrl.replace(TRAILING_SLASH_REGEX, "");
  const route = striptOriginalUrl
    .substring(striptOriginalUrl.lastIndexOf("/") + 1)
    .slice(0, -1);
  const originalUrl = req.originalUrl.toLocaleLowerCase();

  if (originalUrl.includes("login")) {
    validated = ajv.validate(
      { $ref: `swagger.json#/definitions/UserSchema${req.method}login` },
      req.body
    );
  } else if (originalUrl.includes("users")) {
    validated = ajv.validate(
      { $ref: `swagger.json#/definitions/UserSchema${req.method}` },
      req.body
    );
  } else {
    validated = ajv.validate(
      { $ref: `swagger.json#/definitions/Schema${req.method}` },
      req.body
    );
  }
  if (validated) {
    next();
    return;
  }

  const errorResponse = {
    message: `Request schema validation failed for ${req.method} ${req.originalUrl}`,
    errors: ajv.errors.map((err) => {
      switch (err.keyword) {
        case "type":
        case "pattern":
          return `${err.dataPath.replace(".", "")} ${err.message}`;
        case "additionalProperties":
          return `${err.message} [${err.params.additionalProperty}]`;
        default:
          return `${err.message}`;
      }
    }),
  };

  res.status(400);
  res.errors = errorResponse.errors;
  res.json(errorResponse);
};
