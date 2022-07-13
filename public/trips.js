'use strict';
const { useState } = React;
const { useEffect } = React;

const e = React.createElement;

function ReactModal(props) {

  const [openModal, setOpenModal] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          'https://damp-atoll-27311.herokuapp.com/api/flights/getAllPastFlights'
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setData(actualData);
        setError(null);
      } catch(err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }  
    }
    getData()

  }, [])

  var openButton = document.getElementsByClassName("openModal")[0];

  openButton.addEventListener("click", function() {
    setOpenModal(true);
  });

  if (width < 850) {
    return (
      <div>
        {openModal &&
          <div className="modal rounded-lg" id="modal">
            <div className="modal-content">
              <div className="p-8">
                <div className="flex space-x-4 mb-2">
                  <h1 className="text-3xl font-semibold">Asia Summer 2022</h1>
                  <span className="text-3xl text-neutral-800">&#183;</span>
                  <h1 className="text-3xl text-neutral-800">Aug 2022</h1>
                </div>
                <p className="text-2xl text-neutral-600">Singapore, Thailand, Indonesia</p>
              </div>
              <div className="p-8">
                <div className="table w-full border-collapse border" key="table1">
                  <div className="table-header-group font-bold">
                    <div className="table-row bg-accentColor">
                      <div className="table-cell text-xl px-4 py-4 w-1/2">Origin</div>
                      <div className="table-cell text-xl px-4 py-4 w-1/2">Destination</div>
                    </div>
                  </div>
                  <div className="table-row-group">
                  {data &&
                      data.map(flight => (
                      <div key={flight.departureTime + "_" + flight.departure_iata + flight.arrival_iata} className="table-row even:bg-gray-200 hover:bg-accentColorHover hover:cursor-pointer">
                        <div className="table-cell text-xl px-4 py-4"><span className="text-gray-400">{parseDate(flight.departureTime)}</span><br/><b>{flight.departure.city}</b><br/>({flight.departure.iata})</div>
                        <div className="table-cell text-xl px-4 py-4"><span className="text-gray-400">{parseDate(flight.arrivalTime)}</span><br/><b>{flight.arrival.city}</b><br/>({flight.arrival.iata})</div>
                      </div>
                      ))}
                  </div>
                </div>
              </div>
            </div> 
          </div>
        }
      </div>
    );
  } else {
      return (
        <div>
        {openModal &&
          <div className="modal rounded-lg" id="modal">
            <div className="modal-content">
              <div className="p-8">
                <div className="flex space-x-4 mb-2">
                  <h1 className="text-3xl font-semibold">Asia Summer 2022</h1>
                  <span className="text-3xl text-neutral-800">&#183;</span>
                  <h1 className="text-3xl text-neutral-800">Aug 2022</h1>
                </div>
                <p className="text-2xl text-neutral-600">Singapore, Thailand, Indonesia</p>
              </div>
              <div className="p-8">
              <h1 className="text-3xl text-neutral-800 mb-8"><mark>Flights</mark></h1>
                <div className="table w-full border-collapse border" key="table1">
                <div className="table-header-group font-bold">
                  <div className="table-row bg-accentColor">
                    <div className="table-cell text-xl px-4 py-4">Date</div>
                    <div className="table-cell text-xl px-4 py-4">Origin</div>
                    <div className="table-cell text-xl px-4 py-4">Destination</div>
                    <div className="table-cell text-xl px-4 py-4">Airline</div>
                    <div className="table-cell text-xl px-4 py-4">Distance</div>
                    <div className="table-cell text-xl px-4 py-4">Duration</div>
                    </div>
                  </div>
                  <div className="table-row-group">
                  {data &&
                    data.map(flight => (
                    <div key={flight.departureTime + "_" + flight.departure_iata + flight.arrival_iata} className="table-row even:bg-gray-200">
                      <div className="table-cell text-xl px-4 py-4 whitespace-nowrap">{parseDate(flight.departureTime)}</div>
                      <div className="table-cell text-xl px-4 py-4"><b>{flight.departure.city}</b> ({flight.departure.iata})<br/><p className="text-lg text-gray-400">{flight.departure.countryName}</p></div>
                      <div className="table-cell text-xl px-4 py-4"><b>{flight.arrival.city}</b> ({flight.arrival.iata})<br/><p className="text-lg text-gray-400">{flight.arrival.countryName}</p></div>
                      <div className="table-cell text-xl px-4 py-4">{flight.airline.name}<br/><p className="text-lg text-gray-400">{flight.airline.code} {flight.flightNumber}</p></div>
                      <div className="table-cell text-xl px-4 py-4 whitespace-nowrap">{Math.round((flight.miles * 1.852))} km<br/><p className="text-lg text-gray-400">{flight.miles} nmi</p></div>
                      <div className="table-cell text-xl px-4 py-4 whitespace-nowrap">{Math.round((flight.duration / 3600) * 100) / 100} h</div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            </div> 
          </div>
        }
      </div>
      );
  }
}

const domContainer2 = document.querySelector('#modal');
const root2 = ReactDOM.createRoot(domContainer2);
root2.render(<ReactModal />);



