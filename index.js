// import {redux} from 'redux'; //redux is imported
const redux = require("redux");

const createStore = redux.createStore; //store is created
const combineReducers = redux.combineReducers; // combine reducer is created form multiple reducer
const applyMiddleware = redux.applyMiddleware; // middle ware is define

const Buy_Laptop = "Buy_Laptop"; // action type is define
const Buy_Camera = "Buy_Camera";
//initial state of app is define
const initialStateLaptop = {
  numberOfLaptop: 15,
};

const initialStateCamera = {
  numberOfCamera: 20,
};

// const action = {
//   type: Buy_Laptop,
//   payload: 'My first redux app'
// }

//action function or Action creator => wrappig the action in a single function
function buyLaptop() {
  // return action; // or we can also write like given below
  return {
    type: Buy_Laptop,
    payload: "My first action code",
  };
}

function buyCamera() {
  return {
    type: Buy_Camera,
    payload: "My second action",
  };
}

//reducer work is to take (prevState, action) => newState
const laptopReducer = (state = initialStateLaptop, action) => {
  switch (action.type) {
    case "Buy_Laptop":
      return {
        ...state,
        numberOfLaptop: state.numberOfLaptop - 1,
      };

    default:
      return state;
  }
};

const cameraReducer = (state = initialStateCamera, action) => {
  switch (action.type) {
    case "Buy_Camera":
      return {
        ...state,
        numberOfCamera: state.numberOfCamera - 2,
      };
    default:
      return state;
  }
};

//multiple reducer passed as argument
const Reducer = combineReducers({
  laptop: laptopReducer,
  camera: cameraReducer
});

//applyMiddleware for capturing log
const logger = store => {
  return next => {
    return action => {
      const result = next(action);
      console.log("middleware log",result);
      return result;
    }
  }
}

//calling a store
const store = createStore(Reducer, applyMiddleware(logger));
console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated state Value", store.getState())
);
store.dispatch(buyLaptop());
store.dispatch(buyLaptop());
store.dispatch(buyLaptop());
store.dispatch(buyCamera());
store.dispatch(buyCamera());
store.dispatch(buyCamera());
unsubscribe();
