import { Hono } from "hono";
import { dbRoute } from "@/db/dbRoute";
import { discordRoute } from "@/discord/discord.route";

function runApp() {
  const app = new Hono();

  app.route("/discord", discordRoute);
  app.route("/db", dbRoute);
  return app;
}

export default runApp();
