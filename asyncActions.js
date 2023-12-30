const redux=require('redux')
const createStore=redux.createStore
const applyMiddleware=redux.applyMiddleware
const reduxThunk=require('redux-thunk')
const thunkMiddleWare=reduxThunk.default
const bindActionCreators=redux.bindActionCreators
const initialState={
    loading:false,
    users:[],
    error:''
}

const FETCH_USERS_REQUESTED='FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED='FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED='FETCH_USERS_FAILED'

const fetchUsersRequested=()=>{
    return {
        type:FETCH_USERS_REQUESTED
    }
}

const fetchUsersSuccess=(users)=>{
    return {
        type:FETCH_USERS_SUCCEEDED,
        payload:users
    }
}

const usersFetchFailure=(error)=>{
    return {
        type:FETCH_USERS_FAILED,
        payload:error
    }
}

const reducer=(state=initialState,action)=>{
switch(action.type){
    case FETCH_USERS_REQUESTED:
        return {
            ...state,
            loading:true
        }
    case FETCH_USERS_SUCCEEDED:
        return {
            ...state,
            loading:false,
            users:action.payload
        }
    case FETCH_USERS_FAILED:
        return {
            ...state,
            loading:false,
            error:action.payload
        }        
    default:return state    
}

}
const fetchUsers=()=>{
    return (dispatch)=>{
        dispatch(fetchUsersRequested())
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>response.json())
        .then(json=>dispatch(fetchUsersSuccess(json)))
        .catch(error=>dispatch(usersFetchFailure(error)))
    }
}

const store=createStore(reducer,applyMiddleware(thunkMiddleWare))

store.subscribe(()=>console.log(store.getState()))
store.dispatch(fetchUsers())

