module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { amount, days, vkId } = req.body;
        console.log(`Получена заявка: ${amount} рублей на ${days} дней`);
        res.json({ success: true });
    } else {
        res.status(405).json({ error: 'Метод не разрешен' });
    }
};