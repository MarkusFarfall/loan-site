// Инициализация VK SDK
document.getElementById('vk-auth').addEventListener('click', () => {
    VK.init({ apiId: 52937827 }); // Замени ТВОЙ_CLIENT_ID на ID приложения VK
    VK.Auth.login((response) => {
        if (response.session) {
            const vkId = response.session.user.id;
            localStorage.setItem('vkId', vkId); // Сохраняем VK ID в localStorage
            alert('Авторизация успешна!');
            document.getElementById('app').style.display = 'block'; // Показываем форму заявки
        } else {
            alert('Ошибка авторизации.');
        }
    });
});

// Обработка отправки заявки
document.getElementById('loan-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Получаем данные из формы
    const amount = document.getElementById('amount').value;
    const days = document.getElementById('days').value;
    const vkId = localStorage.getItem('vkId'); // Получаем VK ID из localStorage

    // Проверяем, авторизован ли пользователь
    if (!vkId) {
        alert('Пожалуйста, войдите через VK.');
        return;
    }

    // Отправляем заявку на сервер
    try {
        const response = await fetch('/api/loan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, days, vkId }),
        });

        const result = await response.json();

        if (result.success) {
            alert('Заявка успешно отправлена!');
            window.location.href = 'profile.html'; // Переходим в личный кабинет
        } else {
            alert('Ошибка при отправке заявки.');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке заявки.');
    }
});

// Проверка авторизации при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const vkId = localStorage.getItem('vkId');

    // Если пользователь авторизован, показываем форму заявки
    if (vkId) {
        document.getElementById('app').style.display = 'block';
    }
});

// Код для страницы личного кабинета (profile.html)
if (window.location.pathname.includes('profile.html')) {
    document.addEventListener('DOMContentLoaded', async () => {
        const vkId = localStorage.getItem('vkId');

        // Проверяем, авторизован ли пользователь
        if (!vkId) {
            alert('Пожалуйста, войдите через VK.');
            window.location.href = '/'; // Перенаправляем на главную страницу
            return;
        }

        // Загружаем заявки пользователя
        try {
            const response = await fetch(`/api/loans/${vkId}`);
            const result = await response.json();

            if (result.success) {
                const loanHistory = result.loans.map(loan => `
                    <div class="loan">
                        <p>Сумма: ${loan.amount} руб.</p>
                        <p>Срок: ${loan.days} дней</p>
                        <p>Статус: ${loan.status}</p>
                    </div>
                `).join('');

                document.getElementById('loan-history').innerHTML = loanHistory;
            } else {
                alert('Ошибка при загрузке данных.');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при загрузке данных.');
        }
    });
}