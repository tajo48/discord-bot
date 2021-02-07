const Discord = require("discord.js");
const fs = require("fs");
const http = require("http");
var dateone = "0";
var state = 1;

let client = new Discord.Client();
client.config = JSON.parse(fs.readFileSync("config.json", "utf8"));

client.once("ready", () => {
  console.log(`${client.user.tag} is Online`);
  client.user.setActivity("-gate to click the gate button");
});

client.on("message", (message) => {
  if (!message.content.startsWith(client.config.prefix) || message.author.bot)
    return;
  if (message.guild.id != client.config.server) return;
  const args = message.content.slice(client.config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();



  if (command === "gate") {
    if (message.author.id == client.config.owner) {
      const request = http.get(client.config.ip);

      message.channel.send({
        embed: {
          color: "#ffff00",
          title: `Operation performed`,
          description: `User <@${message.author.id}> pressed the gate button `,
        },
      });
      return;
    }
  }

  if (!message.member.roles.cache.find((r) => r.id === client.config.role)) {
    message.channel.send({
      embed: {
        color: "#ff0000",
        title: `no permission`,
        description: `<@${message.author.id}> you don't need access to the gate`,
      },
    });

    return;
  }



  if (command === "gate") {
    const request = http.get(client.config.ip);

    message.channel.send({
      embed: {
        color: "#ffff00",
        title: `Operation performed`,
        description: `User <@${message.author.id}> pressed the gate button`,
      },
    });
  }
});

client.login(client.config.token).catch(() => {
  console.error("Invalid bot token provided in config.json");
  process.exit();
});
