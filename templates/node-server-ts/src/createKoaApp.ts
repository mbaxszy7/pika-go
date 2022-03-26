import "reflect-metadata"

import Koa, { Request } from "koa"
import koaLogger from "koa-logger"
import koaJson from "koa-json"
import koaBody from "koa-body"

import koaCors from "./utils/cors"
import * as routes from "./routes"
// import homework from "./routes/homework";

const port = parseInt(process.env.PORT!, 10) || 3001

interface CreateKoaApp {
  corsOrigin: (ctx: Request) => string
}

const createKoaApp = ({ corsOrigin }: CreateKoaApp) => {
  const server = new Koa()

  server.use(koaBody({ multipart: true }))

  // https://github.com/koajs/cors
  server.use(
    koaCors({
      credentials: true,
      origin: corsOrigin,
    }),
  )
  server.use(koaLogger())
  server.use(koaJson())

  // server.use(homework.routes());
  // server.use(homework.allowedMethods());

  Object.keys(routes).forEach((route) => {
    const router = routes[route as keyof typeof routes].default
    router.prefix("/api")
    server.use(router.routes())
    server.use(router.allowedMethods())
  })

  server.on("error", (error) => {
    console.log("server error--------------", error)
  })

  return { app: server, port }
}

export default createKoaApp
