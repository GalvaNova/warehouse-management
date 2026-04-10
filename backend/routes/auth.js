const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    const response = await axios.post(
      `${process.env.API_BASE_URL}/login`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      statusCode: 0,
      message: "Login gagal. Periksa koneksi atau kredensial.",
    });
  }
});

module.exports = router;
