const { configureStore } = require('@reduxjs/toolkit');
const {logger} = require('redux-logger');
const postReducer = require('../features/post/postSlice');

// store configuration
const store = configureStore({
    reducer: {
        post: postReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;
