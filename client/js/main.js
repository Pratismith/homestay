const API_BASE = '/api';

// Filter toggle
document.getElementById('filterBtn').addEventListener('click', () => {
  const filterPanel = document.getElementById('filterPanel');
  filterPanel.style.display = filterPanel.style.display === 'none' ? 'block' : 'none';
});

// Search button - location search
document.getElementById('searchBtn').addEventListener('click', doSearch);

// Apply filters button
document.getElementById('applyFiltersBtn').addEventListener('click', doSearch);

// Clear filters button
document.getElementById('clearFiltersBtn').addEventListener('click', () => {
  document.getElementById('location').value = '';
  document.getElementById('area').value = '';
  document.getElementById('minPrice').value = '';
  document.getElementById('maxPrice').value = '';
  document.getElementById('availability').value = '';
  doSearch();
});

// Search with location on Enter key
document.getElementById('location').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    doSearch();
  }
});

async function doSearch(page=1) {
  const location = document.getElementById('location').value;
  const area = document.getElementById('area').value;
  const minPrice = document.getElementById('minPrice').value;
  const maxPrice = document.getElementById('maxPrice').value;
  const availability = document.getElementById('availability').value;

  const params = new URLSearchParams();
  
  // Combine location and area search
  const searchQuery = location || area;
  if (searchQuery) params.append('q', searchQuery);
  
  if (minPrice) params.append('minPrice', minPrice);
  if (maxPrice) params.append('maxPrice', maxPrice);
  params.append('page', page);

  const res = await fetch(`${API_BASE}/homestays/search?${params.toString()}`);
  const list = await res.json();
  const results = document.getElementById('results');
  results.innerHTML = '';

  if (list.length === 0) {
    results.innerHTML = '<p>No homestays found. Try adjusting your search criteria.</p>';
    return;
  }
  
  // Sort by price
  list.sort((a, b) => a.pricePerNight - b.pricePerNight);
  
  for (const h of list) {
    // Filter by availability if selected
    if (availability === 'available' && (!h.availableRooms || h.availableRooms === 0)) {
      continue;
    }
    
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${h.images && h.images[0] ? h.images[0] : '/placeholder.png'}" alt="${h.title}">
      <h3>${h.title}</h3>
      <p>${h.location}</p>
      <p><strong>₹${h.pricePerNight}/night</strong></p>
      ${h.availableRooms ? `<p>Available Rooms: ${h.availableRooms}</p>` : ''}
      <a href="listing.html?id=${h._id}">View Details</a>
    `;
    results.appendChild(card);
  }
}

// Load all homestays on page load
doSearch();
