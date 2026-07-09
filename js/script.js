// Find the date picker inputs and the gallery area on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const gallery = document.getElementById('gallery');
const getImagesButton = document.querySelector('button');

// NASA API key for demo use
const apiKey = 'vkrEh4VImCEA9KuL5Uw3YkK34UuRcCI68MNYXI3z';

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// Show a loading message while the NASA data is being fetched
function showLoadingMessage() {
  gallery.innerHTML = '<div class="placeholder"><p>Loading NASA images...</p></div>';
}

// Show a friendly message when there is no data or an error
function showMessage(message) {
  gallery.innerHTML = `
    <div class="placeholder">
      <div class="placeholder-icon">🚀</div>
      <p>${message}</p>
    </div>
  `;
}

// Fetch space images from NASA's APOD API
function getSpaceImages() {
  const startDate = startInput.value;
  const endDate = endInput.value;

  showLoadingMessage();

  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const imageItems = data.filter((item) => item.media_type === 'image');

      if (imageItems.length === 0) {
        showMessage('No images were found for that date range.');
        return;
      }

      gallery.innerHTML = imageItems.map((item) => {
        return `
          <div class="gallery-item">
            <img src="${item.url}" alt="${item.title}" />
            <h3>${item.title}</h3>
            <p>${item.date}</p>
            <p>${item.explanation}</p>
          </div>
        `;
      }).join('');
    })
    .catch((error) => {
      console.error(error);
      showMessage('Unable to load NASA images right now. Please try again.');
    });
}

// Run the fetch when the button is clicked
getImagesButton.addEventListener('click', getSpaceImages);

// Load the default range when the page opens
getSpaceImages();
