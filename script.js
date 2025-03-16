const ACCESS_KEY = '6MhYglr2-D_qCUR4w1J897Y3ipVVCdsFFvGCmlZU4F8';

const apiUrl = 'https://api.unsplash.com/search/photos';
const searchInput = document.getElementById('searchQuery');
const imageResults = document.getElementById('imageResults');

function clearImages() {
  imageResults.innerHTML = '';
}

function displayImages(images) {
  clearImages();
  images.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.urls.small;
    img.alt = photo.alt_description || 'Unsplash Image';
    imageResults.appendChild(img);
  });
}

function searchXHR() {
  const query = searchInput.value.trim();
  if (!query) return alert('اكتب كلمة بحث!');

  const xhr = new XMLHttpRequest();
  const url = `${apiUrl}?query=${query}&client_id=${ACCESS_KEY}`;

  console.log('XHR Request URL:', url);

  xhr.open('GET', url);
  xhr.onload = function() {
    console.log('XHR status:', xhr.status);
    console.log('XHR response:', xhr.responseText);

    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      displayImages(data.results);
    } else {
      alert(`XHR request failed! Status: ${xhr.status}`);
    }
  };
  xhr.onerror = function() {
    alert('XHR request error!');
  };
  xhr.send();
}

function searchFetch() {
  const query = searchInput.value.trim();
  if (!query) return alert('اكتب كلمة بحث!');

  const url = `${apiUrl}?query=${query}&client_id=${ACCESS_KEY}`;
  console.log('Fetch Request URL:', url);

  fetch(url)
    .then(response => {
      console.log('Fetch status:', response.status);
      if (!response.ok) throw new Error(`Fetch request failed! Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log('Fetch response:', data);
      displayImages(data.results);
    })
    .catch(error => {
      alert(error.message);
    });
}

async function searchAsyncAwait() {
  const query = searchInput.value.trim();
  if (!query) return alert('اكتب كلمة بحث!');

  const url = `${apiUrl}?query=${query}&client_id=${ACCESS_KEY}`;
  console.log('Async/Await Request URL:', url);

  try {
    const response = await fetch(url);
    console.log('Async/Await status:', response.status);
    if (!response.ok) throw new Error(`Async/Await fetch failed! Status: ${response.status}`);

    const data = await response.json();
    console.log('Async/Await response:', data);
    displayImages(data.results);
  } catch (error) {
    alert(error.message);
  }
}


