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

  var closeButton = document.getElementsByClassName("closeModal");

  Array.from(closeButton).forEach((element, i) => {
    element.addEventListener("click", function() {
      setOpenModal(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpenModal(false);
    }
  })

  var separator = '';

  if (width > 1000) {
    separator = <span className="text-3xl">&#183;</span>;
  }

  return (
    <div>
      {openModal &&
      <div className="modal rounded-lg" id="modal">
        <div className="modal-content">
          <div className="lg:px-8 pt-2 lg:pt-4 flex justify-between">
            <div>
              <div className="sd:flex-col lg:flex lg:space-x-4 mb-2">
                <h1 className="text-3xl font-semibold">Asia Summer 2022</h1>  
                {separator}
                <h1 className="text-3xl text-neutral-800">Aug 2022</h1>
              </div>
            </div>
            <button className="button closeModal h-10 pl-4">Close</button>
          </div>
          <div className="lg:px-8 pb-8">
            <p className="text-2xl text-neutral-600 mb-6">Singapore, Thailand, Indonesia</p>
            <p className="text-lg"><b>Dates:</b> Aug 04, 2022 - Aug 26, 2022</p>
            <p className="text-lg"><b>Duration:</b> 26 days</p>
          </div>
          <div className="lg:px-8 pb-2 lg:pb-4">
            <h1 className="text-3xl text-neutral-800 font-semibold pb-6">Flights</h1>
            <FlightsByTripTable />
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



