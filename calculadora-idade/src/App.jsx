import { useState } from "react";

function App() {
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");

  const [idade, setIdade] = useState("");
  const [idadeDias, setIdadeDias] = useState("");
  const [idadeMeses, setIdadeMeses] = useState("");

  const [erros, setErros] = useState({
    dia: "",
    mes: "",
    ano: "",
  });

  function calcularIdade() {
    if (!validarData()) return;

    const hoje = new Date();

    const diaHoje = hoje.getDate();
    const mesHoje = hoje.getMonth() + 1;
    const anoHoje = hoje.getFullYear();

    let idadeHoje = anoHoje - Number(ano);
    let meses = mesHoje - Number(mes);
    let dias = diaHoje - Number(dia);

    if (dias < 0) {
      meses--;

      const ultimoMes = new Date(anoHoje, mesHoje - 1, 0).getDate();
      dias += ultimoMes;
    }

    if (meses < 0) {
      idadeHoje--;
      meses += 12;
    }

    setIdade(idadeHoje);
    setIdadeMeses(meses);
    setIdadeDias(dias);
  }

  function validarData() {
    let novosErros = { dia: "", mes: "", ano: "" };
    let valido = true;

    if (!dia) {
      novosErros.dia = "This field is required";
      valido = false;
    } else if (Number(dia) < 1 || Number(dia) > 31) {
      novosErros.dia = "Invalid day";
      valido = false;
    }

    if (!mes) {
      novosErros.mes = "This field is required";
      valido = false;
    } else if (Number(mes) < 1 || Number(mes) > 12) {
      novosErros.mes = "Invalid month";
      valido = false;
    }

    if (!ano) {
      novosErros.ano = "This field is required";
      valido = false;
    } else if (Number(ano) > new Date().getFullYear()) {
      novosErros.ano = "Invalid year";
      valido = false;
    }

    setErros(novosErros);
    return valido;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      <div className="bg-white w-full max-w-xl p-6 md:p-10 rounded-2xl shadow-lg">

        {/* INPUTS */}
        <div className="flex gap-4 mb-6">

          {/* DAY */}
          <div className="flex flex-col">
            <label className={`text-xs tracking-widest mb-1 ${erros.dia ? "text-red-500" : "text-gray-500"}`}>
              DAY
            </label>

            <input
              type="number"
              placeholder="DD"
              value={dia}
              onChange={(e) => {
                setDia(e.target.value);
                setErros((prev) => ({ ...prev, dia: "" }));
              }}
              className={`border rounded-lg p-3 w-20 text-2xl font-bold focus:outline-none
              ${erros.dia
                ? "border-red-500 text-red-500"
                : "border-gray-300 focus:border-purple-500"}`}
            />

            {erros.dia && (
              <span className="text-red-500 text-xs mt-1">
                {erros.dia}
              </span>
            )}
          </div>

          {/* MONTH */}
          <div className="flex flex-col">
            <label className={`text-xs tracking-widest mb-1 ${erros.mes ? "text-red-500" : "text-gray-500"}`}>
              MONTH
            </label>

            <input
              type="number"
              placeholder="MM"
              value={mes}
              onChange={(e) => {
                setMes(e.target.value);
                setErros((prev) => ({ ...prev, mes: "" }));
              }}
              className={`border rounded-lg p-3 w-20 text-2xl font-bold focus:outline-none
              ${erros.mes
                ? "border-red-500 text-red-500"
                : "border-gray-300 focus:border-purple-500"}`}
            />

            {erros.mes && (
              <span className="text-red-500 text-xs mt-1">
                {erros.mes}
              </span>
            )}
          </div>

          {/* YEAR */}
          <div className="flex flex-col">
            <label className={`text-xs tracking-widest mb-1 ${erros.ano ? "text-red-500" : "text-gray-500"}`}>
              YEAR
            </label>

            <input
              type="number"
              placeholder="YYYY"
              value={ano}
              onChange={(e) => {
                setAno(e.target.value);
                setErros((prev) => ({ ...prev, ano: "" }));
              }}
              className={`border rounded-lg p-3 w-28 text-2xl font-bold focus:outline-none
              ${erros.ano
                ? "border-red-500 text-red-500"
                : "border-gray-300 focus:border-purple-500"}`}
            />

            {erros.ano && (
              <span className="text-red-500 text-xs mt-1">
                {erros.ano}
              </span>
            )}
          </div>

        </div>

        {/* DIVIDER + BUTTON */}
        <div className="flex items-center mb-8">
          <div className="flex-1 h-[1px] bg-gray-200"></div>

          <button
            type="button"
            onClick={calcularIdade}
            className="bg-purple-500 hover:bg-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center -ml-6 text-2xl"
          >
            ↓
          </button>
        </div>

        {/* RESULTADO */}
        <div className="text-4xl md:text-6xl font-extrabold italic">
          <p>
            <span className="text-purple-500">
              {idade !== "" ? idade : "--"}
            </span>{" "}
            years
          </p>

          <p>
            <span className="text-purple-500">
              {idadeMeses !== "" ? idadeMeses : "--"}
            </span>{" "}
            months
          </p>

          <p>
            <span className="text-purple-500">
              {idadeDias !== "" ? idadeDias : "--"}
            </span>{" "}
            days
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;