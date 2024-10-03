import { Elysia } from "elysia";
import { DiscordService } from "./discord.service";

export const discordPlugin = new Elysia({ prefix: "/discord" })
  .decorate({
    DiscordService: new DiscordService(),
  })
  .get("/try/send-msg", async ({ DiscordService }) => {
    await DiscordService.sendMsgToChannel("1273582260188348476", "Hello World");
    return { message: "Done" };
  });
