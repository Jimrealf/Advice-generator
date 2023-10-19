import { useState, useEffect } from "react";
import "./App.css";
import Loading from "./Loading";
const url = " https://api.adviceslip.com/advice";

function App() {
  const [loading, setLoading] = useState(true);
  const [dataSlip, setDataSlip] = useState({ id: "", advice: "" });

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      const fetchedSlip = data.slip;

      setTimeout(() => {
        setLoading(false);
        setDataSlip({ id: fetchedSlip.id, advice: fetchedSlip.advice });
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  } else {
    return (
      <main>
        <div className="container">
          <h1 className="heading">Advice #{dataSlip.id}</h1>
          <p className="content">{dataSlip.advice}</p>
          <img className="line" src="/line.svg" alt="line" />
          <a className="dice" href="../index.html">
            <img src="/dice.svg" alt="dice" />
          </a>
        </div>
      </main>
    );
  }
}

export default App;
