import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [ weather, setWeather ] = useState({
    temp: '', 
    desc: '', 
    icon: ''
  });

  useEffect(() => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Busan&units=Metric&APIkey=1100fb9f2eda53f92625c834248c303f')
    .then(response => response.json())
    .then(result => {
      setWeather({
        temp: result.main.temp,
        desc: result.weather[0].description,
        icon: result.weather[0].icon,
      });
    })
    .catch(err => console.log(err));
  }, []);


  if (weather.icon) {
    return (
      <>
        <p>온도 : {weather.temp}</p>
        <p>설명 : {weather.desc}</p>
        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="날씨아이콘입니다." />
      </>
    )
  } else {
    return <h1>로딩 중 ... 🎞</h1>
  }
}

export default App