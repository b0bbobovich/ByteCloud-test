import { AppContainer } from './App.styled';
import { Chart } from './components/Chart/Chart';
import { Sliders } from './components/Sliders/Sliders';
import { useState } from 'react';

function App() {
  const [storage, setStorage] = useState(100);
  const [transfer, setTransfer] = useState(200);

  const changeStorageValue = (newValue) => {
    setStorage(newValue);
  };

  const changeTransferValue = (newValue) => {
    setTransfer(newValue);
  };

  return (
    <AppContainer>
      <Chart storage={storage} transfer={transfer}/>
      <Sliders storage={storage} transfer={transfer} onChangeStorage={changeStorageValue} onChangeTransfer={changeTransferValue} />
    </AppContainer>
  );
}

export default App;
