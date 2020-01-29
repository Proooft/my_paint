db.createCollection("membres", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "login", "email", "password","admin" ],
         properties: {
            login: {
               bsonType: "string",
            },
            email: {
                bsonType: "string",
            },
            password: {
                bsonType : "string",
            },
            admin: {
                bsonType: "bool"
            }
         }
      }
   }
})