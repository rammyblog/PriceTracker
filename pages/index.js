import { useEffect } from "react"
import Router from "next/router"

const redirectTo = "/dashboard"

const Home = () => {
  useEffect(() => Router.push(redirectTo))
  return null
}
Home.getInitialProps = (ctx) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: redirectTo })
    ctx.res.end()
  }
}

export default Home
