import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import archiveSVG from '../../../public/img/archive.json';
import liveSVG from '../../../public/img/live.json';
//import liveSVG from '../public/duck.json';


const liveAnime = ({mode}, complete) => {
    const anime = useRef(null);
    useEffect(() => {
        const lottieAnime = lottie.loadAnimation({
            container: anime.current,
            renderer: "svg",
            loop: false,
            autoplay: true,
            animationData: liveSVG,
        });
        lottieAnime.addEventListener('complete', function(e) { console.log(e); })
        return () => lottieAnime.destroy();
    }, [{mode}]);

    return (
       <div ref={anime} className="live">
       </div>
    )
};

export default liveAnime;