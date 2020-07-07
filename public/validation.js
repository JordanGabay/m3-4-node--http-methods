const { stock, customers } = require('../data/promo')

const isNameExists = info => {
    const {givenName, surname} = info
    
    for(const customer of customers) {
        
        if(givenName.toLowerCase() === customer.givenName.toLowerCase()
            && surname.toLowerCase() === customer.surname.toLocaleLowerCase())
            return {"status": "error", "error": "repeat-customer"}
        }
        return {"status": "success"}
        
}

const isEmailExists = info => {
    const {email} = info
    
    for(const customer of customers) 
        // console.log(email, promoEmail, promoEmail === email)
        if(customer.email === email)
        return {"status": "error", "error": "repeat-customer"}
        
        return {"status": "success"}
    }

const isAddressExists = info => {
    const {address} = info
    
    for(const customer of customers) 

        if(customer.address.toLowerCase() === address.toLowerCase()) 
            return {"status": "error", "error": "repeat-customer"}
    return {"status":"succes"}

}

const isInCanada = info => {
    const {country} = info

        if(country.toLowerCase() === 'canada')
        return {"status": "success"}
        else
        return {"status": "error", "error": "undeliverable"}
    
}

const isInStock = info => {
    const {order, size} = info


    const isValid = findItem(order, size, stock)

    return isValid
}

const findItem = (key, value, object) => {

    

    for(const item in object) {
        if(key === item) {
        if(value === 'undefined') {//Bottles & Socks
            if(Number(object[item]) > 0)
            return {"status":"success"}
    
        } else { // Shirt

        return findItem(value, 'undefined', object[item])
    }
}
}
return {"status": "error", "error": "unavailable"}
}



const validate = info => {
    // const userExists = isNameExists(info)
    // const emailExists = isEmailExists(info)
    // const addressExists = isAddressExists(info)
    // const addressInCanada = isInCanada(info)
    // const itemInStock = isInStock(info)

    const validationMethods = [
        isNameExists, isEmailExists, isAddressExists, isInCanada, isInStock
    ]

    let isValid

    for(const validationMethod of validationMethods) {
         isValid = validationMethod(info)
        if(isValid.status === "error") return isValid  
    }

    return isValid


    // console.log(userExists, emailExists,addressExists, addressInCanada, itemInStock)
    // return (userExists && emailExists && addressExists 
    // && addressInCanada && itemInStock)
}



module.exports = { validate }