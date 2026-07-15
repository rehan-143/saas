const express = require("express");
const { createInquiry, getInquiries, deleteInquiry } = require("../controllers/inquiryController");

const router = express.Router();

router.route("/").post(createInquiry).get(getInquiries);
router.route("/:id").delete(deleteInquiry);

module.exports = router;
