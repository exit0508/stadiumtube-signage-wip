import { getLiveEvents } from '../../utils/PixellotEvents';

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      try {
        const { venueId }= req.query;
        const events = await getLiveEvents(venueId);
        res.status(200).json(events);
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
