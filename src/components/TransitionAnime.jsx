import LiveAnime from './anime/LiveAnime.jsx'
import ArchiveAnime from './anime/ArchiveAnime.jsx'
import { useState } from 'react';

const TransitionAnime = ({ mode }) => {
    const [compHd, setCompHd] = useState(false);
    const [compPano, setCompPano] = useState(false);
    const [compVod, setCompVod] = useState(false);

    return (
        <div className={compHd | compPano ? "transition" : "wrapper"}>
          <div className="live-anime" hidden={mode === 'vod'}>
            <LiveAnime mode={mode} setCompHd={setCompHd} compHd ={compHd} setCompPano={setCompPano} compPano ={compPano}/>
          </div>
          <div className="archive-anime" hidden={mode !== 'vod'}>
            <ArchiveAnime mode={mode} setCompVod={setCompVod} compVod ={compVod}/>
          </div>
          <style jsx global>{`
          .wrapper {
            position: absolute;
            height: 100%;
            width: 100%;
            z-index: 30;
          }
          .transition {
            position: absolute;
            height: 100%;
            width: 100%;
            z-index: 30;
            animation-name: transition;
            animation-fill-mode: forwards;
            animation-duration: 0.7s;
            animation-delay: 1.5s;
          }
          @keyframes transition {
              100% {
              opacity: 0;
              }
          }
          `}</style>
        </div>
    )
}

export default TransitionAnime;
