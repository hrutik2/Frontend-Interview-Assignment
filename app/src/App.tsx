import React, { useState, useEffect } from 'react';
import './App.css';

interface Font {
  key: string;
  value: Record<string, string>;
}

interface FontWeight {
  key: string;
  value: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<Font[]>([]);
  const [fontFamily, setFontFamily] = useState<string>('');
  const [fontWeights, setFontWeights] = useState<FontWeight[]>([]);
  const [fontWeight, setFontWeight] = useState<string>('');

  const fetchData = () => {
    fetch('http://localhost:4000/data')
      .then(response => response.json())
      .then((Data: Record<string, Record<string, string>>) => {
        const font: Font[] = [];
        for (const key in Data) {
          font.push({ key, value: Data[key] });
        }
        setData(font);
        console.log(font);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    const obj: Record<string, string> = {};
    const weight: FontWeight[] = [];
    for (const font of data) {
      if (font.key === fontFamily) {
        Object.assign(obj, font.value);
      }
    }
    for (const key in obj) {
      if (!key.includes('italic')) {
        weight.push({ key, value: obj[key] });
      }
    }
    setFontWeights(weight);
    console.log(weight);
  }, [fontFamily, data]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="controls">
        <label htmlFor="font-family">Font Family:</label>
        <select id="font-family" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
          <option value="">Select a font family</option>
          {data && data.map(font => (
            <option key={font.key} value={font.key}>{font.key}</option>
          ))}
        </select>

        <label htmlFor="font-weight">Font Weight:</label>
        <select id="font-weight" value={fontWeight} onChange={(e) => setFontWeight(e.target.value)}>
          <option value="">Select a font Weight</option>
          {fontWeights && fontWeights.map(fontWeight => (
            <option key={fontWeight.key} value={fontWeight.key}>{fontWeight.key}</option>
          ))}
        </select>

        <label htmlFor="italic-toggle">Italic:</label>
        <input
          type="checkbox"
          id="italic-toggle"
        />
      </div>
      <textarea
        id="editor"
      />
    </div>
  );
}

export default App;