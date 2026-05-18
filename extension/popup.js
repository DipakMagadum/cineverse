// Website URL — local testing saathi
const SITE_URL = 'http://localhost:5173'
// Deploy zala ki he change kar:
// const SITE_URL = 'https://tadipaar.vercel.app'

// Website ughad
document.getElementById('openWebsite').addEventListener('click', () => {
  chrome.tabs.create({ url: SITE_URL })
})

// Quick Links
document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.getAttribute('data-url')
    chrome.tabs.create({ url: SITE_URL + url })
  })
})

// Category buttons
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const genre = btn.getAttribute('data-genre')
    chrome.tabs.create({ url: `${SITE_URL}/movies?genre=${genre}` })
  })
})

// Search
document.getElementById('searchBtn').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value.trim()
  if (query) {
    chrome.tabs.create({ url: `${SITE_URL}/movies?search=${encodeURIComponent(query)}` })
  }
})

// Enter key search
document.getElementById('searchInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('searchBtn').click()
  }
})