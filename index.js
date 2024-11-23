const express = require('express');
const axios = require('axios');

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Function to handle GET and POST requests
const makeRequest = async (method, url, data = null) => {
  try {
    const options = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json', // Adjust headers as needed
      },
      data,
    };

    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(`Error with ${method} request to ${url}:`, error.message);
    return { error: error.message };
  }
};

// Route to handle Cloudflare challenge (GET request)
app.get('/handle-cloudflare-challenge', async (req, res) => {
  const url = 'https://challenges.cloudflare.com/cdn-cgi/challenge-platform/h/g/i/8e6f67dbde876ed0/1732346521944/LkZVZDtu6E7w1te';
  const data = await makeRequest('GET', url);
  res.json(data);
});

// Route to handle Cloudflare POST flow
app.post('/post-cloudflare-flow', async (req, res) => {
  const url = 'https://challenges.cloudflare.com/cdn-cgi/challenge-platform/h/g/flow/ov1/764499648:1732343270:O8dogc65W3P8ek2uExz8M1b6VsT7hyUEBmR6qprGut4/8e6f67dbde876ed0/y5fZhutpR66mJaFW8u33K_tNpovSr9lsk0EpIaH26Rc-1732346520-1.1.1.1-iX1tcNu5O_cFRyvN.qMt06jTLSMVuDl5CYoafIrle1z1UlR0P3a2BH1YfZaCqNTP';
  const payload = {
    // Add required POST body data here
  };

  const data = await makeRequest('POST', url, payload);
  res.json(data);
});

// Route to handle Suno client sign-up (POST request)
app.post('/signup', async (req, res) => {
  const url = 'https://clerk.suno.com/v1/client/sign_ups?__clerk_api_version=2021-02-05&_clerk_js_version=5.35.0';
  const payload = {
    // Add sign-up payload here
  };

  const data = await makeRequest('POST', url, payload);
  res.json(data);
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
