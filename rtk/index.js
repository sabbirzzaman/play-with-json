const store = require('./app/store');
const { fetchPost } = require('./features/post/postSlice');

const url = 'https://jsonplaceholder.typicode.com'

// dispatch action
store.dispatch(fetchPost(url));
