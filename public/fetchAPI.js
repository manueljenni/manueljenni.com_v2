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
                'https://localhost:8080/api/articles/getArticleSummaryByCategory?category=featured'
            );
            response.headers("Access-Control-Allow-Origin", "*")
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
        
        <div class="space-y-7">
             {loading && 
                <div class="space-y-7">
                    <div class="bg-white rounded-lg flex h-44 drop-shadow-md cursor-pointer hover"></div>
                    <div class="bg-white rounded-lg flex h-44 drop-shadow-md cursor-pointer hover"></div>
                    <div class="bg-white rounded-lg flex h-44 drop-shadow-md cursor-pointer hover"></div>
                </div>
             }
            {data &&
            data.map(({image, title, summary, category, link}) => (
                <div key={link} class="bg-white rounded-lg flex h-44 drop-shadow-md cursor-pointer hover">
                <img class="object-cover rounded-l-lg w-2/5" src={"../" + image}/>
                <div class="w-3/5 flex items-center">
                    <div class="space-y-3 px-6">
                        <p class="text-sm text-highlightColor-400 uppercase">{category}</p>
                        <p class="text-2.5xl font-semibold font-medium text-neutral-800 leading-7 line-clamp-2">{title}</p>
                        <p class="text-base leading-5 line-clamp-3">{summary}</p>
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
              'https://localhost:8080/api/articles/getArticleSummaryByCategory?category=travel'
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
      
      <div class="space-y-7">
           {loading && 
              <div class="space-y-7">
                  <div class="bg-white rounded-lg flex h-44 drop-shadow-md cursor-pointer hover"></div>
                  <div class="bg-white rounded-lg flex h-44 drop-shadow-md cursor-pointer hover"></div>
                  <div class="bg-white rounded-lg flex h-44 drop-shadow-md cursor-pointer hover"></div>
              </div>
           }
          {data &&
          data.map(({image, title, summary, category, link}) => (
              <div key={link} class="bg-white rounded-lg flex h-44 drop-shadow-md cursor-pointer hover">
              <img class="object-cover rounded-l-lg w-2/5" src={"../" + image}/>
              <div class="w-3/5 flex items-center">
                  <div class="space-y-3 px-6">
                      <p class="text-sm text-highlightColor-400 uppercase">{category}</p>
                      <p class="text-2.5xl font-semibold font-medium text-neutral-800 leading-7 line-clamp-2">{title}</p>
                      <p class="text-base leading-5 line-clamp-3">{summary}</p>
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