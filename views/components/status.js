function loadStatusPage() {
    const status = document.querySelector('#status');

    status.innerHTML = `
        <main class="flex-grow p-6">
            <h2 class="text-xl font-semibold mb-4">Gestión de Estatus</h2>

            <!-- Sección para Residentes -->
            <div class="mb-6">
                <h3 class="font-bold text-lg">Estatus de Residentes</h3>
                <table class="min-w-full bg-white border border-gray-300 mb-4 mx-auto max-w-4xl">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b">Nombre</th>
                            <th class="py-2 px-4 border-b">Pagos Pendientes</th>
                            <th class="py-2 px-4 border-b">Estado de Morosidad</th>
                            <th class="py-2 px-4 border-b">Alquiler Zonas</th>
                            <th class="py-2 px-4 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="residentStatusTableBody">
                        <!-- Las filas se llenarán dinámicamente -->
                    </tbody>
                </table>
            </div>
            
            <!-- Sección para Visitantes -->
            <div class="mb-6">
                <h3 class="font-bold text-lg">Estatus de Visitantes</h3>
                <table class="min-w-full bg-white border border-gray-300 mb-4 mx-auto max-w-4xl">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b">Nombre</th>
                            <th class="py-2 px-4 border-b">Pagos Pendientes</th>
                            <th class="py-2 px-4 border-b">Alquiler Zonas</th>
                            <th class="py-2 px-4 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="visitorStatusTableBody">
                        <!-- Las filas se llenarán dinámicamente -->
                    </tbody>
                </table>
            </div>

            <!-- Sección para gestionar estatus -->
            <div id='manageStatusSection'>
                <h3 class='font-bold text-lg'>Administrar Estatus</h3>

                <!-- Formulario para agregar o editar estatus -->
                <form id='manageStatusForm'>
                    <label for='name' class='block mb-1'>Nombre:</label>
                    <input type='text' id='name' required placeholder='Nombre del residente o visitante' class='border rounded p-2 mb-4 w-full'/>
                    
                    <!-- Selección del tipo (Residente o Visitante) -->
                    <label for='type' class='block mb-1'>Tipo:</label>
                    <select id='type' required class='border rounded p-2 mb-4 w-full'>
                        <option value='resident'>Residente</option>
                        <option value='visitor'>Visitante</option>
                    </select>

                    <!-- Campos adicionales según el tipo -->
                    <label for='pendingPayments' class='block mb-1'>Pagos Pendientes:</label>
                    <input type='number' id='pendingPayments' required placeholder='1~10' class='border rounded p-2 mb-4 w-full'/>
                    
                    <!-- Estado de morosidad solo para residentes -->
                    <div id='morositySection'>
                        <label for='morosity' class='block mb-1'>Estado de Morosidad:</label>
                        <select id='morosity' required class='border rounded p-2 mb-4 w-full'>
                            <option value='alDia'>Al Día</option>
                            <option value='moroso'>Moroso</option>
                        </select> 
                    </div>

                    <!-- Alquiler de zonas -->
                    <label for='rentedAreas' class='block mb-1'>Alquiler Zonas:</label>
                    <input type='text' id='rentedAreas' placeholder='Zonas alquiladas (separadas por comas)' class='border rounded p-2 mb-4 w-full'/>

                    <!-- Botón para agregar o editar -->
                    <button type='submit' onclick='manageStatus(event)' class='bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 '>Guardar Estatus</button> 
                </form>
            </div>

            <!-- Botón para regresar -->
            <button id="backButton" class="fixed bottom-5 right-5 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 ease-in-out cursor-pointer" onclick="goBack()"> Go Back </button>

            <!-- Modal para editar/eliminar -->
            <div id="editModal" class="fixed inset-0 bg-gray-500/40 hidden flex justify-center items-center">
                <div class="bg-white p-6 rounded-lg w-11/12 max-w-md">
                    <h3 class="text-xl font-bold mb-4">Editar Estatus</h3>
                    <form id="editStatusForm">
                        <label for="editName" class="block mb-1">Nombre:</label>
                        <input type="text" id="editName" required class="border rounded p-2 mb-4 w-full"/>
                        
                        <label for="editPendingPayments" class="block mb-1">Pagos Pendientes:</label>
                        <input type="number" id="editPendingPayments" required class="border rounded p-2 mb-4 w-full"/>
                        
                        <label for="editType" class="block mb-1">Tipo:</label>
                        <select id="editType" required class="border rounded p-2 mb-4 w-full">
                            <option value="residente">Residente</option>
                            <option value="usuario">Visitante</option>
                        </select>

                        <div id="editMorositySection">
                            <label for="editMorosity" class="block mb-1">Estado de Morosidad:</label>
                            <select id="editMorosity" class="border rounded p-2 mb-4 w-full">
                                <option value="alDia">Al Día</option>
                                <option value="moroso">Moroso</option>
                            </select>
                        </div>

                        <label for="editRentedAreas" class="block mb-1">Alquiler Zonas:</label>
                        <input type="text" id="editRentedAreas" class="border rounded p-2 mb-4 w-full"/>

                        <div class="flex justify-end gap-4">
                            <button type="button" onclick="closeModal()" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200 ease-in-out cursor-pointer">Cancelar</button>
                            <button type="button" onclick="deleteStatus()" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 ease-in-out cursor-pointer">Eliminar</button>
                            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out cursor-pointer">Guardar Cambios</button>
                        </div>
                    </form>
                </div>
            </div>

</main>`;
    
    loadResidentStatus(); // Cargar los estatus de residentes al cargar la página
    loadVisitorStatus(); // Cargar los estatus de visitantes
}