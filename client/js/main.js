const API_BASE = '/api';

document.getElementById('searchBtn').addEventListener('click', doSearch);

async function doSearch(page=1) {
  const q = document.getElementById('q').value;
  const minPrice = document.getElementById('minPrice').value;
  const maxPrice = document.getElementById('maxPrice').value;
  const amenities = document.getElementById('amenities').value;

  const params = new URLSearchParams();
  if (q) params.append('q', q);
  if (minPrice) params.append('minPrice', minPrice);
  if (maxPrice) params.append('maxPrice', maxPrice);
  if (amenities) params.append('amenities', amenities);
  params.append('page', page);

  const res = await fetch(`${API_BASE}/homestays/search?${params.toString()}`);
  const list = await res.json();
  const results = document.getElementById('results');
  results.innerHTML = '';

  if (list.length === 0) results.innerHTML = '<p>No results</p>';
  for (const h of list) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${h.images && h.images[0] ? h.images[0] : '/placeholder.png'}" />
      <h3>${h.title}</h3>
      <p>${h.location}</p>
      <p>₹${h.pricePerNight}/night</p>
      <a href="listing.html?id=${h._id}">View</a>
    `;
    results.appendChild(card);
  }
}
