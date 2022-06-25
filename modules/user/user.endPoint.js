const { roles } = require("../../middlwear/auth");

const endPoint = {
    displayProfile :[roles.Admin , roles.User]
}

module.exports  = endPoint