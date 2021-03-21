import { RouterContext } from "./deps_oak.ts";

const getNotes = (ctx: RouterContext) => {
  ctx.response.body = "get me some notes";
};

export { getNotes };
