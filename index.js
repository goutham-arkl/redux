const redux=require('redux')
const createStore=redux.createStore
const bindActionCreator=redux.bindActionCreators
const combineReducers=redux.combineReducers
const reduxLogger=require('redux-logger')
const applyMiddleWare=redux.applyMiddleware
const logger =reduxLogger.createLogger()

//Actions
const CAKE_ORDERED = "CAKE_ORDERED";
const ADD_CAKE = 'ADD_CAKE';
const ICECREAM_ORDERED ="ICECREAM_ORDERED"
const ADD_ICECREAM="ADD_ICECREAM" 

//Action Creators
function orderCake(qty = 1) {
    return {
        type: CAKE_ORDERED,
        payload: qty
    };
}

function addCake(qty){
    return{
        type:ADD_CAKE,
        payload:qty
    }
}

function orderIceCream(qty=1){
    return{
        type:ICECREAM_ORDERED,
        payload:qty
    }
}

function addIceCream(qty=1){
    return{
        type:ADD_ICECREAM,
        payload:qty
    }
}

//Reducers
const initialCakeState = {
    numberOfCakes: 10,
};

const initialIceCreamState={
    numberOfIcecreams:20
}

const cakeReducer=(state=initialCakeState,action)=>{
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numberOfCakes:state.numberOfCakes-1
            }
        case ADD_CAKE:
            return{
                ...state,
                numberOfCakes:state.numberOfCakes+action.payload
            }     
        default :return state    

    }
}

const iceCreamReducer=(state=initialIceCreamState,action)=>{
    switch(action.type){
        case ICECREAM_ORDERED :
            return{
                ...state,
                numberOfIcecreams:state.numberOfIcecreams - action.payload
            }

        case ADD_ICECREAM :
            return {
                ...state,
                numberOfIcecreams:state.numberOfIcecreams + action.payload
            }
        default :return state        
    }
}
const rootReducer=combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})
const store=createStore(rootReducer,applyMiddleWare(logger))
// store.subscribe(()=>console.log('updated State',store.getState()))
const unSubscribe=store.subscribe(()=>{})
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(addCake(90))
const actions=bindActionCreator({orderCake,addCake,orderIceCream,addIceCream},store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.addCake(20)
actions.addCake(50)
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.addIceCream()

unSubscribe()
