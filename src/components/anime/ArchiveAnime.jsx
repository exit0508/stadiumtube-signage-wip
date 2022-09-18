import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import archiveSVG from '../../../public/img/archive.json';

const archiveAnime = (props) => {
    const anime = useRef(null);
    useEffect(() => {
        const lottieAnime = lottie.loadAnimation({
            container: anime.current,
            renderer: "svg",
            loop: false,
            autoplay: false,
            animationData: archiveSVG,
        });
        if(props.mode == 'vod'){
            //props.setComp(!props.comp);
            console.log('mode',props.mode)
            console.log('Vod complete',props.compVod)
            lottieAnime.play();
            lottieAnime.onComplete = function() {
                props.setCompVod(!props.compVod);
                console.log('VodAnime complete',props.compVod);
            }
        }
        props.setCompVod(false);
        return () => lottieAnime.destroy();
    }, [props.mode]);

    return (
       <div ref={anime}></div>
    )
};

export default archiveAnime;