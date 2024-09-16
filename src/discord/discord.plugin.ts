import { Elysia } from "elysia";
import { DiscordService } from "@/discord/discord.service";

export const discordPlugin = new Elysia({ prefix: "/discord" })
  .decorate({
    DiscordService: new DiscordService(),
  })
  .post(
    "/interactions",
    async ({ DiscordService, body }) => {
      return DiscordService.interaction(body);
    },
    {
      beforeHandle: async ({ DiscordService, headers, body, error }) => {
        const isValid = await DiscordService.verify({ headers, body });
        return isValid ? undefined : error(401);
      },
    },
  );
