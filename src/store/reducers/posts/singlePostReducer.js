const initState = {
    post:{},
}

export const singlePostReducer = (state=initState,action) => {
    if(action.type==='singlePostLoadAction'){
        return{
            ...state,
            post:action.post
        }
    }
    else if(action.type==='updatePostAction'){
        return{
            ...state,
            post:action.post,
        }
    }
    else if(action.type==='deletePostAction'){
        return{
            ...state,
            post:action.post,
        }
    }
    else return {...state};
}

export default singlePostReducer;