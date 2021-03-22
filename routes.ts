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

const updateNote = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const body = ctx.request.body();
  if (body.type === "json") {
    const note = <Note> await body.value;
    const { modifiedCount } = await notesCollection.updateOne({
      _id: new Bson.ObjectId(id),
    }, {
      $set: {
        ...note,
      },
    });

    if (!modifiedCount) {
      ctx.response.status = 404;
      ctx.response.body = { message: "note does not exist" };
      return;
    }
    // deno-lint-ignore no-explicit-any
    const _note: any = await notesCollection.findOne({
      _id: new Bson.ObjectId(id),
    });
    ctx.response.body = _note;
  } else {
    ctx.response.status = 400;
  }
};

const deleteNote = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const deleteCount = await notesCollection.deleteOne({
    _id: new Bson.ObjectId(id),
  });
  if (!deleteCount) {
    ctx.response.status = 404;
    ctx.response.body = { message: "note does not exist" };
    return;
  }
  ctx.response.status = 204;
};

export { createNote, deleteNote, getNote, getNotes, updateNote };
