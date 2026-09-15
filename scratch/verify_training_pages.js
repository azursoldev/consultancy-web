const http = require('http');

function testUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          hasExactText: body.includes("Don't wait for human error to trigger an NDPC regulatory inquiry. Fill out the brief form to request a tailored training proposal for your organization."),
          hasOldText: body.includes("careless employee email"),
          hasLeadPara: body.includes("Human error is the single greatest vulnerability")
        });
      });
    }).on('error', (e) => resolve({ error: e.message }));
  });
}

async function run() {
  const rootRes = await testUrl('http://localhost:3000/data-privacy-training.html');
  console.log('Root /data-privacy-training.html:', rootRes);

  const servicesRes = await testUrl('http://localhost:3000/services/data-privacy-training.html');
  console.log('Services /services/data-privacy-training.html:', servicesRes);

  const serviceTrainingRes = await testUrl('http://localhost:3000/service-training.html');
  console.log('Root /service-training.html:', serviceTrainingRes);
}

run();
