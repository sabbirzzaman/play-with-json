const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const fetch = require('node-fetch');

// initial state
const initialState = {
    isLoading: false,
    post: {},
    relatedPosts: [],
    error: '',
};

// get single post
const fetchPost = createAsyncThunk(
    'post/fetchPost',
    async (userId, thunkAPI) => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const post = await res.json();

        const titleArr = post.title.split(' ').map((title) => '&title_like=' + title);
        const queryString = titleArr.join('').substring(1);
        const url = `https://jsonplaceholder.typicode.com/posts?${queryString}`;

        thunkAPI.dispatch(fetchRecentPost(url));
        return post;
    }
);

const fetchRecentPost = createAsyncThunk(
    'post/fetchRecentPost',
    async (postAPI) => {
        const res = await fetch(postAPI);
        const post = await res.json();

        return post;
    }
);

// reducer
const postReducer = createSlice({
    name: 'post',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPost.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(fetchPost.fulfilled, (state, action) => {
            (state.isLoading = false),
                (state.post = action.payload),
                (state.relatedPosts = []),
                (state.error = '');
        });

        builder.addCase(fetchPost.rejected, (state, action) => {
            (state.isLoading = false),
                (state.post = {}),
                (state.relatedPosts = []),
                (state.error = action.error.message);
        });

        builder.addCase(fetchRecentPost.fulfilled, (state, action) => {
            (state.isLoading = false),
                (state.relatedPosts = action.payload),
                (state.error = '');
        });
    },
});

module.exports = postReducer.reducer;
module.exports.fetchPost = fetchPost;
module.exports.fetchRecentPost = fetchRecentPost;
