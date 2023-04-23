const jwt =  require('express-jwt')
const secret= process.env.JWT_Key;
const {getUserDataByid} = require('../queries/users');
const {getAdminDataByid} = require('../queries/users');
const {getPowerUserByid} = require('../queries/users');
const {getSupportByid} = require('../queries/users');

module.exports = authorize;

function authorize(roles = []) {

    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        /* authenticate JWT token and attach user to request object (req.user) */
        jwt({ secret:secret, algorithms: ['HS256'] }),

        /* authorize based on user role */
        (req, res, next) => {
                        
            if (roles.length && !roles.includes(req.user.roles)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }
            switch (req.user.roles) {
            case 'User':
                getUserDataByid(req.user.id).then(
                    user => {
                        if (user) {
                            req.user = user
                            req.userType = 'User'
                            next()
                        } else {
                        return res.status(404).json({ message: 'User Not Found' })
                        }
                    }
                )
            break

            case 'Admin':
                getAdminDataByid({id:req.user.id}).then(
                    user => {
                        if (user) {
                            req.user = user
                            req.userType = 'Admin'
                            next()
                        } else {
                        return res.status(404).json({ message: 'User Not Found' })
                        }
                    }
                )
            break

            case 'PowerUser':
                getPowerUserByid(req.user.id).then(
                    user => {
                        if (user) {
                            req.user = user
                            req.userType = 'PowerUser'
                            next()
                        } else {
                        return res.status(404).json({ message: 'User Not Found' })
                        }
                    }
                )
            break

            case 'Support':
                getSupportByid(req.user.id).then(
                    user => {
                        if (user) {
                            req.user = user
                            req.userType = 'Support'
                            next()
                        } else {
                        return res.status(404).json({ message: 'User Not Found' })
                        }
                    }
                )
            break
            
            default:
                return res.status(404).json({ message: 'Unauthorized' })

            }
        }
    ]
}