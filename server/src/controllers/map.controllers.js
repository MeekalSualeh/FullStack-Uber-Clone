    const { validationResult } = require("express-validator")
    const axios = require("axios")
    const cache = require("../services/cache.services")

    const handleGettingCoordinates = async (req, res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors)
            return res.status(400).json({ error: errors.array()[0].msg })
        }

        const { address } = req.query;

        if(!address){
            return res.status(400).json({error: "Enter address"})
        }

        let location;
        if(cache.has(`coordinates:${address}`)){
            location = cache.get(`coordinates:${address}`)

        } else {
            try {
                const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`,{
                    params:{
                        address,
                        key: process.env.GOOGLE_MAPS_API_KEY
                    }
                });
            
                if(response.data.status !== "OK"){
                    return res.status(404).json({ error: "Coordinates not found" })
                }
            
                location = response.data.results[0].geometry.location;
                cache.set(`coordinates:${address}`, location, 180)
        
            } catch (error) {
                console.log(error)
                return res.status(500).json({ error: error.message })
            }
        }

        return res.status(200).json(location)
    }

    const handleGettingDistanceTime = async (req, res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ error: errors.array()[0].msg })
        }

        const { origins, destinations } = req.query;

        if(!origins || !destinations){
            return res.status(400).json({error: "Enter origin and destination both"})
        }

        let data;
        if(cache.has(`timeAndDistance:${origins},${destinations}`)){
            data = cache.get(`timeAndDistance:${origins},${destinations}`)

        } else{
            try {
                const response = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
                    params:{
                        origins,
                        destinations,
                        key: process.env.GOOGLE_MAPS_API_KEY
                    }
                })

                if(response.data.status !== "OK" || response.data.rows[0].elements[0].status === "ZERO_RESULTS"){
                    return res.status(400).json({error: "Cannot get time and distance"})
                }
        
                data = response.data.rows[0].elements[0];
                cache.set(`timeAndDistance:${origins},${destinations}`, data, 180)
                
            } catch (error) {
                console.log(error)
                return res.status(500).json({error: error.message})
            }
        }
        
        return res.status(200).json(data)
    }

    const handleGettingSuggestions = async (req, res) =>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ error: errors.array()[0].msg })
        }

        const { input } = req.query;

        if(!input){
            return res.status(400).json({error: "Invalid input for suggestions"})
        }

        let data;
        if(cache.has(`suggestions:${input}`)){
            data = cache.get(`suggestions:${input}`)

        } else{

            try {
                const response = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json",{
                    params:{
                        input,
                        key:process.env.GOOGLE_MAPS_API_KEY
                    }
                })

                if(response.data.status !== "OK"){
                    return res.status(400).json({error: "suggestions not found"})
                }
        
                data = response.data.predictions
                cache.set(`suggestions:${input}`, data, 180)
                
            } catch (error) {
                console.log(error);
                return res.status(500).json({error: error.message})
            }
        }
        
        return res.status(200).json(data)
    }

    const handleGettingFares = async (req, res) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({error: errors.array()[0].msg})
        }

        let { distance, time } = req.query;

        if(!distance || !time){
            return res.status(400).json("distance and time cannot be empty")
        }

        distance /= 1000;
        time /= 60;
        let fare;

        if(cache.has(`fares:${time},${distance}`)){
            fare = cache.get(`fares:${time},${distance}`) 

        } else{
            const car = {
                baseFare: 50,
                perKmRate: 15,
                perMinRate: 3
            }
            const moto = {
                baseFare: 20,
                perKmRate: 8,
                perMinRate: 1.5
            }
            const auto = {
                baseFare: 30,
                perKmRate: 10,
                perMinRate: 2
            }
        
            fare = {
                car: Math.floor(car.baseFare + ( car.perKmRate * distance ) + ( car.perMinRate * time)) ,
                moto: Math.floor(moto.baseFare + ( moto.perKmRate * distance ) + ( moto.perMinRate * time )),
                auto: Math.floor(auto.baseFare + ( auto.perKmRate * distance ) + ( auto.perMinRate * time ))
            }

            cache.set(`fares:${time},${distance}`, fare, 180)
        }

        res.status(200).json(fare)
    }

    module.exports = {
        handleGettingCoordinates,
        handleGettingDistanceTime,
        handleGettingSuggestions,
        handleGettingFares
    }


    // for address:
    // video: https://maps.googleapis.com/maps/api/geocode/json/
    // response is in const location = response.data.results[0].geomery.location
    // status is in response.data.status === "OK"
    // yours: https://maps.googleapis.com/maps/api/place/details/json,

    // for suggestions:
    // video: https://maps.googleapis.com/maps/api/place/autocomplete/json
    // status is in response.data.status === "OK"
    // response is in response.data.predictions
    // yours: https://maps.googleapis.com/maps/api/place/autocomplete/json,
    
    // for distance-time:
    // video: https://maps.googleapis.com/maps/api/distancematrix/json
    // status is in response.data.rows[0].elements[0].status === "ZERO_RESULTS"
    // response is in response.data.rows[0].elements[0]
    // yours: https://maps.googleapis.com/maps/api/distancematrix/json

    // har type k query variables ko proper regex se bhi validate krna