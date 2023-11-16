import React from "react";
import TextTransition, { presets } from 'react-text-transition';
import Main from './components/Main.jsx'
const TEXTS = ['To-Do', 'WooDo'];

function App() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      1500, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <>
    <TextTransition springConfig={presets.default}  style={{
      fontSize: '30px',
      marginLeft: '20px',
      marginTop: '20px',
      fontWeight:'700',
      fontFamily: 'Roboto'
    }} >{TEXTS[index % TEXTS.length]}</TextTransition>
    <Main />
    </>
  )
}

export default App
