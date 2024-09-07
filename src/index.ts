import { Hono } from "hono";
import { coinRoute } from "@/coin/coinRoute";
import { discordRoute } from "@/discord/discord.route";

function runApp() {
  const app = new Hono();

  app.route("/discord", discordRoute);
  app.route("/coin", coinRoute);

  return app;
}

export default runApp();
