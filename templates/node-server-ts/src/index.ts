import { Request } from "koa"
import createKoaApp from "./createKoaApp"

const corsOrigin = (ctx: Request) => {
  if (
    [
      "http://localhost:3000/",
      "http://192.168.31.74:3000/",
      "https://pptail.life/",
      "https://www.pptail.life/",
    ].includes(ctx.headers.referer as string)
  )
    return ctx.headers.referer?.substr(
      0,
      ctx.headers.referer.length - 1,
    ) as string
  return "https://studio.apollographql.com"
}

const { app, port } = createKoaApp({ corsOrigin })
app.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`)
})
