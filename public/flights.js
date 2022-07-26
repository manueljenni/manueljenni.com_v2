'use strict';
const { useState } = React;
const { useEffect } = React;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const e = React.createElement;

function UpcomingFlightsTable(props) {

  const [article, setArticle] = useState();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { height, width } = useWindowDimensions();
  const [showUpcomingTable, setUpcomingTable] = useState(true);

  // Show / hide table when button is pressed
  var toggleButton = document.getElementsByClassName("upcomingFlightsButton");
  Array.from(toggleButton).forEach(element => {
    element.addEventListener("click", function() {
      if (showUpcomingTable == true) {
        element.querySelector('span').innerHTML = "Show";
        setUpcomingTable(false);
      } else {
        element.querySelector('span').innerHTML = "Hide";
        setUpcomingTable(true);
      }
    });
  });

  useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch(
              'https://damp-atoll-27311.herokuapp.com/api/flights/getAllUpcomingFlights'
          );
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          let actualData = await response.json();
          setData(actualData);
          console.log(actualData);
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

    if (showUpcomingTable == true) {
      if (width < 1000) {
        return (
          <div className="table w-full border-collapse border upcomingFlightsButton cursor-pointer" key="table1_mobile">
            <div className="table-header-group font-bold">
              <div className="table-row bg-accentColor">
                <div className="table-cell text-xl px-4 py-4 w-1/2">Origin</div>
                <div className="table-cell text-xl px-4 py-4 w-1/2">Destination</div>
              </div>
            </div>
            <div className="table-row-group">
            {data &&
                data.map(flight => (
                <div key={flight.departureTime + "_" + flight.departure_iata + flight.arrival_iata} className="table-row even:bg-gray-200 hover:bg-accentColorHover hover:cursor-pointer" onClick={() => fitBounds([flight.departure.longitude, flight.departure.latitude], [flight.arrival.longitude, flight.arrival.latitude])}>
                  <div className="table-cell text-xl px-4 py-4"><span className="text-gray-400">{parseDate(flight.departureTime)}</span><br/><b>{flight.departure.city}</b><br/>({flight.departure.iata})</div>
                  <div className="table-cell text-xl px-4 py-4"><span className="text-gray-400">{parseDate(flight.arrivalTime)}</span><br/><b>{flight.arrival.city}</b><br/>({flight.arrival.iata})</div>
                </div>
                ))}
            </div>
          </div>
        );
      } else {
          return (
            <div className="table w-full border-collapse border upcomingFlightsButton cursor-pointer" key="table1_desktop">
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
                <div key={flight.departureTime + "_" + flight.departure_iata + flight.arrival_iata} className="table-row even:bg-gray-200 hover:bg-accentColorHover hover:cursor-pointer" onClick={() => fitBounds([flight.departure.longitude, flight.departure.latitude], [flight.arrival.longitude, flight.arrival.latitude])}>
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
          );
      }
    } else {
      if (width < 1000) {
        return (
          <div className="table w-full border-collapse border pastFlightsButton cursor-pointer" key="table2_mobile_hidden">
          <div className="table-header-group font-bold">
              <div className="table-row bg-gray-200">
                <div className="table-cell text-xl px-4 py-4 w-1/2">Origin</div>
                <div className="table-cell text-xl px-4 py-4 w-1/2">Destination</div>
              </div>
            </div>
        </div>
        )
      } else {
        return (
          <div className="table w-full border-collapse border upcomingFlightsButton cursor-pointer" key="table1_desktop_hidden">
          <div className="table-header-group font-bold">
            <div className="table-row bg-gray-200">
              <div className="table-cell text-xl px-4 py-4">Date</div>
              <div className="table-cell text-xl px-4 py-4">Origin</div>
              <div className="table-cell text-xl px-4 py-4">Destination</div>
              <div className="table-cell text-xl px-4 py-4">Airline</div>
              <div className="table-cell text-xl px-4 py-4">Distance</div>
              <div className="table-cell text-xl px-4 py-4">Duration</div>
            </div>
          </div>
        </div>
        )
      } 
    }
}

const domContainer = document.querySelector('#upcomingFlightsTable');
const root = ReactDOM.createRoot(domContainer);
root.render(<UpcomingFlightsTable />);

function parseDate(input_date) {

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Hov", "Dec"
  ];

  var date = new Date(input_date);

  return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

function PastFlightsTable(props) {

  const [article, setArticle] = useState();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { height, width } = useWindowDimensions();
  const [showTable, setShowTable] = useState(true);

  // Show / hide table when button is pressed
  var pastToggleButton = document.getElementsByClassName("pastFlightsButton");
  Array.from(pastToggleButton).forEach(element => {
    element.addEventListener("click", function() {
      if (showTable == true) {
        element.querySelector('span').innerHTML = "Show";
        setShowTable(false);
      } else {
        element.querySelector('span').innerHTML = "Hide";
        setShowTable(true);
      }
    });
  });

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

    if (showTable == true) {
      // Handle table on mobile
      if (width < 1000) {
        return (
          <div className="table w-full border-collapse border pastFlightsButton cursor-pointer" key="table2_mobile">
            <div className="table-header-group font-bold">
              <div className="table-row bg-accentColor">
                <div className="table-cell text-xl px-4 py-4 w-1/2">Origin</div>
                <div className="table-cell text-xl px-4 py-4 w-1/2">Destination</div>
              </div>
            </div>
            <div className="table-row-group">
            {data &&
                data.map(flight => (
                <div key={flight.departureTime + "_" + flight.departure_iata + flight.arrival_iata} className="table-row even:bg-gray-200 hover:bg-accentColorHover hover:cursor-pointer" onClick={() => fitBounds([flight.departure.longitude, flight.departure.latitude], [flight.arrival.longitude, flight.arrival.latitude])}>
                  <div className="table-cell text-xl px-4 py-4"><span className="text-gray-400">{parseDate(flight.departureTime)}</span><br/><b>{flight.departure.city}</b><br/>({flight.departure.iata})</div>
                  <div className="table-cell text-xl px-4 py-4"><span className="text-gray-400">{parseDate(flight.arrivalTime)}</span><br/><b>{flight.arrival.city}</b><br/>({flight.arrival.iata})</div>
                </div>
                ))}
            </div>
          </div>
        );
      } else {
          return (
            <div className="table w-full border-collapse border pastFlightsButton cursor-pointer" key="table2_desktop">
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
                <div key={flight.departureTime + "_" + flight.departure_iata + flight.arrival_iata} className="table-row even:bg-gray-200 hover:bg-accentColorHover hover:cursor-pointer" onClick={() => fitBounds([flight.departure.longitude, flight.departure.latitude], [flight.arrival.longitude, flight.arrival.latitude])}>
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
          );
      }
    } else {
      if (width < 1000) {
        return (
          <div className="table w-full border-collapse border pastFlightsButton cursor-pointer" key="table2_mobile_hidden">
          <div className="table-header-group font-bold">
              <div className="table-row bg-gray-200">
                <div className="table-cell text-xl px-4 py-4 w-1/2">Origin</div>
                <div className="table-cell text-xl px-4 py-4 w-1/2">Destination</div>
              </div>
            </div>
        </div>
        )
      } else {
        return (
          <div className="table w-full border-collapse border pastFlightsButton cursor-pointer" key="table2_desktop_hidden">
          <div className="table-header-group font-bold">
            <div className="table-row bg-gray-200">
              <div className="table-cell text-xl px-4 py-4">Date</div>
              <div className="table-cell text-xl px-4 py-4">Origin</div>
              <div className="table-cell text-xl px-4 py-4">Destination</div>
              <div className="table-cell text-xl px-4 py-4">Airline</div>
              <div className="table-cell text-xl px-4 py-4">Distance</div>
              <div className="table-cell text-xl px-4 py-4">Duration</div>
            </div>
          </div>
        </div>
        ) 
      }      
    }
}

const domContainer2 = document.querySelector('#pastFlightsTable');
const root2 = ReactDOM.createRoot(domContainer2);
root2.render(<PastFlightsTable />);

function parseDate(input_date) {

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Hov", "Dec"
  ];

  var date = new Date(input_date);

  return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}


function FlightsByTripTable(props) {

  const [article, setArticle] = useState();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { height, width } = useWindowDimensions();

  var tripId = props.tripId;
  // TESTING ONLY
  tripId = '';

  useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch(
              'https://damp-atoll-27311.herokuapp.com/api/flights/getAllUpcomingFlights' + tripId
          );
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          let actualData = await response.json();
          setData(actualData);
          console.log(actualData);
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

    if (width < 1000) {
      return (
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
              <div key={flight.departureTime + "_" + flight.departure_iata + flight.arrival_iata} className="table-row even:bg-gray-200">
                <div className="table-cell text-xl px-4 py-4"><span className="text-gray-400">{parseDate(flight.departureTime)}</span><br/><b>{flight.departure.city}</b><br/>({flight.departure.iata})</div>
                <div className="table-cell text-xl px-4 py-4"><span className="text-gray-400">{parseDate(flight.arrivalTime)}</span><br/><b>{flight.arrival.city}</b><br/>({flight.arrival.iata})</div>
              </div>
              ))}
          </div>
        </div>
      );
    } else {
        return (
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
        );
    }
}

