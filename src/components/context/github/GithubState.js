import React,{useReducer} from 'react'
import axios from 'axios'
import GithubReducer from './githubReducer'
import GithubContext from './githubContext'
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from './types'

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !=='production'){
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
}else{
    githubClientId = process.env.GITHUB_CLIENT_ID
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET

}

const GithubState = props =>{
    const initialState = {
        users:[],
        user:{},
        repos:[],
        loading:false
    };

    const [state, dispatch]  = useReducer(GithubReducer,initialState);
    const searchUsers = async name =>{
        setLoading()
        const res = await axios.get(`https://api.github.com/search/users?q=${name}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
        
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    
      }
    const getUser = async (username)=>{
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`)
        
        dispatch({
            type:GET_USER,
            payload:res.data
        })
        
    }
    const getUserRepos = async (username)=>{
        setLoading(true)
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
        
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
        
      }
      
    const setLoading = () => dispatch({type:SET_LOADING})
    const clearUsers = ()=> dispatch({type:CLEAR_USERS})
    return <GithubContext.Provider
        value={{
            users: state.users,
            user:state.user,
            repos:state.repos,
            loading:state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
        >
        {props.children}
    </GithubContext.Provider>

}
export default GithubState;