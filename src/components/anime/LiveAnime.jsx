import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import liveSVG from '../../../public/img/live.json';

const liveAnime = (props) => {
    const anime = useRef(null);
    useEffect(() => {

        const lottieAnime = lottie.loadAnimation({
            container: anime.current,
            renderer: "svg",
            loop: false,
            autoplay: false,
            animationData: liveSVG,
        });

        if(props.mode !== 'live_hd'){
            //console.log('mode',props.mode)
            //console.log('livePano complete',props.compPano)
            lottieAnime.play();
            lottieAnime.onComplete = function() {
                props.setCompPano(!props.compPano);
                //console.log('livePanoAnime complete',props.compPano);
            }
        } else if(props.mode !== 'live_pano') {
            //console.log('mode',props.mode)
            //console.log('liveHd complete',props.compHd)
            lottieAnime.play();
            lottieAnime.onComplete = function() {
                props.setCompHd(!props.compHd);
                //console.log('liveHdAnime complete',props.compHd);
            }
        }
        props.setCompPano(false);
        props.setCompHd(false);
        return () => lottieAnime.destroy(); 
    }, [props.mode]);

    return (
       <div ref={anime} >
       </div>
    )
};

export default liveAnime;