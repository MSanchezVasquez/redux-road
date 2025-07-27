// Initial state of the wagon
const initialWagonState = {
  supplies: 100,
  distance: 0,
  days: 0,
};

// Redux reducer function to manage the wagon's state
const wagonReducer = (state = initialWagonState, action) => {
  switch (action.type) {
    default: {
      return state; // Return the current state for unhandled actions
    }
  }
};
