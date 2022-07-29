import anime from 'animejs';
import { useEffect } from 'react';

const defaultPattern = [
  {
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: 'easeOutExpo',
    duration: 1200,
    delay: (el, i) => 500 + 30 * i,
  },
  {
    opacity: 1,
    duration: 10000,
  },
  {
    translateX: [0,-30],
    opacity: [1,0],
    easing: 'easeInExpo',
    duration: 1100,
    delay: (el, i) => 100 + 30 * i
  },
];

const animationConfig = [
  {
    mode: 'live_hd',
    target: '#liveHdLetter',
    text: ['LIVE配信中', 'AIによる自動撮影'],
    patterns: defaultPattern,
  },
  {
    mode: 'live_pano',
    target: '#livePanoLetter',
    text: ['LIVE配信中', 'パノラマモードで撮影中'],
    patterns: defaultPattern,
  },
  {
    mode: 'vod',
    target: '#vodLetter',
    text: ['AIによる自動撮影', '無人で撮影しています'],
    patterns: defaultPattern,
  },
];

const AnimeWord = ({ mode }) => {
  const textNumber = 0;

  useEffect(() => {
    for (const config of animationConfig) {
      const animation = anime.timeline({
        autoplay: true,
        loop: true,
        loopBegin: ()=> {
          document.querySelector(config.target).textContent = config.text[textNumber];
        },
        loopComplete: ()=> {
          textNumber = Number(!textNumber);
        }
      });
      for (const pattern of config.patterns) {
        animation.add({
          targets: config.target,
          ...pattern
        });
      }
    }
  }, [textNumber]);

  return (
    <div className="anime-word">
      <h1 className="ml12" hidden={mode !== 'live_hd'}>
        <span id="liveHdLetter" className="letter"></span>
      </h1>
      <h1 className="ml12" hidden={mode !== 'live_pano'}>
        <span id="livePanoLetter" className="letter"></span>
      </h1>
      <h1 className="ml12" hidden={mode !== 'vod'}>
        <span id="vodLetter" className="letter"></span>
      </h1>
    </div>
  );
};

export default AnimeWord;
