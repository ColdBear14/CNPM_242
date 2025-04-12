// Populate the space dropdown
async function loadSpaces() {
  const response = await fetch('/api/spaces');
  const spaces = await response.json();
  const spaceSelect = document.getElementById('spaceSelect');
  spaceSelect.innerHTML = '<option value="" disabled selected>Select a Space</option>'; // Reset options
  spaces.forEach(space => {
    if (space.available) {
      spaceSelect.innerHTML += `<option value="${space.id}">${space.name}</option>`;
    }
  });
}

// Handle form submission
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const time = e.target.time.value;
  const spaceId = e.target.space.value;

  if (!spaceId) {
    alert('Please select a space.');
    return;
  }

  const response = await fetch('/api/book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, time, spaceId }),
  });

  if (response.ok) {
    alert('Booking successful');
    loadBookings();
    loadSpaces(); // Refresh the space dropdown
  } else {
    const errorData = await response.json();
    alert(`Failed to book space: ${errorData.error || 'Unknown error'}`);
  }
});

// Load bookings and spaces on page load
async function loadBookings() {
  const response = await fetch('/api/bookings');
  const bookings = await response.json();
  const bookingsDiv = document.getElementById('bookings');
  bookingsDiv.innerHTML = bookings.map(b => `
    <p>
      ${b.name} - ${b.time} - ${b.space}
      <button onclick="cancelBooking(${b.spaceId})">Cancel</button>
    </p>
  `).join('');
}

// Cancel a booking
async function cancelBooking(spaceId) {
  try {
    const response = await fetch('/api/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ spaceId }), // Ensure spaceId is sent in the request body
    });

    if (response.ok) {
      alert('Booking canceled successfully');
      loadBookings(); // Reload bookings
      loadSpaces(); // Reload spaces
    } else {
      const errorData = await response.json();
      alert(`Failed to cancel booking: ${errorData.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error canceling booking:', error);
    alert('An error occurred while canceling the booking.');
  }
}

loadBookings();
loadSpaces();