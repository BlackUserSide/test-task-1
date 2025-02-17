"use client"
import React, {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from 'next/navigation'

export default function Main() {
    const router = useRouter()
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const {login, checkUser} = useAuth()
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserData(userData => ({...userData, [event.target.name]: event.target.value}))
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token && checkUser(token)) {
            router.push('/dashboard')

        }
    }, [checkUser, router])
    const submitHandler = () => {
        const user = login(userData)
        if (!user) {
            return
        }
        router.push('/dashboard')
    }
    return (

        <div className="main-login-container">
            <div className="form-auth-contianer">
                <div className="main-title">
                    <h1 className="h1">Login</h1>
                </div>
                <div className="input-container">
                    <input type="text" name="email" className="main-input" value={userData.email} placeholder="Email"
                           onChange={changeHandler}/>
                </div>
                <div className="input-container">
                    <input type="text" name="password" className="main-input" value={userData.password}
                           placeholder="Password" onChange={changeHandler}/>
                </div>
                <div className="container-btn">
                    <button onClick={submitHandler}><span>Submit</span></button>
                </div>
            </div>
        </div>
    );
}
