// Initial state of the wagon
const initialWagonState = {
  supplies: 100,
  distance: 0,
  days: 0,
  cash: 200,
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
      const newSupplies = state.supplies - 20 * days;
      if (newSupplies < 0) {
        return state; // Prevent traveling if not enough supplies
      }
      return {
        ...state,
        supplies: newSupplies,
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
    case "sell": {
      const canSell = state.supplies >= 20;
      if (!canSell) {
        return state; // Prevent selling if not enough supplies
      }
      return {
        ...state,
        supplies: state.supplies - 20,
        cash: state.cash + 5,
      };
    }
    case "buy": {
      const canBuy = state.cash >= 15;
      if (!canBuy) {
        return state; // Prevent buying if not enough cash
      }
      return {
        ...state,
        supplies: state.supplies + 25,
        cash: state.cash - 15,
      };
    }
    case "theft": {
      return {
        ...state,
        cash: Math.floor(state.cash / 2), // Halve the cash due to theft
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

wagon = wagonReducer(wagon, { type: "travel", payload: 3 }); // Simulate traveling for 3 more days
console.log(wagon);

wagon = wagonReducer(wagon, { type: "gather" }); // Simulate gathering supplies again
console.log(wagon);

wagon = wagonReducer(wagon, { type: "sell" }); // Simulate selling supplies
console.log(wagon);

wagon = wagonReducer(wagon, { type: "sell" }); // Simulate selling supplies
console.log(wagon);

wagon = wagonReducer(wagon, { type: "buy" }); // Simulate buying supplies
console.log(wagon);

wagon = wagonReducer(wagon, { type: "theft" }); // Simulate theft
console.log(wagon);
wagon = wagonReducer(wagon, { type: "theft" }); // Simulate theft
console.log(wagon);
