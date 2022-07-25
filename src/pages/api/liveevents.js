import axios from "axios";
import { getSecretContent } from "../../utils/SecretsManager";

const getEvent = async (req, res) => {
  const URL_BASE = 'https://api.pixellot.tv/v1';
  const token = (await getSecretContent('production/pixellot/token')).token;
  if (!token) {
    throw new Error('Token unavailable');
  }
  const { venueId } = req.query;
  const url = `${URL_BASE}/events`;
  const now = (new Date()).toISOString();
  const response = await axios.get(url, {
    params: {
      limit: 1,
      sort: '{"start$date": -1}',
      criteria: `{"$and": [{"venue": {"_id": "${venueId}"}}, {"status": "active"}, {"start$date": {"$lte": "${now}"}}]}`,
    },
    headers: {
      Authorization: token,
    }
  });
  if (response.status === 200) {
    res.status(200).json(response.data);
  } else {
    throw new Error(response.data);
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      try {
        await getEvent(req, res);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
      break;
    }
    default: {
      res.status(403).end();
    }
  }
};

export default handler;
