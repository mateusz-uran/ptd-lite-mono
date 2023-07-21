import axios from 'axios';

const NBP_EURO_API_URL = 'http://api.nbp.pl/api/exchangerates/rates/a/eur/';

module.exports = async (req, res) => {
  try {
    const response = await axios.get(NBP_EURO_API_URL + req.query.date);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};
