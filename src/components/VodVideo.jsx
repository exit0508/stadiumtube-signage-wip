import VideoPlayer from './VideoPlayer';

const VodVideo = ({sources, number}) => {
  if (sources.length < number) {
    for (let i = sources.length; i < number; i++) {
      sources[i] = {src: "/baseball.mp4", type: "video/mp4"};
    }
  }
  const videoPlayers = sources.map((src, i) => <VideoPlayer key={i} source={src} options={{fluid: true}} />);
  return (
    <div className="player vod-video">
      {videoPlayers}
    </div>
  );
};

export default VodVideo;
