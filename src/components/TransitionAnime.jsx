import ArchiveAnime from '../../public/img/archive.svg'
import LiveAnime from '../../public/img/live.svg'

const TransitionAnime = ({ mode }) => {
    //console.log(mode)
    return (
        <div className='wrapper'>
            <span className="Archived" hidden={mode !== 'vod'}>
                <ArchiveAnime />
            </span>
            <span className="Live" hidden={mode == 'vod'}>
                <LiveAnime />
            </span>
            
            
            <h1 className='fadeIn' hidden={mode !== 'vod'}>Archived</h1>
            <h1 className='fadeIn' hidden={mode !== 'live_hd'}>LIVE</h1>
            <h1 className='fadeIn' hidden={mode !== 'live_pano'}>LIVE</h1>
            <style jsx global>{`
                .fadeIn{
                    animation-name:fadeInAnime;
                    animation-duration:1s;
                    animation-fill-mode:forwards;
                    opacity:0;
                    }
                    
                    @keyframes fadeInAnime{
                      from {
                        opacity: 0;
                      }
                    
                      to {
                        opacity: 1;
                      }
                    }
            `}</style>
        </div>
    )
}

export default TransitionAnime;
