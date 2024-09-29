import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";
import { REST, RESTPutAPIApplicationCommandsResult, Routes } from "discord.js";
import { env } from "../common/env";
import { discordCommands } from "./discordCommands";

export class DiscordService {
  private discordREST = new REST().setToken(env.DISCORD_TOKEN);

  constructor() {
    if (env.DISCORD_RESET_COMMANDS) {
      this.registerCommands();
    }
  }

  async registerCommands() {
    const builders = discordCommands.map(({ builder }) => builder.toJSON());
    const ret = (await this.discordREST.put(
      Routes.applicationCommands(env.DISCORD_APP_ID),
      { body: builders },
    )) as RESTPutAPIApplicationCommandsResult;

    const originalCommands = discordCommands.map(({ name }) => name);
    const doneCommands = ret.map(({ name }) => name);
    const failedCommands = originalCommands.filter(
      (command) => !doneCommands.includes(command),
    );

    console.log(
      `[discord] Registered Commands. (origin: ${originalCommands.length} / done: ${doneCommands.length} / failed: ${failedCommands.length})`,
    );
    if (failedCommands.length > 0) {
      console.warn(`Failed commands: ${failedCommands.join(", ")}`);
    }
  }

  async verify({ headers, body }: { headers: any; body: any }) {
    const signature = headers["x-signature-ed25519"] || "";
    const timestamp = headers["x-signature-timestamp"] || "";
    return await verifyKey(
      JSON.stringify(body),
      signature,
      timestamp,
      env.DISCORD_PUBLIC_KEY,
    );
  }

  interaction(body: any) {
    const { type } = body;
    if (type === InteractionType.PING) {
      return this.handlePingPong();
    }
    if (type === InteractionType.APPLICATION_COMMAND) {
      return this.handleApplicationCommand(body);
    }
  }

  private handlePingPong() {
    return { type: InteractionResponseType.PONG };
  }

  private handleApplicationCommand(body: any) {
    console.log(body.data);
    return { msg: "ok" };
  }
}
