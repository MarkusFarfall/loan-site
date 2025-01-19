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
        const response = await fetch(`http://localhost:3000/api/loans/${vkId}`);
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