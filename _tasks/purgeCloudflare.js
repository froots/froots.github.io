const request = require('request-promise-native');

const apiRoot = 'https://api.cloudflare.com/client/v4';
const email = process.env.CLOUDFLARE_EMAIL;
const apiKey = process.env.CLOUDFLARE_API_KEY;
const zoneId = process.env.CLOUDFLARE_TF_ZONE_ID;

const requestOptions = {
  method: 'POST',
  uri: `${apiRoot}/zones/${zoneId}/purge_cache`,
  headers: {
    'X-Auth-Email': email,
    'X-Auth-Key': apiKey
  },
  body: {
    purge_everything: true
  },
  json: true
};

async function purgeCache() {
  try {
    const result = await request(requestOptions);
    if (result.success) {
      console.log('Cloudflare cache purged successfully!');
    } else {
      console.error(result.errors);
    }
  } catch (e) {
    console.error(e);
  }
}

purgeCache();
