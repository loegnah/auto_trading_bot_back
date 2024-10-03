import { Elysia } from "elysia";
import { DiscordService } from "./discord.service";

export const discordPlugin = new Elysia({ prefix: "/discord" }).decorate({
  DiscordService: new DiscordService(),
});
