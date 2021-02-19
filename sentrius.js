const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const ayarlar = require('./ayarlar.json');
const { Database } = require("wio.db");
const  db  = new Database("myDatabase");
const moment = require('moment');
require('moment-duration-format')
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();



fs.readdirSync('./commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
  let command = require(`./commands/${files}`);
  if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`)
  commands.set(command.name, command);
  if (!command.aliases || command.aliases.length < 1) return
  command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})


client.on('ready', () => {
    client.user.setPresence({ activity: { name: '🎄Developed by Sentrius🎄' }, status: 'idle' })
    client.channels.cache.get(ayarlar.ses).join() 
    console.log(`Bot ${client.user.tag} Adı İle Giriş Yaptı!`);
  })

  client.config = {
    vipRoles: [''], //vip
    unregisteres: [''], // kayıtsız
    maleRoles: [''], // erkek
    girlRoles: [''], // bayan
    mods: [""], // yetkili
    channelID: '', // kayıt kanalı
    yönetim: [''] // üst yönetim
}

client.on('message', message => {
    const prefix = ".";// prefix
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
})

client.on("userUpdate", async function(oldUser, newUser) { // kod codaredan alınıp editlenmiştir!
    const guildID = ""//sunucu
    const roleID = ""
    const tag = ""//tag
    const chat = ''// chat
    const log2 = '' // log kanalı
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setFooter('🎄Developed by Sentrius🎄');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(` ${newUser} isminden \`Ϯ\` çıakrtarak ailemizden ayrıldı!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${tag})`)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} ismine \`Ϯ\` alarak ailemize katıldı`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == "1704" && newUser.discriminator !== "1704") {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  <@!' + newUser + '> etiketinden \`1704\` çıakrtarak ailemizden ayrıldı!`))
        } else if (oldUser.discriminator !== "1704" && newUser.discriminator == "1704") {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  <@!' + newUser + '> etiketine \`1704\` alarak ailemize katıldı`))
            client.channels.cache.get(chat).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(#1704)`)
        }
    }
  
  })

  
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'tag') {
      msg.channel.send('Ϯ');
}
});
  
client.on('message', msg => {
  if (msg.content.toLowerCase() === '.tag') {
      msg.channel.send('Ϯ');
}
});
  
client.on('message', msg => {
  if (msg.content.toLowerCase() === '!tag') {
      msg.channel.send('Ϯ');
}
});



  client.on("guildMemberAdd", member => {  
    const kanal = member.guild.channels.cache.find(r => r.id === (ayarlar.kayıtkanal));
    const register = "<@&register>"
    let vader = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - vader.createdAt.getTime();  
   
        var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `0`,
'1': `1`,
'2': `2`,
'3': `3`,
'4': `4`,                       
'5': `5`,
'6': `6`,
'7': `7`,
'8': `8`,
'9': `9`}[d];
          })
        }
  
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Durumu: `Güvenilir Değil'
  if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir '
    moment.locale("tr");
  
  
  
 const hgmesaj = (` <a:tasia_elmass:807869978325286923> Tasia Sunucumuza hoşgeldin (<@${vader.id}>) - (\`${vader.id}\`)\n \n          <a:tasia_elmass:807869978325286923> Seninle beraber **`  + üyesayısı +`** kişiyiz. \n \n          <a:tasia_elmass:807869978325286923> <@&810631097192546334> Rolündeki Yetkililer Seninle İlgilenicektir. \n\n          <a:tasia_elmass:807869978325286923> Bize Destek olmak İstersen Tag Alabilirsin \`Ϯ\` \n\n   <a:tasia_elmass:807869978325286923> Hesabın Oluşturma tarihi (`  + moment(member.user.createdAt).format("DD MMMM YYYY dddd") + `)  \n <a:tasia_elmass:807869978325286923> Bu Kullanıcı:   `     + kontrol + ` `)
kanal.send(hgmesaj)
      })

  client.login(ayarlar.token)//token
  

