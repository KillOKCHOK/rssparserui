
import axios from 'axios';

let domain = "localhost:4000";
  
  export const initialPostLoad = ()=>{
    return async(dispatch)=>{
        axios
        .get('http://'+domain+'/posts')
        .then(async response => {
          await dispatch(
                {
                    type:"initialPostLoadAction", 
                    posts: response.data.posts,
                    postsNumber: response.data.numOfRows,
                    activePage:response.data.page
                }
            );
        })
        .catch(async err=>{
            await dispatch(
                {
                    type:"initialPostLoadErrorAction", 
                    err:err.data?err.data:"Something went wrong"
                },
            );
        }); 
          
    }
    
}

export const searchPost = (queryParams)=>{
    return async(dispatch, getState)=>{
        let state = getState();
        let title = queryParams.title!==undefined?queryParams.title:state.postsReducer.searchString;
        let page = queryParams.page?queryParams.page:1;
        let orderBy = queryParams.orderBy?queryParams.orderBy:state.postsReducer.orderBy;
        axios
        .get('http://'+domain+`/posts?title=${title}&page=${page}&orderBy=${orderBy}`)
        .then(async response => {
          await dispatch(
                {
                    type:"searchPostAction", 
                    posts: response.data.posts,
                    postsNumber: response.data.numOfRows,
                    activePage: response.data.page,
                    searchString: title,
                    orderBy: orderBy
                }
            );
        })
        .catch(async err=>{
            await dispatch(
                {
                    type:"initialPostLoadErrorAction", 
                    err:err.data?err.data:"Something went wrong"
                },
            );
        }); 
          
    }
    
}
export const createNewPost = (queryParams)=>{
    return async(dispatch, getState)=>{
        let state = getState();
        let post = queryParams;
        post.description = `
        <img class="type:primaryImage" src="${queryParams.img}" /><p>${queryParams.description}…</p><p><a href="${queryParams.link}" target="_blank" >Read more...</a></p>
        `
        await axios.post('http://'+domain+`/posts`, post)
        await axios.get('http://'+domain+`/posts`).then(async response => {
            await dispatch(
                  {
                      type:"searchPostAction", 
                      posts: response.data.posts,
                      postsNumber: response.data.numOfRows,
                      activePage: response.data.page,
                      searchString: state.searchString,
                      orderBy: state.orderBy
                  }
              );
          })
          .catch(async err=>{
              await dispatch(
                  {
                      type:"initialPostLoadErrorAction", 
                      err:err.data?err.data:"Something went wrong"
                  },
              );
          }); 
        
    }
    
}

export const changeOrder = (val) => {
    return {
        type:'changeOrder',
        orderBy:val
    }
}
export const setModalShow = (val) => {
    return {
        type:'setloginModalShow',
        modalShow:val
    }
}
