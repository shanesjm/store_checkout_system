import { useEffect, useState } from "react";

// const intialState = [[], [2, 9], [3], [4, 5]];

function App() {
  const intialState = {
    1: [8, 11, 33],
    2: [6],
    3: [10, 1],
    4: [5],
  };
  const decreaseCounter = () => {
    const tempData = { ...counterData };

    for (const [key, value] of Object.entries(tempData)) {
      if (value.length) {
        const indx = value.indexOf(value[0]);
        console.log("tempData[key][indx]-1", tempData[key][indx] - 1);
        if (tempData[key][indx] == 0) {
          tempData[key].shift();
        } else {
          tempData[key][indx] = tempData[key][indx] - 1;
        }
      }
    }
    setCounterData(tempData);
  };
  useEffect(() => {
    let interval = setInterval(() => {
      decreaseCounter();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [counterData, setCounterData] = useState(intialState);

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
              <input className="flex-1 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <button className="rounded-full bg-yellow-600 p-2">
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
