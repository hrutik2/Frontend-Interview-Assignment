


import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data,setdata]=useState([])
  const [fontfamily,setfontfamily]=useState("")
  const [fontWeights,setfontWeights]=useState("")
  const [fontWeight,setfontWeight]=useState("")
  const [isItalic, setIsItalic] = useState(false);
  const [styling,setstyling]=useState("")
  
  const fetchData = () => {
    fetch('http://localhost:4000/data')
      .then(response => response.json())
      .then(Data => {
       let font=[]
       let font1=[]
       for(let key in Data){
        font1.push(key)
        font.push({key, value:Data[key]})
       }
       setdata(font)
       console.log(font)
      })
      .catch(error => console.error('Error fetching data:', error));
  };
  const handleItalicToggle = (e)=> {
    setIsItalic(e.target.checked);
    console.log(e.target.checked)
  };
  console.log(fontfamily)
  useEffect(()=>{
    let obj={}
    let weight=[]
    for(let i=0;i<data.length;i++){

      if(data[i].key==fontfamily){
        obj=data[i].value
      }
    }
    for(let key in obj){
       if(!key.includes("italic")){
        weight.push({key:key,value:obj[key]})
       }
     }
     setfontWeights(weight)
     console.log(weight)
  },[fontfamily])
 useEffect(()=>{
  fetchData()
},[])

useEffect(()=>{
  let d=""
  let obj={}
  for(let i=0;i<data.length;i++){

    if(data[i].key==fontfamily){
      obj=data[i].value
      d=obj[fontWeight]
    }
  }

  fetch(d).then(res=>{res.json()}).then(data=>console.log(data))

  console.log(d)
},[fontWeight,fontfamily])

 
  return (
    <div className="App">
      <div className="controls">
        <label htmlFor="font-family">Font Family:</label>
        <select id="font-family" value={fontfamily} onChange={(e=>setfontfamily(e.target.value))}>
          <option value="">Select a font family</option>
          {data && data.map(font => (
            <option key={font.key} value={font.key}>{font.key}</option>
          ))}
        </select>

        <label htmlFor="font-weight">Font Weight:</label>
        <select id="font-weight" value={fontWeight} onChange={(e=>setfontWeight(e.target.value))}>
        <option value="">Select a font Weight</option>
          {fontWeights && fontWeights.map(fontWeight => (
            <option key={fontWeight.key} value={fontWeight.key}>{fontWeight.key}</option>
          ))}
        </select>

        <label htmlFor="italic-toggle">Italic:</label>
        <input
          type="checkbox"
          id="italic-toggle"
          checked={isItalic}
          onChange={handleItalicToggle}
         
        />
      </div>
      <textarea
        id="editor"
        style={{ fontFamily: fontfamily, fontStyle: isItalic ? 'italic' : 'normal' , fontWeight: fontWeight}}
        
      />
    </div>
  );
}

export default App;