


import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [fontFamily, setFontFamily] = useState("");
  const [fontWeights, setFontWeights] = useState([]);
  const [fontWeight, setFontWeight] = useState("");
  const [isItalic, setIsItalic] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('textEditorData'));
    if (savedData) {
      setText(savedData.text);
      setFontFamily(savedData.fontFamily);
      setFontWeight(savedData.fontWeight);
      setIsItalic(savedData.isItalic);
    }
  }, []);
  useEffect(() => {
    saveDataToLocalStorage();
  }, [text, fontFamily, fontWeight, isItalic]);

  const handleReset = (e) => {
    e.preventDefault();
    setText("");
    setFontFamily("");
    setFontWeight("");
    setIsItalic(false);
    localStorage.removeItem('textEditorData');
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveDataToLocalStorage();
  };

  const saveDataToLocalStorage = () => {
    const dataToSave = {
      text,
      fontFamily,
      fontWeight,
      isItalic,
    };
    localStorage.setItem('textEditorData', JSON.stringify(dataToSave));
  };

  const fetchData = () => {
    fetch('http://localhost:4000/data')
      .then(response => response.json())
      .then(Data => {
        let font = [];
        let font1 = [];
        for (let key in Data) {
          font1.push(key);
          font.push({ key, value: Data[key] });
        }
        setData(font);
        console.log(font);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleItalicToggle = (e) => {
    setIsItalic(e.target.checked);
    console.log(e.target.checked);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    saveDataToLocalStorage();
  };

  console.log(fontFamily);

  useEffect(() => {
    let obj = {};
    let weight = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === fontFamily) {
        obj = data[i].value;
      }
    }
    for (let key in obj) {
      if (!key.includes("italic")) {
        weight.push({ key: key, value: obj[key] });
      }
    }
    setFontWeights(weight);
    console.log(weight);
  }, [fontFamily, data]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let d = "";
    let obj = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === fontFamily) {
        obj = data[i].value;
        d = obj[fontWeight];
      }
    }

    fetch(`${d}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.items);
      })
      .catch(error => console.error('Error fetching data:', error));

    console.log(d);
  }, [fontWeight, fontFamily]);

  return (
    <div className="App">
      <div className="controls">
        <label htmlFor="font-family">Font Family:</label>
        <select id="font-family" value={fontFamily} onChange={(e => setFontFamily(e.target.value))}>
          <option value="">Select a font family</option>
          {data && data.map(font => (
            <option key={font.key} value={font.key}>{font.key}</option>
          ))}
        </select>

        <label htmlFor="font-weight">Font Weight:</label>
        <select id="font-weight" value={fontWeight} onChange={(e => setFontWeight(e.target.value))}>
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
        style={{ width: "20%", fontFamily: fontFamily, fontStyle: isItalic ? 'italic' : 'normal', fontWeight: fontWeight }}
        value={text}
        onChange={handleTextChange}
      />

      <div>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default App;
