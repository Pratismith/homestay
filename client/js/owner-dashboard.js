const API_BASE = '/api';
const user = JSON.parse(localStorage.getItem('user') || '{}');
const token = localStorage.getItem('token');

// Check if user is logged in and is an owner
if (!token || user.role !== 'owner') {
  alert('Please login as an owner to access this page');
  window.location.href = 'login.html';
}

// Display owner name
document.getElementById('ownerName').textContent = user.name || 'Owner';

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
});

// Add Property Form
document.getElementById('addPropertyForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const location = document.getElementById('location').value;
  const pricePerNight = document.getElementById('pricePerNight').value;
  const description = document.getElementById('description').value;
  const availableRooms = document.getElementById('availableRooms').value;
  const instructions = document.getElementById('instructions').value;
  
  // Get selected amenities
  const amenitiesCheckboxes = document.querySelectorAll('input[name="amenities"]:checked');
  const amenities = Array.from(amenitiesCheckboxes).map(cb => cb.value);
  
  // Get images
  const imageFiles = document.getElementById('images').files;
  
  const formData = new FormData();
  formData.append('title', title);
  formData.append('location', location);
  formData.append('pricePerNight', pricePerNight);
  formData.append('description', description);
  formData.append('availableRooms', availableRooms);
  formData.append('amenities', JSON.stringify(amenities));
  formData.append('instructions', instructions);
  
  for (let i = 0; i < imageFiles.length; i++) {
    formData.append('images', imageFiles[i]);
  }
  
  try {
    const res = await fetch(`${API_BASE}/homestays`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (res.ok) {
      alert('✅ Property added successfully!');
      document.getElementById('addPropertyForm').reset();
      loadMyProperties();
    } else {
      const data = await res.json();
      alert('❌ ' + (data.msg || 'Error adding property'));
    }
  } catch (err) {
    console.error(err);
    alert('Error adding property');
  }
});

// Load owner's properties
async function loadMyProperties() {
  try {
    const res = await fetch(`${API_BASE}/homestays/my-properties`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (res.ok) {
      const properties = await res.json();
      const container = document.getElementById('myProperties');
      container.innerHTML = '';
      
      if (properties.length === 0) {
        container.innerHTML = '<p>You haven\'t added any properties yet.</p>';
        return;
      }
      
      properties.forEach(property => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${property.images && property.images[0] ? property.images[0] : '/placeholder.png'}" alt="${property.title}">
          <h3>${property.title}</h3>
          <p>${property.location}</p>
          <p>₹${property.pricePerNight}/night</p>
          <p>Rooms: ${property.availableRooms || 'N/A'}</p>
          <p>Amenities: ${property.amenities ? property.amenities.join(', ') : 'None'}</p>
        `;
        container.appendChild(card);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

// Load properties on page load
loadMyProperties();
