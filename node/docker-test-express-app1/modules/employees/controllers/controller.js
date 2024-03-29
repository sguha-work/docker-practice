import Ajv from "ajv";
class Controller {

  constructor() {
    this.instance = null;
  }

  static getInstance() {
    if (this.instance == null) {
      this.instance = new Controller();
    }
    return this.instance;
  }

  #sendResponse(response, payload) {
    /**
     * The default response-code is 200. We want to allow to change that. in That case,
     * payload will be an object consisting of a code and a payload. If not customized
     * send 200 and the payload as received in this method.
     */
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.status(payload.code || 200);
    const responsePayload = payload.payload !== undefined ? payload.payload : payload;
    if (responsePayload instanceof Object) {
      response.json(responsePayload);
    } else {
      response.end(responsePayload);
    }
  }

  #sendError(response, error) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.status(error.code || 500);
    if (error.error instanceof Object) {
      response.json(error.error);
    } else {
      response.json({ message: (error.error || error.message), status: error.code || 500 });
    }
  }

  #collectRequestParams(request) {
    let requestParams = { ...request.params, ...request.query };
    try {
      if (request.body !== undefined) {
        if (
          request.headers &&
          request.headers["content-type"] === "application/json"
        ) {
          requestParams = { ...requestParams, ...request.body };
        } else if (
          request.headers &&
          typeof request.headers["content-type"] != "undefined" &&
          request.headers["content-type"].indexOf("multipart/form-data") !== -1
        ) {
          Object.keys(content["multipart/form-data"].schema.properties).forEach(
            (property) => {
              const propertyObject =
                content["multipart/form-data"].schema.properties[property];
              if (
                propertyObject.format !== undefined &&
                propertyObject.format === "binary"
              ) {
                requestParams[property] = this.collectFile(request, property);
              } else {
                requestParams[property] = request.body[property];
              }
            }
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
    console.log("requestParams >>> ", requestParams);
    return requestParams;
  }

  async handleRequest(request, response, serviceOperation, validationSchema = false) {
    try {
      const consolidatedParams = this.#collectRequestParams(request);
      if (validationSchema) {
        const ajv = new Ajv(validationSchema.config);
        const validationObj = ajv.validate(validationSchema.schema, consolidatedParams);
        if (!validationObj) {
          const errRespObj = {
            code: 400,
            error: {
              status: 400,
              message: "Data Validation Failed.",
              errors: ajv.errors
            }
          }
          return this.#sendError(response, errRespObj);
        }
      }
      if (request.identity) {
        consolidatedParams.identity = request.identity;
        console.log('request.identity', request.identity);
      }
      const serviceResponse = await serviceOperation(consolidatedParams);
      this.#sendResponse(response, serviceResponse);
    } catch (error) {
      this.#sendError(response, error);
    }
  }
}
export default Controller;