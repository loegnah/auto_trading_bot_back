import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { delay } from "es-toolkit";

export class DiscordCommand {
  constructor(
    public name: string,
    public builder: any,
    public handler: (
      intAct: ChatInputCommandInteraction<CacheType>,
    ) => Promise<any>,
  ) {}
}

export const discordCommands: {
  [key: string]: DiscordCommand;
} = {
  "command-1": new DiscordCommand(
    "command-1",
    new SlashCommandBuilder()
      .setName("command-1")
      .setDescription("Provides information about the server."),
    async (interaction) => {
      await interaction.reply({
        content: "Pong",
        ephemeral: true,
      });
      await delay(4000);
      await interaction.deleteReply();
    },
  ),
  "command-2": new DiscordCommand(
    "command-2",
    new SlashCommandBuilder()
      .setName("command-2")
      .setDescription("Provides information about the server.")
      .addStringOption((option) =>
        option.setName("input").setDescription("The input to echo back"),
      ),
    async (interaction) => {
      interaction.reply({
        content: `${interaction.commandName}-reply`,
        ephemeral: true,
      });
    },
  ),
};
