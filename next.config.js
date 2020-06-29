// const fs = require("fs")
// const path = require("path")
// const lessToJS = require("less-vars-to-js")
// const withLess = require("@zeit/next-less")
// const withSass = require("@zeit/next-sass")
// const withCSS = require("@zeit/next-css")
// const withPlugins = require("next-compose-plugins")
// // './assets/antd-custom.less' เปลี่ยนเป็นตำแหน่งไฟล์ theme ที่ปรับแต่่งตามต้องการ
// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, "./assets/antd-custom.less"), "utf8")
// )
// const nextConfig = {}
// // plugins เรียงลำดับตามนี้ครับ
// const plugins = [
//   withCSS,
//   withLess({
//     lessLoaderOptions: {
//       javascriptEnabled: true,
//       modifyVars: themeVariables,
//     },
//     env: {
//       API_BASE_URL: process.env.API_BASE_URL,
//     },
//     webpack: (config, { isServer }) => {
//       if (isServer) {
//         const antStyles = /antd\/.*?\/style.*?/
//         const origExternals = [...config.externals]
//         config.externals = [
//           (context, request, callback) => {
//             if (request.match(antStyles)) return callback()
//             if (typeof origExternals[0] === "function") {
//               origExternals[0](context, request, callback)
//             } else {
//               callback()
//             }
//           },
//           ...(typeof origExternals[0] === "function" ? [] : origExternals),
//         ]
//         config.module.rules.unshift({
//           test: antStyles,
//           use: "null-loader",
//         })
//       }
//       return config
//     },
//   }),
//   withSass,
// ]
// module.exports = withPlugins(plugins, nextConfig)

const withLess = require("@zeit/next-less")
// const lessToJS = require('less-vars-to-js');
const fs = require("fs")
const path = require("path")

// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, './assets/antd.less'), 'utf8')
// );

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    // modifyVars: themeVariables,
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader",
      })
    }

    const builtInLoader = config.module.rules.find((rule) => {
      if (rule.oneOf) {
        return (
          rule.oneOf.find((deepRule) => {
            if (deepRule.test && deepRule.test.toString().includes("/a^/")) {
              return true
            }
            return false
          }) !== undefined
        )
      }
      return false
    })

    if (typeof builtInLoader !== "undefined") {
      config.module.rules.push({
        oneOf: [
          ...builtInLoader.oneOf.filter((rule) => {
            return (rule.test && rule.test.toString().includes("/a^/")) !== true
          }),
        ],
      })
    }

    config.resolve.alias["@"] = path.resolve(__dirname)
    return config
  },
})
