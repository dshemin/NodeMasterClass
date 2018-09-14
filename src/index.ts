import { createServer as createHttpServer } from "http";
import { StringDecoder } from "string_decoder";
import { parse } from "url";
import config from "./config";


const handlers = {
  hello: (data, callback) => {
    if (data.method !== "POST") {
      callback(405);
      return;
    }

    callback(200, { message: "Hello" });
  },
  notFound: (data, callback) => callback(404),
};

const router = {
  hello: handlers.hello,
};

function handleRequest(request, response) {
  const url = parse(request.url, true);
  const path = url.pathname.replace(/^\/+|\/+$/g, "");
  const method = request.method.toUpperCase();
  const qs = url.query;
  const headers = request.headers;

  const decoder = new StringDecoder("utf-8");
  let buf = "";

  request
    .on("data", (data) => buf += decoder.write(data))
    .on("end", () => {
      buf += decoder.end();

      const handler = typeof(router[path]) !== "undefined"
        ? router[path]
        : handlers.notFound;

      const data = {
        headers,
        method,
        path,
        payload: buf,
        qs,
      };

      handler(data, (statusCode: number = 200, payload: object = {}) => {
        response.writeHead(statusCode, {
          "Content-Type": "application/json",
        });
        response.end(JSON.stringify(payload));
      });

      console.log(`Got ${method} request to "${path}"`);
    });
}

createHttpServer(handleRequest)
  .listen(config.port, () => console.log(`Listen on ${config.port}.`));

