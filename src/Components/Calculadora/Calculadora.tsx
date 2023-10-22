import { useEffect, useState } from "react";
import Numeros from "../Numeros/Numeros";
import classes from "./Calculadora.module.css";
import Operacoes from "../Operacoes/Operacoes";
import { HiMiniBackspace } from "react-icons/hi2";
const Calculadora = () => {
  const numeros = ["7", "8", "9", "4", "5", "6", "1", "2", "3", ".", "0"];
  const operacoes = [
    { simbolo: "+", operador: "+" },
    { simbolo: "-", operador: "-" },
    { simbolo: "÷", operador: "/" },
    { simbolo: "x", operador: "*" },
    { simbolo: "^", operador: "**" },
  ];

  // Dois estados diferentes onde um é o que aparece no visor, o outro acontece pelos "fundos", pois a conta não aceita os simbolos utilizados no visor.
  const [contaString, setContaString] = useState("");
  const [contaStringVerdadeira, setContaStringVerdadeira] = useState("");

  const [resultado, setResultado] = useState(String);

  // Estado booleano que faz com que quando seja falso impede a adição de outro operador a frente.
  const [ativarOperador, setAtivarOperador] = useState(true);

  // const [ativarParentesesRight, setAtivarParentesesRight] = useState(false);
  // const [ativarParentesesLeft, setAtivarParentesesLeft] = useState(false);

  const [mostrarResultado, setMostrarResultado] = useState(false);

  // useEffect(() => {fazIsso()},[quandoIssoEhAlterado])
  // Ele sempre irá setar o resultado quando "resultado, contaRealizada, resultadoString, contaString" mudarem, pois assim o valor sempre será alterado.
  useEffect(() => {
    console.log({ contaString, contaStringVerdadeira, resultado });
    try {
      // Tente adicionar o resultado normalmente
      if (!ativarOperador) {
        // Se caso tente fazer "0 / 0", o resultado será NaN, então ele retorna isso "Impos. dividir por 0"
        if (Number.isNaN(eval(contaStringVerdadeira))) {
          setResultado("Impos. dividir por 0");
        } else {
          setResultado(eval(contaStringVerdadeira));
        }
      }
    } catch {
      // Evita de resultado tentar fazer um eval em uma string inválida, EX: "45+; ", então ele retorna apenas o numero sem o operador.
      try {
        setResultado(
          eval(
            contaStringVerdadeira.substring(0, contaStringVerdadeira.length - 1)
          )
        );
      } catch {
        // if (!ativarParentesesLeft) {
        setResultado(
          eval(
            contaStringVerdadeira.substring(0, contaStringVerdadeira.length - 1)
          )
        );
      }
    }
    // }
  }, [contaString]);

  return (
    <div className={classes.calculadora_pai}>
      <div className={classes.visor}>
        <div className={classes.numeros_visor}>
          <p>{contaString}</p>
        </div>
        <div className={classes.resultado}>
          <p>
            {mostrarResultado
              ? String(resultado) !==
                contaString.substring(0, contaString.length - 1)
                ? contaString !== String(resultado)
                  ? Number(resultado).toLocaleString() // Se eu apagar tudo aparece *NaN*
                  : ""
                : ""
              : ""}
          </p>
        </div>
      </div>
      <div className={classes.operacoes}>
        <div className={classes.numeros}>
          {/* <button
            onClick={() => {
              if (ativarOperador) {
                // setAtivarParentesesLeft(true);
                // setAtivarParentesesRight(false);
                // if (!ativarParentesesLeft) {
                  setContaString(contaString + "(");
                  setContaStringVerdadeira(contaStringVerdadeira + "(");
                }
              // }
            }}
            className={classes.base_operacoes}
          >{`(`}</button>
          <button
            onClick={() => {
              if (contaString && contaStringVerdadeira !== "") {
                // Evita colocar parenteses na frente da operação
                if (!ativarOperador) {
                  // setAtivarParentesesRight(true);
                  if (ativarParentesesLeft) {
                    setAtivarParentesesLeft(false);
                    setContaString(contaString + ")");
                    setContaStringVerdadeira(contaStringVerdadeira + ")");
                  }
                }
              }
            }}
            className={classes.base_operacoes}
          >{`)`}</button> */}
          {/* Faz um map nos meus números */}
          {numeros.map((numero, index): JSX.Element => {
            // Função para adicionar um número.
            const adicionarNumero = () => {
              // if (!ativarParentesesRight) {

              // Evita o número virar um octal e bugar o código, se caso eles forem igual a zero, eles setam a conta sem o 0 atras, evitando o bug.
              if (contaString && contaStringVerdadeira === "0") {
                setContaString(contaString.substring(1) + numero);
                setContaStringVerdadeira(
                  contaStringVerdadeira.substring(1) + numero
                );
              } else {
                setContaString(contaString + numero);
                setContaStringVerdadeira(contaStringVerdadeira + numero);
              }

              setAtivarOperador(false);
              // }
            };
            // Retorna o elemento números.
            return (
              <Numeros
                key={index}
                setNumero={adicionarNumero}
                numero={numero}
              />
            );
          })}
          <button
            onClick={() => {
              setResultado("0");
              setContaString("0");
              setContaStringVerdadeira("0");
            }}
            className={classes.base_operacoes}
          >
            AT
          </button>
          {/* Botão de apagar, ele faz as duas contas apagarem seu último caractere*/}
          <button
            onClick={() => {
              if (contaString !== "") {
                // setAtivarParentesesLeft(false);
                setAtivarOperador(false);
                setContaString(
                  contaString.substring(0, contaString.length - 1)
                );
                setContaStringVerdadeira(
                  contaStringVerdadeira.substring(
                    0,
                    contaStringVerdadeira.length - 1
                  )
                );
              }
            }}
            className={classes.btn_apagar}
          >
            <HiMiniBackspace />
          </button>
          {/* Botão do resultado, ele seta o resultado dando um eval na conta verdadeira que contém os simbolos certos, 
          seta a contaAnterior com a conta atual e seta a contaRealizada como verdadeira*/}
          <button
            className={classes.res_botao}
            onClick={() => {
              if (contaString !== "") {
                setMostrarResultado(false);
                // Impede que apareça undefined = undefined
                setContaString(String(resultado));
                setContaStringVerdadeira(String(resultado));
              }
            }}
          >
            =
          </button>
        </div>

        <div className={classes.linha_vertical}></div>
        <div className={classes.Operacoes_container}>
          {/* Faz um map nas minhas operacoes */}
          {operacoes.map((operacao, index): JSX.Element => {
            // Função de ativar a operação,
            const ativarOperacao = () => {
              // setAtivarParentesesRight(false)
              setMostrarResultado(true);
              setAtivarOperador(true);
              // Quando minha operação não está ativa, é impossivel adicionar outro operador a frente, só quando ativarOperacao for utilizada, que será quando o operador será ativado, que
              !ativarOperador
                ? (setContaString(`${contaString}${operacao.simbolo}`),
                  setContaStringVerdadeira(
                    `${contaStringVerdadeira}${operacao.operador}`
                  ))
                : null;
            };
            return (
              <div>
                <Operacoes
                  ativarOperacao={ativarOperacao}
                  key={index}
                  operacao={operacao.simbolo}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calculadora;
