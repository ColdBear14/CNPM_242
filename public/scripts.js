document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const time = e.target.time.value;
  
    const response = await fetch('/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, time })
    });
  
    if (response.ok) {
      alert('Booking successful');
      loadBookings();
    }
  });
  
  async function loadBookings() {
    const response = await fetch('/api/bookings');
    const bookings = await response.json();
    const bookingsDiv = document.getElementById('bookings');
    bookingsDiv.innerHTML = bookings.map(b => `<p>${b.name} - ${b.time}</p>`).join('');
  }
  
  loadBookings();