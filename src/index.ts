import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Hono } from "hono";
import { connectBybitWs } from "@/coin/bybit/bybitWs";
import { coinRoute } from "@/coin/coinRoute";
import { discordRoute } from "@/discord/discord.route";

dayjs.extend(utc);
dayjs.extend(timezone);

async function runApp() {
  const app = new Hono();

  await connectBybitWs();

  app.route("/discord", discordRoute);
  app.route("/coin", coinRoute);

  return app;
}

export default await runApp();
