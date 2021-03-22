import { RouterContext } from "./deps_oak.ts";
import { Bson } from "./deps_mongo.ts";
import { db } from "./mongo.ts";

// TODO: move
interface Note {
  title: string;
  body: string;
}

// TODO: db.collection<?>
const notesCollection = db.collection("notes");

const getNotes = async (ctx: RouterContext): Promise<void> => {
  const notes = await notesCollection.find();
  ctx.response.body = notes;
};

const getNote = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  // deno-lint-ignore no-explicit-any
  const note: any = await notesCollection.findOne({
    _id: new Bson.ObjectId(id),
  });
  ctx.response.body = note;
};

const createNote = async (ctx: RouterContext): Promise<void> => {
  const body = ctx.request.body();
  if (body.type === "json") {
    const note = <Note> await body.value;
    const id = await notesCollection.insertOne({
      ...note,
      date: new Date(),
    });
    ctx.response.status = 201;
    ctx.response.body = {
      _id: id,
      ...note,
    };
  } else {
    ctx.response.status = 400;
  }
};

export { createNote, getNote, getNotes };
