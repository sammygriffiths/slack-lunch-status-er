const { WebClient, LogLevel } = require('@slack/web-api');
const config = require('./config.json');
const statuses  = config.statuses;
const emojis = config.emojis;

const run = async () => {
    const client = new WebClient(config.apiKey, {
        logLevel: LogLevel.DEBUG
    });

    const status      = statuses[Math.floor(Math.random() * statuses.length)];
    const statusEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    console.log({
        status_text: status,
        status_emoji: `:${statusEmoji}:`,
        status_expiration: (Date.now() / 1000) + (config.expireIn * 60)
    });

    // client.users.profile.set({
    //     profile: {
    //         status_text: status,
    //         status_emoji: `:${statusEmoji}:`,
    //         status_expiration: (Date.now() / 1000) + (config.expireIn * 60)
    //     }
    // }).catch(console.error);
}

run();