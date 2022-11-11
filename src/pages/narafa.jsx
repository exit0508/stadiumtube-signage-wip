import { useEffect, useState } from "react";
import AnimeWord from "../components/AnimeWord";
import CompanyLogos from "../components/CompanyLogos";
import VodVideo from "../components/VodVideo";
import LivePlayer from "../components/LivePlayer";
import PaymentForm from "../components/PaymentForm";
import { getVodEvents } from '../utils/PixellotEvents';
import TransitionAnime from "../components/TransitionAnime";
import VodSelect from "../components/VodSelect";

// local env
import Link from 'next/link';
import fsPromises from 'fs/promises'
import path from 'path'

export const getServerSideProps = async (context) => {
  const venueId = process.env['VENUE_ID'] || '5dd2966df08c6007922ed4ce';
  const events = await getVodEvents(venueId);
  //console.log(events)

  //local env
  const filePath = path.join(process.cwd(), '/src/pages/setting.json');
  const data = await fsPromises.readFile(filePath);
  const params = JSON.parse(data);

  // const res = await fetch(settingJson);
  // const params = await res.json();
  //console.log("params: " + JSON.stringify(params));

  return {
    props: {
      params,
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
  //console.log('props: ' + JSON.stringify(props.params[0].vodURL))
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

      <select value={mode} onChange={(event)=>setMode(event.target.value)}>
        <option value="vod">vod</option>
        <option value="live_hd">live_hd</option>
        <option value="live_pano">live_pano</option>
        <option value="ad_slide">ad_slide</option>
        <option value="vod_select">vod_select</option>
      </select>
      {/* <TransitionAnime mode={mode} /> */}

      <AnimeWord mode={mode} />
      {mode === 'live_hd' && <LivePlayer source={{
        //src: liveEvent.liveStreamUrls.hd,
        startDate: liveEvent['start$date'],
        endDate: liveEvent['end$date'],
      }} />}
      {mode === 'live_pano' && <LivePlayer source={{
        //src: liveEvent.liveStreamUrls.pano,
        startDate: liveEvent['start$date'],
        endDate: liveEvent['end$date'],
      }} />}
      {mode === 'vod' && <VodVideo sources={vodEvents} />}

      {mode === 'vod_select' && <VodSelect sources={vodEvents} />}


      <CompanyLogos />
      {/* <PaymentForm /> */}
      <style jsx global>{`
        body {
          background: ${mode === 'vod' ? "#24313B" : "#F18FA2"};
        }
      `}</style>
    </div>
  );
};

