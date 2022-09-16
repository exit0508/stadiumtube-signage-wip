import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import archiveSVG from '../../../public/img/archive.json';

const liveAnime = ({mode}) => {
    const anime = useRef(null);
    useEffect(() => {
        const lottieAnime = lottie.loadAnimation({
            container: anime.current,
            renderer: "svg",
            loop: false,
            autoplay: true,
            animationData: archiveSVG,
        });
        return () => lottieAnime.destroy();
    }, [{mode}]);

    return (
       <div ref={anime}></div>
    )
};

export default liveAnime;