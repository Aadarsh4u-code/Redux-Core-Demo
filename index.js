// import {redux} from 'redux'; //redux is imported
const redux = require('redux');

const createStore = redux.createStore; //store is created

const Buy_Laptop = 'Buy_Laptop'; // action type is define

 //initial state of app is define
const initialState = {
  numberOfLaptop : 15
}

// const action = {
//   type: Buy_Laptop,
//   payload: 'My first redux app'
// }


//action function is define where action is returned
function buyLaptop() {
  // return action; // or we can also write like given below
  return {
      type: Buy_Laptop,
      payload: 'My first redux app'
    }
}

//reducer work is to take (prevState, action) => newState 
const Reducer = (state=initialState, action) => {
  switch(action.type) {
    case 'Buy_Laptop': return {
      ...state,
      numberOfLaptop: state.numberOfLaptop-1
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
unsubscribe();