
// Нахожу все элемнты:
const nameCheckbox = document.getElementById("name-checkbox");
const nameInput = document.getElementById("name-input");
const avatarInput = document.getElementById("avatar-input");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatMessages = document.getElementById("chat-messages");

// Вешаю слушатель событий:
sendButton.addEventListener("click", sendMessage);

// Функция срабатывает по клику на кнопку и получает зачения из полей ввода,
// предварительно проверяя.
function sendMessage() {
    const displayName = nameCheckbox.checked ? normalizeName(nameInput.value) || "UserName" : "UserName";
    const avatar = isValidURL(avatarInput.value) ? avatarInput.value : getDefaultAvatar();
    const message = checkSpam(messageInput.value);

    if (message) {
        displayMessage(displayName, avatar, message);
        messageInput.value = "";
    }

    // Функция - добавляет разметку и содержимое комментария в HTML: 
    function displayMessage(name, avatar, message) {
        const messageContainer = document.createElement("div");
        messageContainer.className = "message-container";
        const commentDate = new Date().toLocaleString();

        messageContainer.innerHTML = `
            <div class="avatar"><img src="${avatar}" class="avatar-img" alt="Avatar"></div>
            <div class="message">
                <p>${name}, your comment was saved!</p>
                <p>${message}</p>
            </div>
        `;
        chatMessages.appendChild(messageContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function normalizeName(name) {
        // Удаляем лишние пробелы и делаем первую букву каждого слова заглавной
        return name.trim().replace(/\s+/g, ' ').toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
    }

    function checkSpam(str) {
        // Проверка без учета регистра слов «viagra» или «ххх».
        return str.replace(/viagra|xxx/gi, '***');
    }

    // Функция для генерации случайного цвета аватара по умолчанию.
    function getDefaultAvatar() {
        const userAvatar = ['https://cdn-icons-png.flaticon.com/512/4725/4725904.png', 'https://cdn-icons-png.flaticon.com/512/4725/4725899.png', 'https://cdn-icons-png.flaticon.com/512/4725/4725955.png', 'https://cdn-icons-png.flaticon.com/512/4725/4725938.png', 'https://cdn-icons-png.flaticon.com/512/4725/4725938.png'];
        const randomIndex = Math.floor(Math.random() * userAvatar.length);
        return userAvatar[randomIndex];
    }

    // Функция проверки ввода URL-адреса.
    function isValidURL(url) {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(url);
    }
};
