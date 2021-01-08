var router = require("express").Router();

router.use("/api/customers", require("./customer"));
router.use("/api/employees", require("./employee"));
router.use("/api/repairments", require("./repairment"));
router.use("/api/login", require("./login"));

module.exports = router;
