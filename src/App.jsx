import { useCallback, useState } from "react";
import Table from "./Table";

const INPUT_STATE = {
  interest: "",
  principal: "",
  duration: "",
};

function App() {
  const [data, setData] = useState({ ...INPUT_STATE });
  const [result, setResult] = useState([]);
  const [output, setOutput] = useState({
    principal: "",
    totInt: "",
    totGst: "",
    totDue: "",
  });

  const calcEmiAmt = (p, r, n) => {
    const l = (1 + r) ** n - 1;
    return ((p * r * (1 + r) ** n) / l).toFixed(2);
  };

  const priceFormat = useCallback((val) => `₹ ${(+val)?.toFixed(2)}`, []);

  const calculateEMI = (principal, duration, interest) => {
    let r = +interest / 1200;
    let p = +principal;
    let n = +duration;
    if (!r || !p || !n || isNaN(r) || isNaN(p) || isNaN(n)) return;
    let outstanding = 0;
    const resultObject = [];

    for (let i = 1; i <= n; i++) {
      const emi = calcEmiAmt(data.principal, r, n);
      const int = (p * r).toFixed(2);
      const principalAmt = (emi - int).toFixed(2);
      outstanding += +principalAmt;
      p = (data.principal - +outstanding.toFixed(2)).toFixed(2);
      const gstInt = (int * 0.18).toFixed(2);
      const rObject = {
        emi,
        int,
        principalAmt,
        gstInt,
        outstanding: p,
        period: i,
        finalEMI: (+emi + +gstInt).toFixed(2),
      };
      resultObject.push(rObject);
    }
    const getTotData = resultObject.reduce(
      (acc, item) => {
        return {
          principal: acc.principal,
          totInt: acc.totInt + +item.int,
          totGst: acc.totGst + +item.gstInt,
          totDue: acc.totDue + +item.finalEMI,
        };
      },
      { principal: data.principal, totInt: 0, totGst: 0, totDue: 0 }
    );
    setOutput(getTotData);
    setResult(resultObject);
  };

  const getIntpus = (event) =>
    setData((pre) => ({ ...pre, [event.target.id]: event.target.value }));

  const handleCalculate = () => {
    calculateEMI(data.principal, data.duration, data.interest);
  };

  return (
    <>
      <div className="semibold text-lg">
        <div className="flex justify-center flex-col space-y-2 items-center mt-8">
          <div className="flex flex-col">
            <label htmlFor="principal">Principal</label>
            <input
              id="principal"
              onChange={getIntpus}
              value={data.principal}
              className="appearance-none block w-48 text-2xl bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="principal">Interest</label>
            <input
              id="interest"
              onChange={getIntpus}
              value={data.interest}
              className="appearance-none block w-48 text-2xl bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="principal">Duration Months</label>
            <input
              id="duration"
              onChange={getIntpus}
              value={data.duration}
              className="appearance-none block w-48 text-2xl bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <button
            onClick={handleCalculate}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow pt-2.5 *: w-48"
          >
            Calculate
          </button>
        </div>
        <div className="text-xs sm:text-base space-x-5 font-mono sm:space-x-6 flex flex-row justify-center items-center mt-6 -mb-2">
          <div className="text-center">
            Principal: <p className="text-red-500">{priceFormat(output.principal)}</p>
          </div>
          <div className="text-center">
            Interest: <p className="text-red-500">{priceFormat(output.totInt)}</p>
          </div>
          <div className="text-center">
            GST on Int: <p className="text-red-500">{priceFormat(output.totGst)}</p>
          </div>
          <div className="text-center">
            Gand Mara Gelo: <p className="text-red-500">{priceFormat(output.totDue)}</p>
          </div>
        </div>
        <div className="flex justify-center items-center my-8">
          {result.length ? (
            <Table data={result} priceFormat={priceFormat} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
