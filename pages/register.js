import React from "react"
import Head from 'next/head'
import RegisterForm from "../components/auth/RegisterForm"

function register() {
  return (
    <>
    <Head>
      <title>Register on pTracker</title>
    </Head>
      <RegisterForm />
    </>
  )
}

export default register
