const reservas = document.querySelector('#reservas')

reservas.innerHTML = `
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Gestión de Pagos</h2>

            <!-- Sección Pagos Fijos -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6" id="paymentCards">
                ${createCard("Piscina", "$100")}
                ${createCard("Zonas Verdes", "$50")}
                ${createCard("", "$75")}
            </div>
</main>

`

function createCard(title, amount) {
    return `
        <div class="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer" onclick='openPaymentModal("${title}", "${amount}")'>
            <h3 class="font-bold text-lg">${title}</h3>
            <p class="text-gray-600">${amount}</p>
        </div>`;
}