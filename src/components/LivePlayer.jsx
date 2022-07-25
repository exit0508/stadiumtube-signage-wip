import VideoPlayer from './VideoPlayer';

const LivePlayer = ({src}) => {
  return (
    <div className="player live-video">
      <VideoPlayer src={src}
        options={{
          responsive: true,
          fluid: true,
        }} />
    </div>
  );
};

export default LivePlayer;
