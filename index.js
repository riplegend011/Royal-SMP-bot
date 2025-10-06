import express from "express";
import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

// --------------------
// Express server setup
// --------------------
const app = express();
app.get("/", (req, res) => res.send("Royal SMP Bot is Alive! 🚀"));
app.listen(3000, () => console.log("🌍 Express server running on port 3000"));

// --------------------
// Discord Bot Setup
// --------------------
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
      .setColor("#00FF66")
      .setTitle("👑 Royal SMP 👑")
      .setDescription(
        `**JAVA IP :** \`play.royallsmp.fun\`\n` +
        `**BEDROCK IP :** \`play.royallsmp.fun\`\n` +
        `**PORT :** \`5299\`\n\n` +
        `**VERSION :** \`1.8.8 - 1.21.9\`\n` +
        `**Join now and start your adventure! 🏰**`
      );
    message.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
