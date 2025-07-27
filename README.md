# Redux Wagon Simulator

A simple state-driven simulation using a Redux-style reducer to model a wagon journey. Players manage supplies, distance, days, and cash, while reacting to random and intentional events like traveling, gathering, buying, selling, and surviving thefts or accidents.

---

## 🧠 Core Concepts

- **State Management:** Pure reducer function handles game logic.
- **Actions:** Represent events that change the wagon's state.
- **Economy:** Trade supplies for cash, buy more when needed.
- **Validation:** Prevents actions when resources are insufficient.

---

## 🚀 Getting Started

### Requirements

- Node.js or any JavaScript runtime

### Run It

```bash
node index.js
```

Make sure your reducer and sample actions are defined in `index.js`.

---

## 🧩 Initial State

```js
{
  supplies: 100,
  distance: 0,
  days: 0,
  cash: 200
}
```

---

## 🎮 Available Actions

| Action        | Effect                                                               |
| ------------- | -------------------------------------------------------------------- |
| `gather`      | +15 supplies, +1 day                                                 |
| `travel`      | −20 supplies/day, +10 km/day, +X days (fails if not enough supplies) |
| `tippedWagon` | −30 supplies, +1 day                                                 |
| `sell`        | −20 supplies, +5 cash (fails if not enough supplies)                 |
| `buy`         | −15 cash, +25 supplies (fails if not enough cash)                    |
| `theft`       | Cash is halved (consider rounding down to avoid floats)              |

---

## 🧪 Example Usage

```js
let wagon = wagonReducer(undefined, {}); // Initial state
wagon = wagonReducer(wagon, { type: "travel", payload: 1 });
wagon = wagonReducer(wagon, { type: "gather" });
wagon = wagonReducer(wagon, { type: "tippedWagon" });
wagon = wagonReducer(wagon, { type: "travel", payload: 3 });
wagon = wagonReducer(wagon, { type: "sell" });
wagon = wagonReducer(wagon, { type: "buy" });
wagon = wagonReducer(wagon, { type: "theft" });
wagon = wagonReducer(wagon, { type: "theft" });
console.log(wagon);
```

---

## 📦 Reducer Structure

```js
const wagonReducer = (state = initialWagonState, action) => {
  switch (action.type) {
    case "gather":
      return { ...state, supplies: state.supplies + 15, days: state.days + 1 };
    case "travel":
      const days = action.payload;
      const newSupplies = state.supplies - 20 * days;
      if (newSupplies < 0) return state;
      return {
        ...state,
        supplies: newSupplies,
        distance: state.distance + 10 * days,
        days: state.days + days,
      };
    case "tippedWagon":
      return { ...state, supplies: state.supplies - 30, days: state.days + 1 };
    case "sell":
      if (state.supplies < 20) return state;
      return { ...state, supplies: state.supplies - 20, cash: state.cash + 5 };
    case "buy":
      if (state.cash < 15) return state;
      return { ...state, supplies: state.supplies + 25, cash: state.cash - 15 };
    case "theft":
      return { ...state, cash: Math.floor(state.cash / 2) };
    default:
      return state;
  }
};
```

---

## 📈 Ideas for Expansion

- Add inventory or health systems
- Implement random events engine
- Track log of past actions
- Build a UI with React + Redux

---

## 👨‍💻 Author

Created by Moises Sanchez — built with clean, modular reducer logic for educational and functional simulation.
