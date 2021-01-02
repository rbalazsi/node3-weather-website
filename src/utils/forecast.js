const request = require('postman-request')


const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=8ceda2b43a2414cebbf14b4c5bf2a69f&query=${latitude},${longitude}&units=m`

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather services')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            const current = body.current
            callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out. The humidity is ${current.humidity}%.`)
        }
    })
}

module.exports = forecast