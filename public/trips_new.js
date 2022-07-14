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

  return (
    <div>
      {openModal &&
      <div className="modal rounded-lg" id="modal">
        <div className="modal-content">
          <div className="px-8 flex justify-between">
            <div>
              <div className="sd:flex-col lg:flex space-x-4 mb-2">
                <h1 className="text-3xl font-semibold">Asia Summer 2022</h1>              
                <h1 className="text-3xl text-neutral-800">Aug 2022</h1>
              </div>
            </div>
            <button className="button m-12 closeModal">Close</button>
          </div>
          <div className="px-8">
            <p className="text-2xl text-neutral-600">Singapore, Thailand, Indonesia</p>
            <p className="text-lg"><b>Dates:</b> Aug 04, 2022 - Aug 26, 2022</p>
            <p className="text-lg"><b>Duration:</b> 26 days</p>
          </div>
          <div className="px-8">
            <h1 className="text-3xl text-neutral-800 font-semibold">Flights</h1>
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



