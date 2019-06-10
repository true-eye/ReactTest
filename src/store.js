import { compose, createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import rootReducer from "./reducers/index";
import createSagaMiddleware, { END } from "redux-saga";
import rootSaga from "./sagas/index";

// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();

// const persistConfig = {
//   key: `root`,
//   storage: storage
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer());

const configureStore = (initialState = {}) => {
  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false
        })
      : compose;

  const middlewares = [sagaMiddleware, promise];
  const enhancers = [applyMiddleware(...middlewares)];

  let store = createStore(
    rootReducer(),
    initialState,
    composeEnhancers(...enhancers)
  );
  // let persistor = persistStore(store);
  store.runSaga = sagaMiddleware.run;
  store.runSaga(rootSaga);

  store.asyncReducers = {};
  store.close = () => store.dispatch(END);

  if (module.hot) {
    module.hot.accept("./reducers", reducerModule => {
      const createReducers = reducerModule.default;
      const nextReducers = createReducers(store.asyncReducers);
      store.replaceReducer(nextReducers);
    });
  }

  return store;
};

export default configureStore;
