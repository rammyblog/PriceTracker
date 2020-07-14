import { useEffect } from "react"
import Router from "next/router"
import Navbar from "../components/dashboard/NavBar"
import HomeNavbar from "../components/home/HomeNavbar"
import LandingHeader from "../components/home/landingHeader"

const redirectTo = "/dashboard"

const Home = () => {
  // useEffect(() => Router.push(redirectTo))
  // return null
  return (
    <>
      <HomeNavbar />
      <LandingHeader />
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
