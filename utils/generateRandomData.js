import {faker} from "@faker-js/faker";
let generateRandomData={
    firstname : faker.person.firstName(),
    lastname : faker.person.lastName(),
    zip_code : faker.number.int({ min: 40000, max: 50000 }).toString()

}

export default generateRandomData;