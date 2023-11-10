import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import IconoCerrarModal from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    //State Form
    const [ nombre, setNombre ] = useState('');
    const [ cantidad, setCantidad ] = useState('');
    const [ categoria, setCategoria ] = useState('');
    const [ id, setId ] = useState('');
    const [ fecha, setFecha ] = useState('')

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])
    
    //State mensaje formulario
    const [ mensaje, setMensaje ] = useState('')

    const handleModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500)
    }

    const handleSubmit = e => {
        e.preventDefault();
        // console.log('Enviando Formulario');
        if([ nombre, cantidad, categoria ].includes('')){
            setMensaje('Los campos son obligatorios')
            setTimeout(() => {
                setMensaje('')
            }, 3000)
            return
        }
        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }

  return (
    <div className='modal'>
        <div className="cerrar-modal">
            <img 
                src={IconoCerrarModal}
                alt='Icono Cerrar Modal'
                onClick={handleModal}
            />
        </div>
        <form
            className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
            onSubmit={handleSubmit}
        >
            <legend>{gastoEditar.nombre ? 'EDITAR GASTO' : 'NUEVO GASTO' }</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input 
                    type="text" 
                    id="nombre" 
                    placeholder='Añade el nombre del gasto'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label htmlFor="cantidad">Cantidad Gasto</label>
                <input 
                    type="number" 
                    id="cantidad" 
                    placeholder='Añade la cantidad del gasto'
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                />
            </div>
            <div className="campo">
                <label htmlFor="categoria">Categoría</label>
                <select 
                    id="categoria"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
            <input type="submit" value={gastoEditar.nombre ? 'GUARDAR CAMBIOS' : 'NUEVO GASTO'} />
        </form>
    </div>
  )
}

export default Modal