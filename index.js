// import {redux} from 'redux'; //redux is imported
const redux = require('redux');

const createStore = redux.createStore; //store is created

const Buy_Laptop = 'Buy_Laptop'; // action type is define
const Buy_Camera = 'Buy_Camera';
 //initial state of app is define
const initialState = {
  numberOfLaptop : 15,
  numberOfCamera : 20
}

// const action = {
//   type: Buy_Laptop,
//   payload: 'My first redux app'
// }


//action function or Action creator => wrappig the action in a single function
function buyLaptop() {
  // return action; // or we can also write like given below
  return {
      type: Buy_Laptop,
      payload: 'My first action code'
    }
}

function buyCamera() {
  return {
    type: Buy_Camera,
    payload: 'My second action'
  }
}

//reducer work is to take (prevState, action) => newState 
const Reducer = (state=initialState, action) => {
  switch(action.type) {
    case 'Buy_Laptop': return {
      ...state,
      numberOfLaptop: state.numberOfLaptop-1
    }

    case 'Buy_Camera' : return {
      ...state,
      numberOfCamera: state.numberOfCamera-2
    }

    default: return state;
  }
}

//calling a store
const store = createStore(Reducer);
console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(() => console.log('Updated state Value', store.getState()));
store.dispatch(buyLaptop());
store.dispatch(buyLaptop());
store.dispatch(buyLaptop());
store.dispatch(buyCamera());
store.dispatch(buyCamera());
store.dispatch(buyCamera());
unsubscribe();