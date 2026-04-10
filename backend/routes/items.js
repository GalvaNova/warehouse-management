const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization;

    const response = await axios.get(`${process.env.API_BASE_URL}/list-items`, {
      headers: {
        Authorization: token,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      statusCode: 0,
      message: "Gagal mengambil data barang.",
    });
  }
});

module.exports = router;
