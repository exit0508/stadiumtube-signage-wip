import { useEffect, useState } from "react";
import AnimeWord from "../components/AnimeWord";
import CompanyLogos from "../components/CompanyLogos";
import VodVideo from "../components/VodVideo";
import LivePlayer from "../components/LivePlayer";
import { getVodEvents } from '../utils/PixellotEvents';

export const getServerSideProps = async (context) => {
  const venueId = '5c6ac18affdf8407c14921fe';
  const events = await getVodEvents(venueId);
  return {
    props: {
      venueId,
      vodEvents: events.map((event) => { return {
        src: event.urls.hd,
        startDate: event['start$date'],
        endDate: event['end$date'],
      }; }),
    },
  }
};

export default function Home(props) {
  const [mode, setMode] = useState('vod');
  const [liveEvent, setLiveEvent] = useState({});
  const { venueId, vodEvents } = props;

  useEffect(() => {
    const timer = setInterval(async () => {
      const response = await fetch(`/api/liveevents?venueId=${venueId}`);
      if (response.status === 200) {
        const events = await response.json();
        if (events.length > 0 && events[0].liveStreamUrls) {
          setLiveEvent(events[0]);
          if (mode === 'live_hd') setMode('live_pano');
          else setMode('live_hd');
        } else {
          setMode('vod');
        }
      } else {
        setMode('vod');
      }
    }, 60 * 1000);
    return () => clearInterval(timer);
  }, [mode]);

  return (
    <div>
      <AnimeWord mode={mode} />
      {mode === 'live_hd' && <LivePlayer source={{
        src: liveEvent.liveStreamUrls.hd,
        startDate: liveEvent['start$date'],
        endDate: liveEvent['end$date'],
      }} />}
      {mode === 'live_pano' && <LivePlayer source={{
        src: liveEvent.liveStreamUrls.pano,
        startDate: liveEvent['start$date'],
        endDate: liveEvent['end$date'],
      }} />}
      {mode === 'vod' && <VodVideo sources={vodEvents} />}
      <CompanyLogos />
      <style jsx global>{`
        body {
          background: ${mode === 'vod' ? "#24313B" : "#F18FA2"};
        }
      `}</style>
    </div>
  );
};
