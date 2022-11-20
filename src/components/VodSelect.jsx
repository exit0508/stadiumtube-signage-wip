import VideoPlayer from './VideoPlayer';
import VodVideo from "../components/VodVideo"; 
import { useEffect, useState } from "react";

const CheckBox = ({id, value, checked, onChange, startDate, endDate}) => {
  return (
    <label key={id} className="vod-item">
      <input
      id={id}
      type="checkbox"
      name="inputNames"
      checked={checked}
      onChange={onChange}
      value={value}
    />
    開始時間：{startDate} ~ 終了時間{endDate}
    </label>
    
  )
}

const VodSelect = ({sources, number}) => {

  //console.log(sources)
  const [checkedItems, setCheckedItems] = useState([])
  const [selectedVod, setVodList] = useState([])
  const setVodList2 = []
  const [selectSubmit, setSelect] = useState(false)

  const handleChange = e => {
    //console.log(e)
    setCheckedItems({
      ...checkedItems,
      [e.target.id]: e.target.checked
    })
    console.log('checkedItems:', checkedItems)
  }

  const addVodList = ( e ) => {
    //console.log(e)
    e.preventDefault()
    const dataPushArray = Object.entries(checkedItems).reduce((pre,[key, value])=>{
      value && pre.push(key)
      return pre
    },[])
    console.log("dataPushArray:", dataPushArray)
    dataPushArray.map((item, index)=>{
      setVodList2.push(sources[item])
    })
    setVodList(setVodList2)
    if(setVodList2.length>0){
      setSelect(true)
    }else{
      setSelect(false)
    }
  }

  return (
    <div>
      <form  className="vod-list">
        {sources.map((item, index) => {
          index = index + 1
          return(
            <CheckBox
              id={index}
              value={item.src}
              onChange={handleChange}
              checked={checkedItems[item.id]}
              startDate={item.startDate}
              endDate={item.endDate}
            />
          )
        })}
        <button type="submit" onClick={addVodList}>設定</button>
        {selectSubmit === true && <VodVideo sources={selectedVod} number={selectedVod.length} /> }
      </form>
    </div>
  )
};


  export default VodSelect;