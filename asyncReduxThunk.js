const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

//1.initial state of redux app
const initialState = {
  loading: false,
  user: [],
  error: ''
}

//2.define action type
const USER_REQUEST = 'USER_REQUEST';
const USER_SUCCESS = 'USER_SUCCESS';
const USER_ERROR = 'USER_ERROR';

//3.defined  action function
const userRequest = () => {
  return {
    type: USER_REQUEST,
    payload: '1st action'
  }
}

const userSuccess = (users) => {
  return {
    type: USER_SUCCESS,
    payload: users
  }
}

const userError = (error) => {
  return {
    type: USER_ERROR,
    payload: error
  }
}

// 4.define Reducer

const reducer = (state = initialState, action) => {
  switch(action.type) {

    case 'USER_REQUEST': return {
      ...state, loading: true
    }

    case 'USER_SUCCESS': return {
      loading: false, user: action.payload, error: ''
    }

    case 'USER_ERROR' : return {
      loading: false, user: [], error: action.payload
    }
  }
}

// 8.Here we will pass action async
const fetchUser = () => {
  return function(dispatch) {
    dispatch(userRequest())
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      //response.data we get form api
      const users = response.data.map(user => user.name)
      dispatch(userSuccess(users))
    })
    .catch(error => {
      //error.message we get from api
      dispatch(userError(error.message))

    })
  }

};


//5.passing data to store through reducer and middleware
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

//6. subscribe to store we will get 1st state value here
store.subscribe(()=>{console.log(store.getState())});

//7. dispatch action creator=> we will not call any action function from no.3 bcoz they will call async.
store.dispatch(fetchUser());
unsubscribe();