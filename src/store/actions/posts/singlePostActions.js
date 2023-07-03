import axios from 'axios';
import { getCookie} from '../../tools/cookieManagementTools';
let sessionCookie = getCookie("sessionCookie");
if(sessionCookie)axios.defaults.headers.common['Authorization'] = `Bearer_${sessionCookie}`;
let domain = "localhost:4000";
  
export const initialPostLoad = (id)=>{
    return async(dispatch)=>{
        axios
        .get('http://'+domain+'/posts/'+id)
        .then(async response => {
          await dispatch(
                {
                    type:"singlePostLoadAction", 
                    post: response.data[0],
                }
            );
        })
        .catch(async err=>{
            let post = {title:"Something went wrong"}
            await dispatch(
                {
                    type:"initialPostLoadErrorAction", 
                    post:post
                },
            );
        });    
    }
}

export const singlePostDelete = (id)=>{
    return async(dispatch)=>{
        axios
        .delete('http://'+domain+'/posts/'+id)
        .then(async response => {
          await dispatch(
                {
                    type:"deletePostAction", 
                    post: {title: "Post Deleted Successfuly"},
                }
            );
        })
        .catch(async err=>{
            let post = {title:"Something went wrong"}
            await dispatch(
                {
                    type:"deletePostAction", 
                    post:post
                },
            );
        });    
    }
}

export const updatePost = (queryParams)=>{
    return async(dispatch, getState)=>{
        let post = queryParams;
        await axios.put('http://'+domain+`/posts`, post)
        .then(async response => {
            await dispatch(
                  {
                      type:"updatePostAction", 
                      post:post
                  }
              );
          })
          .catch(async err=>{
              await dispatch(
                  {
                      type:"updatePostAction", 
                      post:{title:"Something went wrong"}
                  },
              );
          }); 
        
    }
    
}

