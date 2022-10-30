'use strict';
const { useState } = React;
const { useEffect } = React;

const e = React.createElement;

function FeaturedArticles(props) {

  const [article, setArticle] = useState();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch(
              'https://damp-atoll-27311.herokuapp.com/api/articles/getArticleSummaryByCategory?category=featured'
          );
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          let actualData = await response.json();
          setData(actualData);
          console.log(actualData)
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
      
      <div className="space-y-7">
           {loading && 
              <div className="space-y-7">
                  <div className="bg-white rounded-lg flex h-44 drop-shadow-md cursor-pointer hover"></div>
                  <div className="bg-white rounded-lg flex h-44 drop-shadow-md cursor-pointer hover"></div>
                  <div className="bg-white rounded-lg flex h-44 drop-shadow-md cursor-pointer hover"></div>
              </div>
           }
          {data &&
          data.reverse().map(({image, title, summary, category, link}) => (
              <div key={link} className="bg-white rounded-lg flex drop-shadow-md cursor-pointer hover h-fit max-h-72" onClick={() => window.location.href= ('articles/' + link)}>
              <img className="hidden md:block md:w-2/5 object-cover rounded-l-lg" src={"img/articles/" + image}/>
              <div className="w-full md:w-3/5 md:flex items-center">
                  <div className="space-y-1 md:space-y-3 px-6 py-4">
                      <p className="text-sm text-highlightColor-400 uppercase">{category}</p>
                      <p className="text-2xl md:text-2.5xl font-semibold font-medium text-neutral-800 leading-8 md:line-clamp-2 hyphens-auto">{title}</p>
                      <p className="text-base leading-5 line-clamp-4 md:line-clamp-3">{summary}</p>
                  </div>
              </div>
             </div>
          ))}
      </div>
    );    
}


const domContainer = document.querySelector('#featuredArticlesGenerated');
const root = ReactDOM.createRoot(domContainer);
root.render(<FeaturedArticles />);

function TravelArticles(props) {

  const [article, setArticle] = useState();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch(
              'https://damp-atoll-27311.herokuapp.com/api/articles/getArticleSummaryByCategory?category=travel'
          );
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          let actualData = await response.json();
          setData(actualData);
          console.log(actualData)
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
      
      <div className="space-y-7">
           {loading && 
              <div className="space-y-7">
                  <div className="bg-white rounded-lg flex h-44 drop-shadow-md cursor-pointer hover"></div>
                  <div className="bg-white rounded-lg flex h-44 drop-shadow-md cursor-pointer hover"></div>
                  <div className="bg-white rounded-lg flex h-44 drop-shadow-md cursor-pointer hover"></div>
              </div>
           }
          {data &&
          data.reverse().map(({image, title, summary, category, link}) => (
              <div key={link} className="bg-white rounded-lg flex drop-shadow-md cursor-pointer hover h-fit" onClick={() => window.location.href= ('articles/' + link)}>
              <img className="hidden md:block md:w-2/5 object-cover rounded-l-lg" src={"img/articles/" + image}/>
              <div className="w-full md:w-3/5 md:flex items-center">
                  <div className="space-y-1 md:space-y-3 px-6 py-4">
                      <p className="text-sm text-highlightColor-400 uppercase">{category}</p>
                      <p className="text-2xl md:text-2.5xl font-semibold font-medium text-neutral-800 leading-8 md:line-clamp-2 hyphens-auto">{title}</p>
                      <p className="text-base leading-5 line-clamp-4 md:line-clamp-3">{summary}</p>
                  </div>
              </div>
             </div>
          ))}
      </div>
    );    
}

const domContainer2 = document.querySelector('#travelArticlesGenerated');
const root2 = ReactDOM.createRoot(domContainer2);
root2.render(<TravelArticles />);