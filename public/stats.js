const { useState } = React;
const { useEffect } = React;

const e = React.createElement;


function Stats(props) {

    const [openModal, setOpenModal] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
    const getData = async () => {
        try {
        const response = await fetch(
            'https://damp-atoll-27311.herokuapp.com/api/flights/getStats'
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
        }
    }
    getData()

    }, [])

    return (
        <div class="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-x-6 gap-y-6">
            {data &&
                [...data.statsByYear]
                .sort((a, b) => b.year - a.year)
                .map(stats => (
                <div class="bg-white space-y-2 p-4 rounded-xl" key={stats.year}>
                    <h1 class="text-3xl text-accentColor text-center font-bold">{stats.year}</h1>
                        <hr/>
                        <div>
                            <div class="flex space-x-2 items-center">
                                <h3 class="text-3xl">{stats.flightsCount}</h3>
                                <h3 class="text-xl font-normal">flights</h3>
                            </div>
                            <div class="flex space-x-2 items-center">
                                <h3 class="text-3xl">{Math.floor(stats.duration / 60 / 60)}</h3>
                                <h3 class="text-xl font-normal">hours</h3>
                            </div>
                            <div class="flex space-x-2 items-center">
                                <h3 class="text-3xl">{addSeparator(Math.floor(stats.distance * 1.852))}</h3>
                                <h3 class="text-xl font-normal">km</h3>
                            </div>
                        </div>
                </div>
            ))}
        </div>
    );
}

const domContainer = document.querySelector('#stats');
const root = ReactDOM.createRoot(domContainer);
root.render(<Stats />);

function addSeparator(number) {
    // Info: Die '' sind zwei Hochkommas
    number = '' + number;
    if (number.length > 3) {
      var mod = number.length % 3;
      var output = (mod > 0 ? (number.substring(0,mod)) : '');
      for (var i=0 ; i < Math.floor(number.length / 3); i++) {
        if ((mod == 0) && (i == 0))
          output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
        else
          // hier wird das Trennzeichen festgelegt mit '.'
          output+= "'" + number.substring(mod + 3 * i, mod + 3 * i + 3);
      }
     return (output);
    }
    else return number;
  }