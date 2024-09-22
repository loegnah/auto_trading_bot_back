import { logger } from "@chneau/elysia-logger";
import swagger from "@elysiajs/swagger";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Elysia } from "elysia";
import { discordPlugin } from "@/discord/discord.plugin";
import { bybitPlugin } from "@/trade/bybit/bybit.plugin.ts";
import { userPlugin } from "@/user/user.plugin";

dayjs.extend(utc);
dayjs.extend(timezone);

new Elysia()
  .use(logger())
  .use(
    swagger({
      documentation: {
        openapi: "3.1.0",
      },
    }),
  )
  .use(userPlugin)
  .use(bybitPlugin)
  .use(discordPlugin)
  .listen(3000);
