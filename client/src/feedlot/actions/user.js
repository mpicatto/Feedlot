import axios from 'axios';
import {useHistory} from 'react-router-dom';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const SET_USER = 'SET_USER';
export const CLEAN_USER = 'CLEAN_USER'
// const instance = axios.create({
//     withCredentials: true
//   })

//CREAR USUARIO


export function addUser(data){
    return function (dispatch){
        console.log(data)
         axios.post ("http://localhost:3001/user",data)
        .then(resp=>{
            dispatch({type: ADD_USER, payload: resp.data})
            alert("Usuario creado.")
        })
        .then(useHistory.push("/"))
        .catch(err=>{
            alert(err);
        })
        
    }
}

export function setUser (user){
    console.log(user);
    return {type:SET_USER, payload:user}
}


//MODIFICAR DATOS DE MI USUARIO

export function updateUser(data){
    return function (dispatch){
        console.log(data)
        return axios.put(`http://localhost:3001/user/settings/${data.id}`, data)
        .then(res => {
            dispatch({type: UPDATE_USER, payload: res.data})
            alert("Datos Actualizados correctamente")
        })
        .catch(err =>{
            alert(err)
        })
    }
}

// RECUPERAR PASSWORD, RECIBE MAIL USER PARA RECUPERAR PASSWORD
export function ForgotPass(data){
    let email = data.email; 
    return function (dispatch){
        console.log(data)
        return axios({
            method: "POST",
            url: `http://localhost:3001/email/send-email/forgotPassword/${data.email}`, 
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email
            }
    })
        .then(res => {
            dispatch({type: RESET_PASSWORD, payload: res.data})
            alert("Datos Actualizados correctamente")
        })
        .catch(err =>{
            alert(err)
        })
    }
}

export function cleanUser(){
    return{type:CLEAN_USER}
} 