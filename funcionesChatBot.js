// Referencias a los elementos del DOM
  const divMensajes = document.getElementById('mensajes'); // Área de mensajes
  const entradaTexto = document.getElementById('entradaTexto'); // Campo de texto de entrada
  const chatbox = document.getElementById('chatbox'); // Contenedor del chat
  const btnAbrirChat = document.getElementById('btnAbrirChat'); // Imagen del robot
  let menuActual = "principal"; // Estado del menú, inicialmente en "principal"
  btnAbrirChat.addEventListener('click', () => {    // Alterna la visibilidad del chatbox
    chatbox.style.display = chatbox.style.display === "block" ? "none" : "block";
  });
  // Permitir enviar el mensaje presionando la tecla Enter
  entradaTexto.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') enviarMensaje(); // Si presionan Enter, enviar el mensaje
  });
  function agregarMensaje(remitente, texto) {  // Función para agregar un mensaje al área de chat
    const div = document.createElement('div'); // Crear un nuevo div para el mensaje
    div.className = remitente === "Tú" ? "mensaje-usuario" : "mensaje-bot"; // Asignar clase según remitente
    div.textContent = texto; // Asignar el texto del mensaje
    divMensajes.appendChild(div); // Agregar el mensaje al área de mensajes
    divMensajes.scrollTop = divMensajes.scrollHeight; // Desplazar el área para ver el último mensaje
  }
  function enviarMensaje() {  // Función para enviar el mensaje del usuario
    const texto = entradaTexto.value.trim(); // Obtener el texto ingresado
    if (texto) { // Si el texto no está vacío
      agregarMensaje("Tú", texto); // Agregar el mensaje del usuario
      setTimeout(() => responderBot(texto), 600); // Espera 600ms para que el bot responda
    } entradaTexto.value = ''; // Limpiar el campo de texto
  }
  function mostrarMenuPrincipal() {  // Función para mostrar el menú principal
    menuActual = "principal"; // Cambiar el menú actual
    agregarMensaje("Bot", "📋 Menú Principal:\n1. Ver servicios\n2. Contacto\n3. Salir");
  }
  function responderBot(entrada) {  // Función para que el bot responda 
    if (menuActual === "principal") {    // Lógica de respuesta dependiendo del menú actual
      switch (entrada) {
        case "1":agregarMensaje("Bot", "✅ Servicios:\n1.Reservas\n2.Consultoría\n3.Volver");
          menuActual = "submenu1"; break;
        case "2": agregarMensaje("Bot", "📞 Contacto: 1234-5678\n📧 email@empresa.com");break;
        case "3":agregarMensaje("Bot", "¡Gracias por chatear! 👋");break;
        default:agregarMensaje("Bot", "❌ Opción no válida. Elige 1, 2 o 3.");
      }
    } else if (menuActual === "submenu1") {
      switch (entrada) {
        case "1":agregarMensaje("Bot", "Soporte disponible de 8am a 6pm.");break;
        case "2": agregarMensaje("Bot", "Consultoría especializada en desarrollo."); break;
        case "3": mostrarMenuPrincipal(); break;
        default: agregarMensaje("Bot", "❌ Opción no válida. Elige 1, 2 o 3.");
      } }
  }  
  // Inicia el chat con un mensaje de bienvenida
  btnAbrirChat.addEventListener('click', () => {
    if (chatbox.style.display === "block" && divMensajes.childNodes.length === 0) {
      agregarMensaje("Bot", "¡Hola! 😊"); // Mensaje de bienvenida
      mostrarMenuPrincipal(); // Mostrar el menú principal
    }
  });