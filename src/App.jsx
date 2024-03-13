import { useEffect, useState } from "react";

const initialState = {
  1: [12, 9, 7],
  2: [15],
  3: [10, 1],
  4: [16],
};

function App() {
  const [counterData, setCounterData] = useState(initialState);
  const [productsForQueue, setProductsForQueue] = useState("");

  const handleCheckout = () => {
    let leastNoOfProducts = Number.MAX_VALUE;
    let counterNumber = 1;
    for (const [key, value] of Object.entries(counterData)) {
      if (!value.length) {
        counterNumber = key;
        break;
      } else {
        const totalProductsInCounter = value.reduce((acc, currentVal) => {
          return acc + currentVal;
        }, 0);

        if (totalProductsInCounter < leastNoOfProducts) {
          leastNoOfProducts = totalProductsInCounter;
          counterNumber = key;
        }
      }
    }

    alert(`Please go to counter numnber ${counterNumber}.`);

    setProductsForQueue("");
  };
  useEffect(() => {
    let interval = setInterval(() => {
      decreaseCounter();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const decreaseCounter = () => {
    const tempData = { ...counterData };

    for (const [key, value] of Object.entries(tempData)) {
      if (value.length) {
        const indx = value.indexOf(value[0]);
        if (tempData[key][indx] == 0) {
          tempData[key].shift();
        } else {
          tempData[key][indx] = tempData[key][indx] - 1;
        }
      }
    }
    setCounterData(tempData);
  };

  let counterDataList = [];

  for (const [key, value] of Object.entries(counterData)) {
    counterDataList.push(
      <>
        <div className="flex-1">
          Counter {key}
          {value.map((value, indx) => (
            <div key={indx}>
              {indx == 0
                ? `Checking out ${value} products`
                : `Waiting in Queue with ${value} products`}
            </div>
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container m-12 p-12">
        <div className="p-10">
          <label
            htmlFor="products"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter the number of products
          </label>
          <div className="flex gap-2 mt-2 rounded-md shadow-sm">
            <div>
              <input
                className="flex-1 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={productsForQueue}
                onChange={(e) => setProductsForQueue(e.target.value)}
              />
            </div>
            <button
              className="rounded-full bg-yellow-600 p-2"
              onClick={handleCheckout}
            >
              Checkout Queue
            </button>
          </div>
        </div>

        <h1>Counters</h1>
        <div>{}</div>
        <div className="flex flex-row">{counterDataList}</div>
      </div>
    </>
  );
}

export default App;
