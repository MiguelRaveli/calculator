import classes from "./Operacoes.module.css"
import {MouseEventHandler} from "react"
type operacoes = {
    operacao: String,
    ativarOperacao: MouseEventHandler
}
const Operacoes = ({operacao, ativarOperacao} : operacoes) => {
  return (
    <>
    <div className={classes.Operacoes_container}>
        <button className={classes.Operacoes} onClick={ativarOperacao}>{operacao}</button>
    </div>
    </>
  )
}

export default Operacoes