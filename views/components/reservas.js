const reservas = document.querySelector('#reservas')

reservas.innerHTML = `
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Gestión de Reservas</h2>

            <!-- Sección Pagos Fijos -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6" id="paymentCards">
                ${createCard("Piscina", "$20","Se alquila la piscina por un maximo de 4 horas al dia de lunes a viernes y 6 horas los fines de semana y festivos ")}   
                ${createCard("Zonas Verdes", "$60", "Se alquila las zonas verdes por un maximo de 4 horas al dia de lunes a viernes y 6 horas los fines de semana y festivos ")}
                ${createCard("Salon de Fiestas", "$150", "Se alquila el salon de fiestas por un maximo de 12 horas al dia de lunes a viernes ")}
            </div>
</main>
        <button id="backButton" class="fixed bottom-5 right-5 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 ease-in-out cursor-pointer" onclick="goBack()"> Go Back </button>


`

function createCard(title, monto, descripcion) {
    return `
        <div class="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer h-60" onclick='openModal("${title}", "${monto}")'>
            <h3 class="font-bold text-lg">${title}</h3>
            <p class="text-gray-600">${monto}</p>
             <p class="text-gray-600">${descripcion}</p>
        </div>`;
}
