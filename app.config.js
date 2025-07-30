import 'dotenv/config';

export default {
  expo: {
    name: 'disaster-safe',
    slug: 'disaster-safe',
    version: '1.0.0',
    extra: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
};