var router = require("express").Router();

router.use("/api/customers", require("./customer"));
router.use("/api/employees", require("./employee"));
router.use("/api/repairments", require("./repairment"));

module.exports = router;
