import VideoPlayer from './VideoPlayer';

const VodVideo = () => {
  return (
    <div className="player vod-video">
      <VideoPlayer src={{src: "/baseball.mp4", type: "video/mp4"}} options={{fluid: true}} />
      <VideoPlayer src={{src: "/baseball.mp4", type: "video/mp4"}} options={{fluid: true}} />
      <VideoPlayer src={{src: "/baseball.mp4", type: "video/mp4"}} options={{fluid: true}} />
      <VideoPlayer src={{src: "/baseball.mp4", type: "video/mp4"}} options={{fluid: true}} />
    </div>
  );
};

export default VodVideo;
