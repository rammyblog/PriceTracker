import React from "react"
import Head from 'next/head'
import LoginForm from "../components/auth/Login"

function login() {
  return (
    <div>
    <Head>
    <title>Login to pTracker</title>
    </Head>
      <LoginForm />
    </div>
  )
}

export default login
