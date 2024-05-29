const burgerBtn = document.querySelector('header nav button')
const mobileNav = document.querySelector('header nav ul')

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('showMenu')
    mobileNav.classList.toggle('showMenu')
})

const getLocationBtn = document.querySelector('#getLocation')

getLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendPosition)
    } else {
        alert('Geolocation is not supported by this browser.')
    }
})

const sendPosition = (position) => {
    fetch('/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error))
}
