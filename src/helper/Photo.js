import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios'


const BannerPhoto = () => {
    const url = "https://api.pexels.com/v1/search?query=people"
    const apiKey = "40fIwnGOcF0PNGPtgXs7ugv7trP4DMj5iUZzte2LbNWLmpQM4si9kREk";
    const query = 'people';
    useEffect(() => {
        axios.get(url, {
            headers: {
                Authorization: apiKey,
            },
            params: {
                query: query,
            },
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            });


    }, []);

}
export default BannerPhoto