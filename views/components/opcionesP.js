function loadManagePaymentsPage() {
    document.getElementById('opcPagos').innerHTML = `
               <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Administrar Opciones de Pago</h2>

            <div class="mb-6">
                <h3 class="font-bold text-lg">Opciones de Pago Fijas</h3>
                <table class="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b">Descripción</th>
                            <th class="py-2 px-4 border-b">Monto</th>
                            <th class="py-2 px-4 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="managePaymentsTableBody">
                        <!-- Las filas se llenarán dinámicamente -->
                    </tbody>
                </table>

                <h3 class='font-bold text-lg mt-6'>Agregar Nuevo Pago Fijo</h3>
                <form id='addPaymentForm'>
                    <label for='newDescription' class='block mb-1'>Descripción:</label>
                    <input type='text' id='newDescription' required placeholder='Descripción del pago' class='border rounded p-2 mb-4 w-full'/>
                    <label for='newAmount' class='block mb-1'>Monto:</label>
                    <input type='number' id='newAmount' required placeholder='$0.00' class='border rounded p-2 mb-4 w-full' min="0" step="0.01"/>
                    <button type='submit' id='addPaymentButton' class='bg-green-500 text-white px-4 py-2 rounded'>Agregar Pago Fijo</button> 
                </form>
            </div>

            <button id="backButton" class="fixed bottom-5 right-5 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 ease-in-out">Go Back</button>
        </main>`
}