const routes = require ('express').Router();
const {login} = require('../middlewares/auth');
const {get,insert} = require('../controllers/users');

routes.get('/',login,get);
routes.post('/',login, insert);

module.exports = {
    
}