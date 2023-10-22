import { MouseEventHandler } from "react"
import classes from "./Numeros.module.css"
type numeroString = {
    numero : String,
    setNumero: MouseEventHandler
}
const Numeros = ({numero, setNumero} : numeroString) => {
  return (
    <div className={classes.container_numeros}>
        <button onClick={setNumero} className={classes.numero}>{numero}</button>
    </div>
  )
}

export default Numeros