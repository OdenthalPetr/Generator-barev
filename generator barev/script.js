document.addEventListener('DOMContentLoaded', () => {
    const colorDisplay = document.getElementById('colorDisplay');
    const colorCode = document.getElementById('colorCode');
    const generateColorButton = document.getElementById('generateColor');
    const saveColorButton = document.getElementById('saveColor');
    const favoriteColorsSection = document.getElementById('favoriteColorsSection');
    const favoriteColorsList = document.getElementById('favoriteColors');
    const loginSection = document.getElementById('loginSection');
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    let currentColor = '#FFFFFF';
    let favoriteColors = [];
   

    const loadFavoriteColors = () => {
        const savedColors = localStorage.getItem('favoriteColors');
        if (savedColors) {
            favoriteColors = JSON.parse(savedColors);
            favoriteColorsList.innerHTML = '';
            favoriteColors.forEach(color => {
                const li = document.createElement('li');
                li.style.backgroundColor = color;
                li.textContent = color;
                li.addEventListener('click', () => removeColor(color));
                favoriteColorsList.appendChild(li);
            });
        }
    };

    const saveFavoriteColors = () => {
        localStorage.setItem('favoriteColors', JSON.stringify(favoriteColors));
    };

    const generateRandomColor = () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        colorDisplay.style.backgroundColor = randomColor;
        colorCode.textContent = randomColor;
        currentColor = randomColor;
    };

    const saveColor = () => {
        if (!favoriteColors.includes(currentColor)) {
            favoriteColors.push(currentColor);
            const li = document.createElement('li');
            li.style.backgroundColor = currentColor;
            li.textContent = currentColor;
            li.addEventListener('click', () => removeColor(currentColor));
            favoriteColorsList.appendChild(li);
            saveFavoriteColors();
        } else {
            alert('Tato barva je již v seznamu oblíbených.');
        }
    };

    const removeColor = (color) => {
        favoriteColors = favoriteColors.filter(c => c !== color);
        saveFavoriteColors();
        loadFavoriteColors();
    };

    

    loadFavoriteColors();
    

    generateColorButton.addEventListener('click', generateRandomColor);
    saveColorButton.addEventListener('click', saveColor);

   
});
