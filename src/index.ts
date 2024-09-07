import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Hono } from "hono";
import { coinRoute } from "@/coin/coinRoute";
import { discordRoute } from "@/discord/discord.route";

dayjs.extend(utc);

function runApp() {
  const app = new Hono();

  app.route("/discord", discordRoute);
  app.route("/coin", coinRoute);

  return app;
}

export default runApp();
