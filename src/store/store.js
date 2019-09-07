import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from '../reducers'
import rootSaga from '../sagas'

// create saga middleware
const sagaMiddleware = createSagaMiddleware({
    onError: err => {
        // eslint-disable-next-line no-console
        console.error(err)
    },
})

// create redux store
const store = createStore(
    rootReducer,
    {},
    composeWithDevTools({
        // Options: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#options
    })(applyMiddleware(sagaMiddleware))
)

if (module.hot) {
    module.hot.accept(() => {
        // eslint-disable-next-line global-require
        store.replaceReducer(require('../reducers').default)
    })
}

// run redux sagas
sagaMiddleware.run(rootSaga)

export default store
