import { createStore } from "easy-peasy";
import clockModel from "./clock-model";

const store = createStore({
  clockModel,
});

export default store;
