import { action } from "easy-peasy";
import { generate } from "shortid";

const clockModel = {
  /*=============================================
  =      Local Clock Functionality - Start      =
  =============================================*/

  localClock: {
    title: "Track Zone Application",
    timezone: "",
    offset: 0,
    date: null,
  },

  clocks: [],
  folders: [],

  setFolders: action((state, payload) => {
    state.folders = payload;
  }),

  // Update local clock
  updateLocalClock: action((state, { timezone, offset, date }) => {
    state.localClock.timezone = timezone;
    state.localClock.offset = offset;
    state.localClock.date = date;
  }),

  /*=============================================
  =      Local Clock Functionality - End        =
  =============================================*/

  // Create new clock
  createClock: action((state, clock) => {
    clock.id = generate();
    state.clocks.push(clock);
  }),

  // Create new folder
  createFolder: action((state, folder) => {
    folder.id = generate();
    state.folders.push(folder);
  }),

  // Update existing clock
  updateClock: action((state, updatedClock) => {
    state.clocks = state.clocks.map((clock) =>
      clock.id === updatedClock.id ? updatedClock : clock
    );
  }),

  // Delete clock
  deleteClock: action((state, id) => {
    state.clocks = state.clocks.filter((clock) => clock.id !== id);
  }),
};

export default clockModel;
