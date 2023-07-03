const initState = {
    searchString:"",
    posts:[],
    orderBy:"created",
    page:1,
    err:"",
    activePage:1,
    postsNumber:10 // per page
}


export const listPostsReducer = (state=initState,action) => {
    if(action.type==='initialPostLoadAction'){
        return{
            ...state,
            posts:action.posts,
            activePage:action.activePage,
            postsNumber:action.postsNumber
        }
    }
    else if(action.type==='searchPostAction'){
        return{
            ...state,
            posts:action.posts,
            searchString:action.searchString,
            activePage:action.activePage,
            orderBy:action.orderBy,
            postsNumber: action.postsNumber,
        }
    }
    else if(action.type==='changeOrder'){
        return{
            ...state,
            orderBy:action.orderBy,
        }
    }
    else if(action.type==='initialPostLoadErrorAction'){
        return{
            ...state,
            err:action.err
        }
    }
    else return {...state};
}

export default listPostsReducer;