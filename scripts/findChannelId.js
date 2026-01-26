const https = require('https');

function findChannelId(username) {
  return new Promise((resolve, reject) => {
    const url = `https://www.youtube.com/@${username}`;
    
    https.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        // Try multiple regex patterns to find channel ID
        const patterns = [
          /"channelId":"(UC[^"]{20,})"/,
          /"externalId":"(UC[^"]{20,})"/,
          /channel\/(UC[^"]{20,})/,
          /\/channel\/(UC[^"'/\s]{20,})/,
        ];
        
        for (const pattern of patterns) {
          const match = data.match(pattern);
          if (match && match[1]) {
            resolve(match[1]);
            return;
          }
        }
        
        reject(new Error(`Could not find channel ID for @${username}`));
      });
    }).on('error', (err) => {
      reject(new Error(`Failed to fetch channel page: ${err.message}`));
    });
  });
}

async function main() {
  const username = process.argv[2] || 'bethelobcbordenarve';
  
  try {
    console.log(`Finding channel ID for @${username}...`);
    const channelId = await findChannelId(username);
    console.log(`Found! Channel ID: ${channelId}`);
    console.log(`\nUpdate the CHANNEL_IDS in scripts/scrapeYouTube.js with this ID`);
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nManually check the channel and add the ID to scripts/scrapeYouTube.js');
  }
}

main();
