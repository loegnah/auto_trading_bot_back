import { InteractionResponseType } from "discord-interactions";
import { Elysia } from "elysia";
import { discordVerifier } from "@/discord/discord.middle";

export const discordPlugin = new Elysia({ prefix: "/discord" })
  .use(discordVerifier)
  .post("/interactions", async () => {
    return { type: InteractionResponseType.PONG };
  });
