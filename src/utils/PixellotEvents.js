import axios from 'axios';
import { getSecretContent } from './SecretsManager';

export const getEvents = async (params) => {
  const URL_BASE = 'https://api.pixellot.tv/v1';
  const token = (await getSecretContent('production/pixellot/token')).token;
  if (!token) {
    throw new Error('Token unavailable');
  }
  const url = `${URL_BASE}/events`;
  const response = await axios.get(url, {
    params,
    headers: {
      Authorization: token,
    }
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data);
  }
};

export const getLiveEvents = async (venueId, limit = 1) => {
  const now = (new Date()).toISOString();
  return await getEvents({
    limit,
    sort: '{"start$date": -1}',
    criteria: `{"$and": [{"venue": {"_id": "${venueId}"}}, {"status": "active"}, {"start$date": {"$lte": "${now}"}}]}`,
  });
};

export const getVodEvents = async (venueId, limit = 4) => {
  return await getEvents({
    limit,
    sort: '{"start$date": -1}',
    criteria: `{"$and": [{"venue": {"_id": "${venueId}"}}, {"status": "archived"}]}`,
  });
};
