import KoaRouter, { RouterContext } from "@koa/router"
import { Next } from "koa"

const router = new KoaRouter()

router.get(
  "/foo",
  (ctx: RouterContext, next: Next) => {
    console.log(ctx)
    next()
  },
  (ctx: RouterContext) => {
    ctx.body = {
      data: "bar",
    }
  },
)

export default router
