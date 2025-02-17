"use client"
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import React, { useEffect} from "react";
import './dashboard.scss'

export default function Page() {
    const {user, checkUser, logout} = useAuth()
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push("/")
        }
        if(token) {
            checkUser(token)
        }
    }, [router, checkUser])
    const logOutHandler = () => {
        logout()
        router.push('/')
    }
    return (
        <div className="content-dashboard">
            <div className="container-user-cart">
                {user && (
                    <div>
                        <div className="title-container">
                            <h1 className="h1">{user.full_name}</h1>
                        </div>
                        <div className="container-info-user">
                            <p>Email: {user.email}</p>
                        </div>
                        <div className="container-btn">
                            <button onClick={logOutHandler}><span>Log Out</span></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
