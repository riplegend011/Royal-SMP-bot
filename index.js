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
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Per-user cooldown to prevent multiple replies
const cooldown = new Set();

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  // Ignore DMs
  if (!message.guild) return;

  const content = message.content.toLowerCase();

  // Only respond if user is not in cooldown
  if (cooldown.has(message.author.id)) return;

  if (content === "ip") {
    const embed = new EmbedBuilder()
      .setColor("#00FF66")
      .setTitle("⚙️ Royal SMP ⚙️")
      .setDescription(
        `**JAVA IP :** \`play.royallsmp.fun\`\n` +
        `**BEDROCK IP :** \`play.royallsmp.fun\`\n` +
        `**PORT :** \`5299\`\n\n` +
        `**VERSION :** \`1.8.8 - 1.21.9\`\n` +
        `**Join now and start your adventure! 🏰**`
      );

    message.reply({ embeds: [embed] });

    // Add user to cooldown for 5 seconds
    cooldown.add(message.author.id);
    setTimeout(() => cooldown.delete(message.author.id), 5000);
  }
});

// Login to Discord
client.login(process.env.TOKEN);
