import VideoPlayer from './VideoPlayer';

const LivePlayer = ({source}) => {
  return (
    <div className="player live-video">
      <VideoPlayer src={source}
        options={{
          responsive: true,
          fluid: true,
        }} />
    </div>
  );
};

export default LivePlayer;
