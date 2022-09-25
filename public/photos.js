'use strict';
const { useState } = React;
const { useEffect } = React;

const e = React.createElement;

function PhotoGrid(props) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          'https://damp-atoll-27311.herokuapp.com/api/photos/getAllPhotos'
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

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-0">
      {loading &&
        <div>
            <p>Loading...</p>
        </div>
      }
      {data &&
        data.map(photo => {
          <img src={"/img/" + photo.name} alt={photo.title}></img>
        })
      }
      {!data &&
        <div>
            <p>No photos found :(</p>
        </div>
      }
      
    </div>
  )
}

const domContainer = document.querySelector('#photoGrid');
const root = ReactDOM.createRoot(domContainer);
root.render(<PhotoGrid />);