import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import ListadoGastos from './components/ListadoGastos';

function App() {

  const [ gastos, setGastos ] = useState(
    JSON.parse(localStorage.getItem('gastos')) ?? []
  )
  // console.log(gastos);

  const [ presupuesto, setPresupuesto ] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );

  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false);
  
  const [ modal, setModal ] = useState(false)
  const [ animarModal, setAnimarModal ] = useState(false)

  const [ gastoEditar, setGastoEditar ] = useState({})

  const [ filtro, setFiltro ] = useState('')
  const [ gastosFiltrados, setGastosFiltrados ] = useState([])

  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [ gastoEditar ])

  //Guardar presupuesto en localStorage
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  //Verificar presupuesto y cambiar variable para mostrar segunda parte de la aplicación
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto'))
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  //Guardar datos en localStorage de los gastos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  //Verificar state para los filtros
  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])


  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    // console.log(gasto);
    if(gasto.id){
      //Editar Gasto
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      //Nuevo Gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500)
  }
  
  const eliminarGasto = id => {
    // console.log('Eliminando ', id);
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto}
              alt='icono nuevo gasto'
              onClick={handleNuevoGasto}
            />
        </div>
        </>
      )}

      {modal && <Modal 
          setModal={setModal}  
          animarModal={animarModal} 
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }

    </div>
  )
}

export default App
