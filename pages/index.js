import { useEffect } from "react"
import Router from "next/router"
import Navbar from "../components/dashboard/NavBar"
import HomeNavbar from "../components/home/HomeNavbar"
import LandingHeader from "../components/home/landingHeader"
import Footer from "../components/home/Footer"
import Head from 'next/head'
const redirectTo = "/dashboard"

const Home = () => {
  // useEffect(() => Router.push(redirectTo))
  // return null
  return (
    <>

    <Head>
      <title>Track product prices from your favourite stores - pTracker</title>
      </Head>

      <HomeNavbar />
      <LandingHeader />
      <Footer />
    </>
  )
}

// Home.getInitialProps = (ctx) => {
//   if (ctx.req) {
//     ctx.res.writeHead(302, { Location: redirectTo })
//     ctx.res.end()
//   }
// }

export default Home
