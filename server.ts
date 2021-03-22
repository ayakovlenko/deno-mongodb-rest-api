import { Application, Router } from "./deps_oak.ts";
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "./routes.ts";

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "welcome";
  })
  .get("/notes", getNotes)
  .get("/notes/:id", getNote)
  .post("/notes", createNote)
  .put("/notes/:id", updateNote)
  .delete("/notes/:id", deleteNote);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ hostname: "0.0.0.0", port: 8080 });
