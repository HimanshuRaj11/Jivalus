"use client"
import { createContext, useState, useContext } from "react"

const GlobalContex = createContext({
    createPostbtn: null,
    setCreatePostBtn: () => null,
    Loginbtn: null,
    setLoginBtn: () => null,
    Registerbtn: null,
    setRegisterBtn: () => null,

})

export const GlobalContextProvider = ({ children }) => {

    const [createPostbtn, setCreatePostBtn] = useState(false)
    const [Loginbtn, setLoginBtn] = useState(false)
    const [Registerbtn, setRegisterBtn] = useState(false)

    return (
        <GlobalContex.Provider value={{ createPostbtn, setCreatePostBtn, Loginbtn, setLoginBtn, Registerbtn, setRegisterBtn }}>
            {children}
        </GlobalContex.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContex)