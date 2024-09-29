import { logger } from "@chneau/elysia-logger";
import swagger from "@elysiajs/swagger";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Elysia } from "elysia";
import { env } from "./common/env";
import { dev } from "./dev";
import { discordPlugin } from "./discord/discord.plugin";
import { tradePlugin } from "./trade/trade.plugin";
import { userPlugin } from "./user/user.plugin";

dayjs.extend(utc);
dayjs.extend(timezone);

if (env.IS_DEV) {
  dev();
}

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
  .use(tradePlugin)
  .use(discordPlugin)
  .listen(3000);
