const axios = require('axios');

class thirdPartyController {

    // http://localhost:3000/third-apis/movies
    static getMovies (req,res,next) {
        const api_key = '8c579dc857a1862236ba48b485717188'

        axios.get('https://api.themoviedb.org/3/movie/upcoming', {
            params: {
              api_key: api_key
            }
          })
          .then(function (response) {
            console.log(response);
            res.status(200).json(response.data)
          })
          .catch(function (error) {
            next(error)
          })
    }

}

module.exports = thirdPartyController