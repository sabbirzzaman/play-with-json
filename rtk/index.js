const store = require('./app/store');
const { fetchPost } = require('./features/post/postSlice');


// dispatch action
store.dispatch(fetchPost());
