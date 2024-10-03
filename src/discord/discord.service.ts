import chalk from "chalk";
import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";
import {
  Client,
  Events,
  GatewayIntentBits,
  Interaction,
  REST,
  RESTPutAPIApplicationCommandsResult,
  Routes,
} from "discord.js";
import { env } from "../common/env";
import { discordCommands } from "./discordCommands";

export class DiscordService {
  private discordREST = new REST().setToken(env.DISCORD_TOKEN);
  private client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  constructor() {
    this.init();
  }

  async init() {
    this.addEventListeners();
    await this.client.login(env.DISCORD_TOKEN);
    if (env.DISCORD_RESET_COMMANDS) {
      await this.registerCommands();
    }
  }

  async registerCommands() {
    const builders = Object.values(discordCommands).map(({ builder }) =>
      builder.toJSON(),
    );
    const ret = (await this.discordREST.put(
      Routes.applicationCommands(env.DISCORD_APP_ID),
      { body: builders },
    )) as RESTPutAPIApplicationCommandsResult;

    const originalCommands = Object.keys(discordCommands);
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

  async addEventListeners() {
    this.client.once(Events.ClientReady, (readyClient) => {
      console.log(chalk.cyan(`[Discord] Connected as ${readyClient.user.tag}`));
    });
    this.client.on(Events.InteractionCreate, this.handleInteraction);
  }

  async handleInteraction(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;
    console.log(
      chalk.green.underline(
        `[Discord] Interaction: ${interaction.commandName}`,
      ),
    );
    await discordCommands[interaction.commandName].handler(interaction);
  }
}
