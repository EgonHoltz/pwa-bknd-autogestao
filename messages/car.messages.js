module.exports = {
    success: {
        s0: {
            code: "CarCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "CarUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "CarFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "CarDeleted",
            type: "success"
        },
        s4: {
            http: 204,
            code: "NoCars",
            type: "success"
        },        
        s5: {
            http: 200,
            code: "MaintenanceUpdated",
            type: "success"
        },        
        s6: {
            http: 200,
            code: "RefuelUpdated",
            type: "success"
        },
    },
    error: {
        e0: {
            http: 404,
            code: "CarNotFound",
            type: "error"
        }
    }
}