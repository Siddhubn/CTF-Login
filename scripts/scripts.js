document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('team-name').value;
  const password = document.getElementById('password').value;
  fetch('scripts/excel/server.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      let loginSuccess = false;
      rows.forEach(row => {
        if (row[0] === username && row[1] === password) {
          loginSuccess = true;
        }
      });
      if (loginSuccess) {
        const video = document.createElement('video');
        video.src = 'hacked.mp4';
        video.autoplay = true;
        video.loop = false;
        video.style.position = 'fixed';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100vw';  // Full viewport width
        video.style.height = '100vh'; // Full viewport height
        video.style.objectFit = 'cover'; // Cover the whole screen without distortion
        video.style.zIndex = '9999';
        document.body.appendChild(video);

        video.onended = () => {
          window.location.href = 'home.html';
        };
      } else {
        document.getElementById('error-message').style.display = 'block';
      }
    })
    .catch(err => {
      console.error('Error reading Excel file:', err);
      alert('An error occurred while processing the Excel file.');
    });
});

