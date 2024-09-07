import { Hono } from "hono";
import { discordRoute } from "@/discord/discord.route";

function runApp() {
  const app = new Hono();

  app.route("/discord", discordRoute);
  return app;
}

export default runApp();
