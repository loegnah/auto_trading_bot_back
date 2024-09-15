import { logger } from "@chneau/elysia-logger";
import swagger from "@elysiajs/swagger";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Elysia } from "elysia";
import { coinPlugin } from "@/coin/coin.plugin";
import { discordPlugin } from "@/discord/discord.plugin";

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
  .use(coinPlugin)
  .use(discordPlugin)
  .listen(3000);
