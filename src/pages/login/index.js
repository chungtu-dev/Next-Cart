"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

const index = () => {

    const [user, setUser] = useState('zxc')
    const [password, setPassword] = useState('936322')

    const router = useRouter()

    useEffect(() => {
        sessionStorage.clear()
    }, [])

    const checkLogin = async () => {
        return await axios.get(`http://localhost:4000/user?ID=${password}&?NAME="${user}"`)
            .then((response) => {
                const arrInfo = Object.assign(true, ...response.data)
                if (password === arrInfo.ID) {
                    const data = response.data.shift();
                    console.log('success', data);
                    const userLogin = {
                        user: user,
                        password: password,
                        admin: data.ADMIN,
                        img: data.IMG
                    }
                    sessionStorage.setItem('user', userLogin.user)
                    sessionStorage.setItem('password', userLogin.password)
                    sessionStorage.setItem('admin', userLogin.admin)
                    sessionStorage.setItem('img', userLogin.img)
                    router.push('/profile')
                } else if (password !== arrInfo.ID) {
                    console.log('error');
                } else {
                    console.log('nothing');
                    return
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <input type="text" name="user" value={user} onChange={(e) => setUser(e.target.value)} />
            <input type="number" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={() => checkLogin()}>Check login</button>
        </>
    )
}

export default index