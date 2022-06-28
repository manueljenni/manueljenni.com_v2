'use strict';
const { useState } = React;
const { useEffect } = React;

const e = React.createElement;

function AllArticles(props) {

    const [article, setArticle] = useState();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await fetch(
                'https://localhost:8080/api/articles/getAllArticlesSummary'
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
        
        <div class="grid md:grid-cols-2 xl:grid-cols-3 sd:grid-cols-1 gap-x-12 gap-y-12 h-full">
             {loading &&
                <div class=" grid space-y-7">
                    <p>Loading...</p>
                    <div class="bg-gray-100 rounded-lg flex h-44 drop-shadow-md cursor-pointer hover"></div>
                    <div class="bg-gray-100 rounded-lg flex h-44 drop-shadow-md cursor-pointer hover"></div>
                    <div class="bg-gray-100 rounded-lg flex h-44 drop-shadow-md cursor-pointer hover"></div>
                </div>
             }
            {data &&
            data.map(({image, title, summary, category, link}) => (
              <div key={link} class="hover cursor-pointer" id="article">
              <img src={"../" + image} alt="" class="rounded-lg mb-4 drop-shadow-md"/>
              <h1 class="text-3xl mb-1 line-clamp-1">{title}</h1>
              <p class="text-lg line-clamp-2">{summary}</p>
              </div>
            ))}
        </div>
      );
}


const domContainer = document.querySelector('#allArticlesGenerated');
const root = ReactDOM.createRoot(domContainer);
root.render(<AllArticles />);

/*
<div class="hover cursor-pointer" id="article">
                    <img src="/bkk.jpeg" alt="" class="rounded-lg mb-4 drop-shadow-md">
                    <h1 class="text-3xl mb-1 line-clamp-1">Three Days in San Francisco. A very amazing experience test text</h1>
                    <p class="text-lg line-clamp-2">Here's a short report of my three-day trip to San Francisco
                        in November.</p>
                </div>
                <div class="hover cursor-pointer" id="article">
                    <img src="/bkk.jpeg" alt="" class="rounded-lg mb-4 drop-shadow-md">
                    <h1 class="text-3xl mb-1 line-clamp-1">Three Days in San Francisco. A very amazing experience test text</h1>
                    <p class="text-lg line-clamp-2">Here's a short report of my three-day trip to San Francisco
                        in November.</p>
                </div>
                <div class="hover cursor-pointer" id="article">
                    <img src="/bkk.jpeg" alt="" class="rounded-lg mb-4 drop-shadow-md">
                    <h1 class="text-3xl mb-1 line-clamp-1">Three Days in San Francisco. A very amazing experience test text</h1>
                    <p class="text-lg line-clamp-2">Here's a short report of my three-day trip to San Francisco
                        in November.</p>
                </div>
                <div class="hover cursor-pointer" id="article">
                    <img src="/bkk.jpeg" alt="" class="rounded-lg mb-4 drop-shadow-md">
                    <h1 class="text-3xl mb-1 line-clamp-1">Three Days in San Francisco. A very amazing experience test text</h1>
                    <p class="text-lg line-clamp-2">Here's a short report of my three-day trip to San Francisco
                        in November.</p>
                </div>
                <div class="hover cursor-pointer" id="article">
                    <img src="/bkk.jpeg" alt="" class="rounded-lg mb-4 drop-shadow-md">
                    <h1 class="text-3xl mb-1 line-clamp-1">Three Days in San Francisco. A very amazing experience test text</h1>
                    <p class="text-lg line-clamp-2">Here's a short report of my three-day trip to San Francisco
                        in November.</p>
                </div>
                <div class="hover cursor-pointer" id="article">
                    <img src="/bkk.jpeg" alt="" class="rounded-lg mb-4 drop-shadow-md">
                    <h1 class="text-3xl mb-1 line-clamp-1">Three Days in San Francisco. A very amazing experience test text</h1>
                    <p class="text-lg line-clamp-2">Here's a short report of my three-day trip to San Francisco
                        in November.</p>
                </div>
                <div class="hover cursor-pointer" id="article">
                    <img src="/bkk.jpeg" alt="" class="rounded-lg mb-4 drop-shadow-md">
                    <h1 class="text-3xl mb-1 line-clamp-1">Three Days in San Francisco. A very amazing experience test text</h1>
                    <p class="text-lg line-clamp-2">Here's a short report of my three-day trip to San Francisco
                        in November.</p>
                </div>
                */