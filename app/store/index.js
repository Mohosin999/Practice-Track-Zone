import { createStore } from "easy-peasy";
import clockModel from "./clock-model";
import eventModel from "./event-model";

const store = createStore({
  clockModel,
  eventModel,
});

export default store;
