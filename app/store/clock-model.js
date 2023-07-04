import { action } from "easy-peasy";
import { generate } from "shortid";

const clockModel = {
  localClock: {
    title: "Track Zone Application",
    timezone: "",
    offset: 0,
    date: null,
  },

  clocks: [],
  folders: [],

  updateLocalClock: action((state, date) => {
    state.localClock.date = { ...state.date, ...date };
  }),

  // updateLocalClock: action((state, { timezone, offset, date }) => {
  //   state.localClock.timezone = timezone;
  //   state.localClock.offset = offset;
  //   state.localClock.date = date;
  // }),

  // create new clock
  createClock: action((state, clock) => {
    clock.id = generate();
    state.clocks.push(clock);
  }),

  // create new folder
  createFolder: action((state, folder) => {
    folder.id = generate();
    state.folders.push(folder);
  }),

  // update existing clock
  updateClock: action((state, updatedClock) => {
    state.clocks = state.clocks.map((clock) =>
      clock.id === updatedClock.id ? updatedClock : clock
    );
  }),

  // delete clock
  deleteClock: action((state, id) => {
    state.clocks = state.clocks.filter((clock) => clock.id !== id);
  }),
};

export default clockModel;
