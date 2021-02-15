const { WebClient, LogLevel } = require('@slack/web-api');
const config = require('./config.json');
const words  = config.words;
const emojis = config.emojis;

const run = async () => {
    const client = new WebClient(config.apiKey, {
        logLevel: LogLevel.DEBUG
    });

    const word        = words[Math.floor(Math.random() * words.length)];
    const textEmoji   = emojis[Math.floor(Math.random() * emojis.length)];
    const statusEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    client.chat.postMessage({
        channel: config.channel,
        text: `${word} some lunch :${textEmoji}:`
    }).catch(console.error);

    client.users.profile.set({
        profile: {
            status_text: 'Lunch',
            status_emoji: `:${statusEmoji}:`,
            status_expiration: (Date.now() / 1000) + (config.expireIn * 60)
        }
    }).catch(console.error);
}

run();