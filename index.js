// Initial state of the wagon
const initialWagonState = {
  supplies: 100,
  distance: 0,
  days: 0,
};

// Redux reducer function to manage the wagon's state
const wagonReducer = (state = initialWagonState, action) => {
  switch (action.type) {
    case "gather": {
      return {
        ...state,
        supplies: state.supplies + 15,
        distance: state.distance,
        days: state.days + 1,
      };
    }
    case "travel": {
      const days = action.payload;
      return {
        ...state,
        supplies: state.supplies - 20 * days,
        distance: state.distance + 10 * days,
        days: state.days + days,
      };
    }
    case "tippedWagon": {
      return {
        ...state,
        supplies: state.supplies - 30,
        days: state.days + 1,
      };
    }
    default: {
      return state; // Return the current state for unhandled actions
    }
  }
};

let wagon = wagonReducer(undefined, {}); // Initialize the wagon state
console.log(wagon);

wagon = wagonReducer(wagon, { type: "travel", payload: 1 }); // Simulate traveling for 1 day
console.log(wagon);

wagon = wagonReducer(wagon, { type: "gather" }); // Simulate gathering supplies
console.log(wagon);

wagon = wagonReducer(wagon, { type: "tippedWagon" }); // Simulate a tipped wagon
console.log(wagon);

wagon = wagonReducer(wagon, { type: "travel", payload: 3 }); // Simulate traveling for 3 more days
console.log(wagon);
