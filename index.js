import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === "ip") {
    const embed = new EmbedBuilder()
      .setColor("#00FF66") // green sidebar
      .setTitle("👑 RoyalSMP 👑")
      .setDescription(
        `**IP :** \`play.royallsmp.fun\` **PRMANT**\n` +
        `**PT :** \`5299\`\n\n` +
        `**VS :** \`1.16x - 1.21x\`\n` +
        `**ON :** \`24/7\`\n\n` +
        `**join now !**`
      );

    message.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
