var router = require("express").Router();

router.use("/api/customer", require("./customer"));
router.use("/api/employee", require("./employee"));
router.use("/api/repairment", require("./repairment"));

module.exports = router;
