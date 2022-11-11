import { useEffect, useState } from "react";
import AnimeWord from "../../components/AnimeWord";
import CompanyLogos from "../../components/CompanyLogos";
import VodVideo from "../../components/VodVideo";
import LivePlayer from "../../components/LivePlayer";
import PaymentForm from "../../components/PaymentForm";
import { getVodEvents } from '../../utils/PixellotEvents';
import TransitionAnime from "../../components/TransitionAnime";
import VodSelect from "../../components/VodSelect";

// local env
import Link from 'next/link';
import fsPromises from 'fs/promises'
import path from 'path'

export const getServerSideProps = async (context) => {
  const venueId = process.env['VENUE_ID'] || '5dd2966df08c6007922ed4ce';
  const events = await getVodEvents(venueId, 10);
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
  //console.log('props: ' + JSON.stringify(props.params))

  const [val, setVal] = useState('normal');
  const handleChange = e => setVal(e.target.value);
  const { venueId, vodEvents } = props;
  console.log('props: ' + JSON.stringify(props))

  return (
    <div className="letter">
      <h1>モード選択</h1>
      <label>
        <input type="radio" value="normal" onChange={handleChange} checked={val === 'normal'}/>
        通常モード
      </label>
      <label>
        <input type="radio" value="vodSelect" onChange={handleChange} checked={val === 'vodSelect'}/>
        指定動画再生モード
      </label>
      <label>
        <input type="radio" value="adv" onChange={handleChange} checked={val === 'adv'}/>
        広告再生モード
      </label>
      <p>選択値：{val}</p>

      {val === 'vodSelect' && <VodSelect sources={vodEvents} />}
      
      <CompanyLogos />
      {/* <PaymentForm /> */}
      <style jsx>{`
        .letter {
          color: white;
        }
      `}</style>
    </div>
  );
};

