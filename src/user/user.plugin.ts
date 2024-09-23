import { Elysia, t } from "elysia";
import { db } from "../db";
import { userTable } from "../schema/userSchema";

export const userPlugin = new Elysia({ prefix: "/user", name: "user" }).post(
  "/create",
  async ({ body }) => {
    const newUser = await db
      .insert(userTable)
      .values({
        email: body.email,
        password: body.password,
      })
      .returning();
    return newUser;
  },
  {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  },
);
