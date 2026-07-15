const mongoose = require("mongoose");
const Inquiry = require("../models/Inquiry");

// POST /api/inquiry
async function createInquiry(req, res, next) {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
}

// GET /api/inquiry
async function getInquiries(req, res, next) {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/inquiry/:id
async function deleteInquiry(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid inquiry id" });
    }

    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
}

module.exports = { createInquiry, getInquiries, deleteInquiry };
