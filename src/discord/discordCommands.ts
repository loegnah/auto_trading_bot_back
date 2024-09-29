import { SlashCommandBuilder } from "discord.js";

export const discordCommands: {
  name: string;
  builder: any;
}[] = [
  {
    name: "command-1",
    builder: new SlashCommandBuilder()
      .setName("command-1")
      .setDescription("Provides information about the server."),
  },
  {
    name: "command-2",
    builder: new SlashCommandBuilder()
      .setName("command-2")
      .setDescription("Provides information about the server.")
      .addStringOption((option) =>
        option.setName("input").setDescription("The input to echo back"),
      ),
  },
];
