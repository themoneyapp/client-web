import createSagaMiddleware from "redux-saga";


export const sagaMiddleware = createSagaMiddleware();


const middlewares = [
  sagaMiddleware,
];


if (process.env.NODE_ENV === "development") {
  const { createLogger } = require("redux-logger");  // eslint-disable-line @typescript-eslint/no-var-requires
  const invariant = require("redux-immutable-state-invariant").default;  // eslint-disable-line @typescript-eslint/no-var-requires

  middlewares.push(invariant());
  middlewares.push(createLogger({ collapsed: true }));
}


export default middlewares;
