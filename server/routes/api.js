const express = require('express')
const router = express.Router()
const request = require('request')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('myTotalySecretKey')
const Location = require('../models/Location')
const Pic = require('../models/Pic')
const Trip = require('../models/Trip')
const User = require('../models/User')
const apiKey = 'AIzaSyDqAA2vF3xOOd_Pcy5SD4Du3MBmbUUAsUo'


router.get('/place/:placeName', function (req, res) {
    const getDistance = function (origin, destination) {
        return `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`
    }

    request(getDistance("ciudad panama", req.params.placeName), function (err, response, body) {
        let data = JSON.parse(body)
        res.send(data)
    })
})

router.get('/location/:place', function (req, res) {
    const getDataPlace = function (place) {
        return `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${apiKey}`
    }
    request(getDataPlace(req.params.place), function (error, response, body) {
        let statusError = JSON.parse(body).status
        if (statusError == "ZERO_RESULTS") {
            res.send({
                name: "Selina Pedasi",
                address: "Calle Agustín Moscoso, Panamá",
                ref: "https://bit.ly/2krEVCZ",
                lat: 7.529823799999999,
                lng: -80.026742
            })
        }
        else {
            let placeData = JSON.parse(body).candidates[0]
            let locale = new Location ({
                name: placeData.name,
                address: placeData.formatted_address,
                ref: placeData.photos[0].photo_reference,
                lat: placeData.geometry.location.lat,
                lng: placeData.geometry.location.lng
            })
            locale.ref = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${locale.ref}&key=${apiKey}`
            locale.save()
            res.send(locale)
        }
    })

})

router.get(`/users`, function (req, res) {
    User.find({}).exec((err, data) => {
        res.send(data)
    })
})

router.post('/newUser', function (req, res) {
    request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.lat},${req.body.lng}&key=AIzaSyDqAA2vF3xOOd_Pcy5SD4Du3MBmbUUAsUo`, function (err, response, body) {
        console.log(body)
        let data = JSON.parse(body).results[0]
        let place = new Location({
            placeId: data.place_id,
            name: data.formatted_address,
            lat: req.body.lat,
            lng: req.body.lng
        })
        let passCryptr = cryptr.encrypt(req.body.password)
        let user = new User({
            
            username: req.body.username,
            password: passCryptr,
            location: {}
        })
        place.save()
        user.save()
        user.location = place
        res.send(data)
    })
    
})

router.get(`/coords/:latlng`, (req, res) => {
    const getPlace = function (latlng) {
        return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=AIzaSyDqAA2vF3xOOd_Pcy5SD4Du3MBmbUUAsUo`
    }
    request(getPlace(req.params.latlng), function (err, response, body) {
        let data = JSON.parse(body)
        let relevant = {
            name: "",

        }
        res.send(data)
    })

})

module.exports = router