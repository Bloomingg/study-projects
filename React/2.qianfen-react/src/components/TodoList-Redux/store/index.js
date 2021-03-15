import { createStore, applyMiddleware } from "redux";

import reducer from "./reducer";
import m1 from "../middlewares/m1";

const middleware = applyMiddleware(m1);

export default createStore(reducer, middleware);
