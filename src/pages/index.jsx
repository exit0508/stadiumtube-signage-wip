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
  //local env
  const filePath = path.join(process.cwd(), '/src/pages/setting.json');
  const data = await fsPromises.readFile(filePath);
  const params = JSON.parse(data);

  // const res = await fetch(settingJson);
  // const params = await res.json();

  return {
    props: {
      params
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
          console.log(item)
          return (
            <li key={item.venueId}>
               <Link href={`/venue/${item.venueId}`}>
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

