const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
    res.send("<h1>Not everything is true from a certain route of view.</h1>").end();
});

module.exports = router;



