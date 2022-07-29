import VideoPlayer from './VideoPlayer';

const LivePlayer = ({source}) => {
  return (
    <div className="player live-video">
      <VideoPlayer source={source}
        options={{
          responsive: true,
          fluid: true,
        }} />
    </div>
  );
};

export default LivePlayer;
