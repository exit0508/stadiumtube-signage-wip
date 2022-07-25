import { useCallback, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ src, options }) => {
  const [videoEl, setVideoEl] = useState(null);
  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (videoEl == null) return;
    const player = videojs(videoEl, {
      sources: src,
      ...options,
    });
    return () => {
      player.dispose();
    };
  }, [src, videoEl, options]);

  return <video className="video-js" ref={onVideo} playsInline preload="auto" muted loop autoPlay />;
};

export default VideoPlayer;
