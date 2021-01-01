const request = require('postman-request')


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmJhbGF6c2kiLCJhIjoiY2tqMjFldzJ5MHFmNTJzbGdrNjNia2xhaSJ9.iV88xbUq_BB3n9OqwNBFvw&limit=1`

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('No matching results', undefined)
        } else {
            const center = body.features[0].center
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode