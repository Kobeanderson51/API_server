document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('token')) {
        populateCardOptions();
    }
});

async function populateCardOptions() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const response = await fetch(`/cards`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const result = await response.json();
        const cardOptions = result.cards;
        const dataList = document.getElementById('cardOptions');
        dataList.innerHTML = ''; // Clear previous options

        cardOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.name;
            dataList.appendChild(optionElement);
        });
    } else {
        const result = await response.json();
        document.getElementById('serverMessage').textContent = result.errMessage;
    }
}

async function getCourses() {
    const token = localStorage.getItem('token');

    const response = await fetch(`/cards`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const result = await response.json();
        const courses = result.cards;
        document.getElementById('serverMessage').textContent = `Courses: ${courses.map(course => course.name).join(', ')}`;
    } else {
        const result = await response.json();
        document.getElementById('serverMessage').textContent = result.errMessage;
    }
}

async function getCardInfo() {
    const selectedCardName = document.getElementById('filter').value;
    const token = localStorage.getItem('token');

    const response = await fetch(`/cards?filter=${encodeURIComponent(selectedCardName)}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();
    if (response.ok) {
        const cardInfo = result.cards.find(card => card.name === selectedCardName);
        if (cardInfo) {
            const cardInfoString = `ID: ${cardInfo.id}, Name: ${cardInfo.name}, Set: ${cardInfo.set}, Card Number: ${cardInfo.cardNumber}, Type: ${cardInfo.type}, Power: ${cardInfo.power}, Toughness: ${cardInfo.toughness}, Rarity: ${cardInfo.rarity}, Cost: ${cardInfo.cost}`;
            document.getElementById('serverMessage').textContent = `Card Info:\n${cardInfoString}`;
        } else {
            document.getElementById('serverMessage').textContent = 'Card not found';
        }
    } else {
        document.getElementById('serverMessage').textContent = result.errMessage;
    }
}
function createCard() {
}
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (response.ok) {
        localStorage.setItem('token', result.token);
        document.getElementById('serverMessage').textContent = 'Login successful!';
        populateCardOptions();
    } else {
        document.getElementById('serverMessage').textContent = result.errMessage;
    }
}

function logout() {
    localStorage.removeItem('token');
    document.getElementById('serverMessage').textContent = 'Logged out!';
}
