'use strict';
const { useState } = React;
const { useEffect } = React;

const e = React.createElement;

function ReactModal(props) {

  const [openModal, setOpenModal] = useState(false);
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

  var openButton = document.getElementsByClassName("openModal");

  Array.from(openButton).forEach((element, i) => {
    element.addEventListener("click", function() {
      setOpenModal(true);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpenModal(false);
    }
  })

  return (
    <div>
      {openModal &&
      <div className="modal rounded-lg" id="modal">
        <div className="modal-content">
          <div className="p-8">
            <div className="sd:flex-col lg:flex lg:space-x-4 mb-2">
              <h1 className="text-3xl font-semibold">Asia Summer 2022</h1>              
              <h1 className="text-3xl text-neutral-800">Aug 2022</h1>
            </div>
            <p className="text-2xl text-neutral-600">Singapore, Thailand, Indonesia</p>
          </div>
          <div className="px-8">
            <h1 className="text-3xl text-neutral-800 font-semibold p-8">Flights</h1>
            <UpcomingFlightsTable />
          </div>
        </div> 
      </div>
    }
    </div>
  )
}

const domContainer2 = document.querySelector('#modal');
const root2 = ReactDOM.createRoot(domContainer2);
root2.render(<ReactModal />);



