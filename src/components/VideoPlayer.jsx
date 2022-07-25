import { useCallback, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { format, parseISO } from 'date-fns';

const dateIsoToStr = (dateISO) => {
  const dateFormat = 'yyyy-MM-dd HH:mm';
  return format(parseISO(dateISO), dateFormat);
};

const VideoPlayer = ({ source, options }) => {
  const [videoEl, setVideoEl] = useState(null);
  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (videoEl == null) return;
    const player = videojs(videoEl, {
      sources: source.src,
      ...options,
    });
    return () => {
      player.dispose();
    };
  }, [source, videoEl, options]);

  return (
    <div className="video">
      {(source.startDate && source.endDate) &&
        <span className="dates">{dateIsoToStr(source.startDate)} - {dateIsoToStr(source.endDate)}</span>
      }
      <video className="video-js" ref={onVideo} playsInline preload="auto" muted loop autoPlay />
    </div>
  );
};

export default VideoPlayer;
