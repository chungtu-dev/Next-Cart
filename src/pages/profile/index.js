import React, { useEffect, useState } from 'react'

const index = () => {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [admin, setAdmin] = useState("")
  const [img, setImg] = useState("")

  const reqInfo = () => {
    setUser(sessionStorage.getItem("user"))
    setPassword(sessionStorage.getItem("password"))
    setAdmin(sessionStorage.getItem("admin"))
    setImg(sessionStorage.getItem("img"))
  }

  useEffect(() => {
    reqInfo()
  }, [])

  return (
    <>
      <div>
        <h3>Xin chào: {user} - {
          admin && admin === "true" ? "admin" : "staff"
        }</h3>
        <h5>pass: {password}</h5>
        <img src={img} alt="" style={{ width: "auto", height: "300px" }} />
      </div>
    </>
  )
}

export default index