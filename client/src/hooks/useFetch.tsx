import React, { useEffect, useState } from 'react';

const APIKEY = import.meta.env.VITE_GIPHY_API;

interface useFetchProps {
  keyword: string;
}

const useFetch = ({ keyword }: useFetchProps) => {
  const [gifUrl, setGifUrl] = useState('');

  const fetchGifs = async () => {
    await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword
        .split(' ')
        .join('')}&limit=1`
    )
      .then((res) => res.json())
      .then(({ data }) => {
        setGifUrl(data?.[0]?.images?.downsized_medium?.url);
        if (!data.length) {
          setGifUrl('https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif');
        }
      })
      .catch((err) => {
        console.log(err);
        setGifUrl('https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif');
      });
  };

  useEffect(() => {
    if (keyword) {
      console.log('keyword: ', keyword.split(' ').join(''));
      fetchGifs();
    }
  }, [keyword]);

  return gifUrl;
};

export default useFetch;
