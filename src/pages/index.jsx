import { useEffect, useState } from "react";
import AnimeWord from "../components/AnimeWord";
import CompanyLogos from "../components/CompanyLogos";
import VodVideo from "../components/VodVideo";
import LivePlayer from "../components/LivePlayer";
import PaymentForm from "../components/PaymentForm";
import { getVodEvents } from '../utils/PixellotEvents';
import TransitionAnime from "../components/TransitionAnime";

// local env
import Link from 'next/link';
import settingJson from "../pages/setting.json"
import fsPromises from 'fs/promises'
import path from 'path'

export const getServerSideProps = async (context) => {
  const venueId = process.env['VENUE_ID'] || '5dd2966df08c6007922ed4ce';
  const events = await getVodEvents(venueId);

  //local env
  const filePath = path.join(process.cwd(), '/src/pages/setting.json');
  const data = await fsPromises.readFile(filePath);
  const params = JSON.parse(data);

  // const res = await fetch(settingJson);
  // const params = await res.json();

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
  //console.log('props: ' + props)

  return (
    <div>
      <h1>一覧</h1>
      <ul>
        {props.params.map((item)=>{
          return (
            <li key={item.id}>
               <Link href={`/venue/${item.venue}`}>
                <a>{item.venue}</a>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* <PaymentForm /> */}
      <style jsx global>{`
      `}</style>
    </div>
  );
};

