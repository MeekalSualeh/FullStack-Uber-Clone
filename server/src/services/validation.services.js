const { z } = require("zod")

const userLoginSchema = z.object({
    email:z
    .email({ message: "Enter valid email" })
    .nonempty({ message: "Email cannot be empty" }),

    password:z
    .string()
    .trim()
    .min(8, { message: "Password must be atleast 8 characters long" })
    .nonempty({ message: "Password cannot be empty" })

})

const userSignupSchema = userLoginSchema.extend({
        firstname:z
        .string()
        .trim()
        .min(3, { message: "fullname must be atleast 3 characters long" }),
        
        lastname:z
        .string()
        .trim()
        .optional(),
})

const captainSignupSchema = userSignupSchema.extend({
        type:z
        .enum(["auto", "moto", "car"], { message: "Invalid vehicle type"}),

        color:z
        .string()
        .trim()
        .min(3, { message: "color must be atleast 3 characters long" }),

        plate:z
        .string()
        .trim()
        .min(5, { message: "plate must be atleast 5 characters long" }),

        capacity:z
        .number()
        .min(1, { message: "Capacity must be atleast 1" })
})

const rideSchema = z.object({    
    pickupCoordinates:z
    .array(z.number(),{
        required_error: "Pickup coordinate are required",
        invalid_type_error: "Coordinates must be number"
    }).length(2, { message: "Only need Longitude and latitude" }),

    destinationCoordinates:z
    .array(z.number(),{
        required_error: "Destination coordinate are required",
        invalid_type_error: "Coordinates must be number"
    }).length(2, { message: "Only need Longitude and latitude" }),

    expectedDistance:z
    .number({ required_error: "distance is required" })
    .min(1, { message: "Distance cannot be less than 1m"}),

    expectedTime:z
    .number({ required_error: "time is required" })
    .min(1, { message: "time cannot be less than 1s"}),

    fare:z
    .number({ required_error: "fare is required" })
    .min(20, { message: "fare cannot be less than 20"}),

    type:z
    .enum(["car", "auto", "moto"], { message: "type can only be auto, moto or car" })

})

module.exports = {
    userLoginSchema,
    userSignupSchema,
    captainSignupSchema,
    rideSchema
}