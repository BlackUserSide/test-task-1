"use client"
import {createContext, FC, ReactNode, useState} from "react";
import {UserType} from "@/type/user_type";
import {users} from '@/data/fake_db_user'

interface ContextType {
    user: UserType | null;
    login: (userInfo: userInfo) => UserType | null;
    logout: () => void;
    checkUser: (email: string) => UserType | undefined | null;
}

export type userInfo = {
    email: string,
    password: string,
}
export const AuthContext = createContext<ContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<UserType | null>(null)
    const login = (userInfo: userInfo) => {
        const findUser: UserType | undefined = users.find(e => e.password === userInfo.password && e.email === userInfo.email)
        if (findUser) {
            localStorage.setItem('token', findUser.email)
            setUser(findUser)
            return findUser
        }
        return null
    }
    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
    }
    const checkUser = (email: string) => {
        const findUser = users.find(e => e.email === email)
        if (findUser) {
            setUser(findUser)
            return findUser

        }
        return null
    }

    return (
        <AuthContext.Provider value={{user, login, logout, checkUser}}>
            {children}
        </AuthContext.Provider>
    )
}
