// const burgerBtn = document.querySelector('header nav button')
// const mobileNav = document.querySelector('header nav ul')
//
// burgerBtn.addEventListener('click', () => {
//     burgerBtn.classList.toggle('showMenu')
//     mobileNav.classList.toggle('showMenu')
// })

// REMOVE POSSIBILITY TO CONTROL NUMBER INPUT WITH ARROWS
document.querySelectorAll('[data-no-arrow-control="true"]').forEach(input => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault()
        }
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const getLocationBtn = document.querySelector('#getLocation')
    const container = document.querySelector('#container')
    const loadingDiv = document.querySelector('#loading')

    getLocationBtn.addEventListener('click', () => {
        container.innerHTML = ''
        loadingDiv.style.display = 'block'

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
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        })
            .then(response => response.json())
            .then(data => createElements(data))
            .catch(error => console.error('Error:', error))
    }

    const createElements = (data) => {
        loadingDiv.style.display = 'none'
        data.cityData.forEach(city => {
            const h2 = document.createElement('h2')
            const h3 = document.createElement('h3')
            const h4 = document.createElement('h4')
            h2.textContent = city.name
            h3.textContent = city.country
            h4.textContent = city.state
            container.append(h2, h3, h4)
        })
    }
})
