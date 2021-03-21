import { Application, Router, RouterContext } from "./deps_oak.ts";
import { getNotes } from "./routes.ts";

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "welcome";
  })
  .get("/notes", getNotes)
  .get("/notes/:id", (ctx: RouterContext) => {
    ctx.response.body = "get single node";
  })
  .post("/notes", (ctx: RouterContext) => {
    ctx.response.body = "create note";
  })
  .put("/notes/:id", (ctx: RouterContext) => {
    ctx.response.body = "update single node";
  })
  .delete("/notes/:id", (ctx: RouterContext) => {
    ctx.response.body = "delete single node";
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ hostname: "0.0.0.0", port: 8080 });
