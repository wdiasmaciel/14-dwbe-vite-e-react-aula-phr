import { useState } from 'react'
import Exemplo01 from './components/exemplo01/Exemplo.jsx'

import './App.css'

function App() {
  const [exemplo, setExemplo] = useState('inicio')

  if (exemplo === 'exemplo01') {
    return <Exemplo01 voltar={() => setExemplo('inicio')} />
  }

  return (
    <>
      <h1>Prática 13</h1>

      <button className="botao" type="button" onClick={() => setExemplo('exemplo01')}>
        Exemplo 01
      </button>

    </>
  )
}

export default App