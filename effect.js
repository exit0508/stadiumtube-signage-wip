// Wrap every letter in a span
var textWrapper = document.querySelector('.ml12');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter' id='letter'>$&</span>");

var text_mode = true;
var hd_pano_mode = true;
var live_archived_mode = true;

const pink = "#F18FA2";
const navy = "#24313B";

var liveHdAnime = anime.timeline({
  loop: true,
  loopBegin: ()=> {
    if(text_mode){
      document.querySelector('.letter').textContent = "LIVE配信中";
      text_mode = !text_mode;
    }else{
      document.querySelector('.letter').textContent = "AIによる自動撮影";
      text_mode = !text_mode;
    }
  },
  loopComplete: ()=> {
    console.log("liveHdAnime loopComplete");
  }
  })
  .add({
    targets: '.ml12 .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 30 * i,
  }).add({
    targets: '.ml12 .letter',
    opacity: 1,
    duration: 10000,
  }).add({
    targets: '.ml12 .letter',
    translateX: [0,-30],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 30 * i
  });


liveHdAnime.pause();

var livePanoAnime = anime.timeline({
  loop: true,
  loopBegin: ()=> {
    if(text_mode){
      document.querySelector('.letter').textContent = "LIVE配信中";
      text_mode = !text_mode;
    }else{
      document.querySelector('.letter').textContent = "パノラマモードで撮影中";
      text_mode = !text_mode;
    }
  },
  loopComplete: ()=> {
    console.log("livePanoAnime loopComplete.");
  }
  })
  .add({
    targets: '.ml12 .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 30 * i,
  }).add({
    targets: '.ml12 .letter',
    opacity: 1,
    duration: 10000,
  }).add({
    targets: '.ml12 .letter',
    translateX: [0,-30],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 30 * i
});

livePanoAnime.pause();

var vodAnime = anime.timeline({
  loop: true,
  loopBegin: ()=> {
    if(text_mode){
      document.querySelector('.letter').textContent = "AIによる自動撮影";
      text_mode = !text_mode;
    }else{
      document.querySelector('.letter').textContent = "無人で撮影しています";
      text_mode = !text_mode;
    }
  },
  loopComplete: ()=> {
    console.log("vodAnime loopComplete");
  }
  }).add({
    targets: '.ml12 .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 30 * i,
  }).add({
    targets: '.ml12 .letter',
    opacity: 1,
    duration: 10000,
  }).add({
    targets: '.ml12 .letter',
    translateX: [0,-30],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 30 * i
});

vodAnime.pause();


var liveHdUrl = "";
var livePanoUrl = "";
var vods = [];
var player = videojs('live-player');
player.responsive(true);


var vod0player = videojs('vod0');
//vod0player.responsive(true);
vod0player.fluid(true);

var vod1player = videojs('vod1');
vod1player.fluid(true);

var vod2player = videojs('vod2');
vod2player.fluid(true);

var vod3player = videojs('vod3');
vod3player.fluid(true);

var timer;

const toggle = function(){
  if(hd_pano_mode){
    player.pause();
    player.aspectRatio('16:9');
    player.src({type:"application/x-mpegURL", src:liveHdUrl});
    livePanoAnime.pause();
    liveHdAnime.play();

    player.play();
    hd_pano_mode = !hd_pano_mode;
  }else{
    player.pause();
    player.aspectRatio('21:9');
    player.src({type:"application/x-mpegURL", src:livePanoUrl});
    liveHdAnime.pause();
    livePanoAnime.play();

    player.play();
    hd_pano_mode = !hd_pano_mode;
  }
}

var first_run = true;

const update = async () => {
  console.log("update");
  const json = await putLogin();

  json_events = await getEvents(json);

  console.log(json_events);

  var last_live_archived_mode = live_archived_mode;
  live_archived_mode = false;

  vods = [];

  for(var i = 0; i < json_events.length; i++){
    var obj = json_events[i];
    if(obj.status == 'active'){
      if(obj.hasOwnProperty('liveStreamUrls')){
        console.log(obj.liveStreamUrls.hd);
        
        liveHdUrl = obj.liveStreamUrls.hd;
        livePanoUrl = obj.liveStreamUrls.pano;
        live_archived_mode = true;
        break;
      }
    }else{
      if(obj.hasOwnProperty('urls')){
        console.log(obj.urls.hd);
        vods.push(obj.urls.hd);
      }
    }
  }
  if(!first_run){
    //前回のliveモード<->アーカイブモードの変化が無ければこれ以降の処理をスキップ
    if(last_live_archived_mode == live_archived_mode){
      return;
    }
  }else{
    first_run = false;
  }

  clearInterval(timer);

  if(live_archived_mode){
    console.log("live mode");
    document.getElementById('upperplayer').style.display = 'block';
    document.getElementById('gridplayer').style.display = 'none';
    document.body.style.backgroundColor = pink;
    vodAnime.pause();
    toggle();
    timer = setInterval(toggle, 60000);
  }else{
    console.log("vod mode");
    document.getElementById('upperplayer').style.display = 'none';
    document.getElementById('gridplayer').style.display = 'grid';
    document.body.style.backgroundColor = navy;
    
    vod0player.pause();
    vod0player.src({type:"application/x-mpegURL", src:vods[0]});
    vod0player.play();
    vod1player.pause();
    vod1player.src({type:"application/x-mpegURL", src:vods[1]});
    vod1player.play();
    vod2player.pause();
    vod2player.src({type:"application/x-mpegURL", src:vods[2]});
    vod2player.play();
    vod3player.pause();
    vod3player.src({type:"application/x-mpegURL", src:vods[3]});
    vod3player.play();

    vodAnime.play();
    liveHdAnime.pause();
    livePanoAnime.pause();
  }
}

update();
setInterval(update, 60000);
