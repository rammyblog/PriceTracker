import React from "react"
import App from "next/app"

// import ErrorPage from "./_error"

import Router from "next/router"
import Head from "next/head"
// import NProgress from "nprogress"
// import Footer from "../components/presentational/Footer"

// Router.events.on("routeChangeStart", (url) => {
//   NProgress.start()
// })
// Router.events.on("routeChangeComplete", () => NProgress.done())
// Router.events.on("routeChangeError", () => NProgress.done())
import "bootstrap/dist/css/bootstrap.min.css"

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"

class MyApp extends App {
  //   componentDidMount() {
  //     this.props.store.dispatch(authCheckState())
  //   }

  // componentDidUpdate(prevProps, props) {
  //   console.log(this.props.isAuthenticated, "fjfjfj")

  //   if (!this.props.isAuthenticated) {
  //     Router.push("/login")
  //     // prevProps.store.dispatch(logout())
  //   }
  // }

  render() {
    const { Component, pageProps } = this.props
    const errorText =
      "Sorry, Something unexpected happened and reload this page"

    return <Component {...pageProps} />
  }
}

export default MyApp
