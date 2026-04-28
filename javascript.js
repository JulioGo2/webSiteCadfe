// ==================== CARRUSEL ====================
let currentSlide = 0;
const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.carousel-item');
const dotsContainer = document.getElementById('dots');

// Crear dots del carrusel
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (index === 0) dot.classList.add('active');
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
});

// Ir a un slide específico
function goToSlide(n) {
    currentSlide = n;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
}

// Actualizar dots activos
function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Siguiente slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
}

// Auto-avance del carrusel cada 5 segundos
setInterval(nextSlide, 5000);

// ==================== CHATBOT INTELIGENTE ====================

let chatHistory = [];
let userName = '';

// Abrir/Cerrar ventana de chat
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.toggle('active');
}

// Indicador de escritura
function showTypingIndicator() {
    const chatBody = document.getElementById('chatBody');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-indicator';
    typingDiv.id = 'typing';
    typingDiv.innerHTML = '<i class="fas fa-circle"></i> <i class="fas fa-circle"></i> <i class="fas fa-circle"></i>';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typing');
    if (typing) typing.remove();
}

// Agregar mensaje al chat
function addMessage(text, isUser = false) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    messageDiv.innerHTML = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    if (!isUser) {
        chatHistory.push({ role: 'bot', message: text });
    } else {
        chatHistory.push({ role: 'user', message: text });
    }
}

// Detectar intención del mensaje
function detectIntent(message) {
    const msg = message.toLowerCase().trim();
    
    // Saludos
    if (/^(hola|hi|buenos días|buenas tardes|buenas noches|hey|saludos)/i.test(msg)) {
        return 'saludo';
    }
    
    // Horarios
    if (/horario|hora|cuando|servicio|culto|reunión|misa/i.test(msg)) {
        return 'horarios';
    }
    
    // Dirección
    if (/dirección|ubicación|donde|está|encuentro|llegar|direc/i.test(msg)) {
        return 'direccion';
    }
    
    // Redes sociales
    if (/redes|social|facebook|instagram|youtube|whatsapp|seguir/i.test(msg)) {
        return 'redes';
    }
    
    // Labor social
    if (/labor|social|ayuda|voluntario|donar|donación|obra/i.test(msg)) {
        return 'labor';
    }
    
    // Contacto/Asesor
    if (/asesor|hablar|contacto|pastor|líder|ayuda personal/i.test(msg)) {
        return 'asesor';
    }
    
    // Nombre
    if (/me llamo|mi nombre|soy/i.test(msg)) {
        return 'nombre';
    }
    
    // Agradecimiento
    if (/gracias|muchas gracias|te agradezco|bendiciones/i.test(msg)) {
        return 'gracias';
    }
    
    // Despedida
    if (/adiós|chao|hasta luego|nos vemos|bye/i.test(msg)) {
        return 'despedida';
    }
    
    return 'desconocido';
}

// Generar respuestas inteligentes
function generateResponse(intent, userMessage) {
    const responses = {
        'saludo': [
            `¡Hola! 😊 Bienvenido a la familia de Camino de Fe. ¿En qué puedo ayudarte hoy?`,
            `¡Qué alegría saludarte! 🙏 Estoy aquí para ayudarte. ¿Qué necesitas saber?`,
            `¡Hola hermano/a! ✨ ¿Cómo puedo servirte hoy?`
        ],
        'horarios': `<strong>📅 Horarios de nuestros servicios:</strong><br><br>
                    <strong>Domingos:</strong><br>
                    <i class="fas fa-sun"></i> 9:00 AM - Servicio Matutino<br>
                    <i class="fas fa-moon"></i> 6:00 PM - Servicio Vespertino<br><br>
                    <strong>Miércoles:</strong><br>
                    <i class="fas fa-book-bible"></i> 7:00 PM - Estudio Bíblico<br><br>
                    <strong>Viernes:</strong><br>
                    <i class="fas fa-hands-praying"></i> 7:30 PM - Reunión de Oración<br><br>
                    <strong>Sábado:</strong><br>
                    <i class="fas fa-people-group"></i> 4:00 PM - Actividades Juveniles<br><br>
                    ¿Te gustaría saber cómo llegar o algo más? 😊`,
        'direccion': `<strong><i class="fas fa-location-dot"></i> Nos encontramos en:</strong><br><br>
                     Av. Túpac amaru 3186,<br>
                     Lima, Perú<br><br>
                     <i class="fas fa-bus"></i> <strong>Referencias:</strong><br>
                     - Cerca del paradero Belaunde<br>
                     - Frente al DollarCity<br><br>
                     Si necesitas ayuda para llegar, llámanos al:<br>
                     <i class="fas fa-phone"></i> +51 987 123 765<br><br>
                     ¡Te esperamos con los brazos abiertos! 🤗`,
        'redes': `<strong><i class="fas fa-hashtag"></i> Conéctate con nosotros:</strong><br><br>
                 <i class="fab fa-facebook"></i> <strong>Facebook:</strong> @CaminoDeFe<br>
                 <i class="fab fa-instagram"></i> <strong>Instagram:</strong> @caminodefeperu<br>
                 <i class="fab fa-youtube"></i> <strong>YouTube:</strong> Camino de Fe Oficial<br>
                 <i class="fab fa-whatsapp"></i> <strong>WhatsApp:</strong> +51 987 123 765<br><br>
                 Comparte nuestras publicaciones y ayúdanos a llegar a más personas con el mensaje de amor de Dios 💜`,
        'labor': `<strong><i class="fas fa-hands-holding-circle"></i> Nuestra labor social:</strong><br><br>
                 Nos apasiona servir a nuestra comunidad:<br><br>
                 <i class="fas fa-bowl-food"></i> <strong>Alimentación:</strong> Comedores para familias necesitadas<br>
                 <i class="fas fa-graduation-cap"></i> <strong>Educación:</strong> Apoyo escolar y talleres<br>
                 <i class="fas fa-children"></i> <strong>Niños:</strong> Programas de atención infantil<br>
                 <i class="fas fa-heart-pulse"></i> <strong>Salud:</strong> Campañas médicas gratuitas<br><br>
                 ¿Te gustaría ser voluntario o necesitas nuestra ayuda?<br>
                 <i class="fas fa-phone"></i> Contáctanos: +51 987 123 765`,
        'asesor': `<strong><i class="fas fa-headset"></i> ¡Por supuesto!</strong><br><br>
                  Estoy transfiriendo tu consulta con uno de nuestros líderes espirituales...<br><br>
                  <i class="fas fa-clock"></i> Tiempo estimado: 2-3 minutos<br><br>
                  Mientras tanto, también puedes:<br>
                  <i class="fas fa-phone"></i> Llamarnos: +51 987 123 765<br>
                  <i class="fas fa-envelope"></i> Escribirnos: caminodefecadfe@gmail.com<br>
                  <i class="fab fa-whatsapp"></i> WhatsApp directo<br><br>
                  <em>Horario: Lun-Vie 9am-6pm, Sáb-Dom 8am-8pm</em>`,
        'nombre': `¡Qué bonito conocer tu nombre! ${userName ? userName : ''} 😊<br><br>
                  Es un honor tenerte aquí. ¿En qué más puedo ayudarte?`,
        'gracias': [
            `¡De nada! 😊 Para eso estamos. ¿Necesitas algo más?`,
            `¡Un placer ayudarte! 🙏 Que Dios te bendiga. ¿Algo más en lo que pueda servirte?`,
            `¡Para servir! ✨ Estoy aquí si necesitas cualquier otra cosa.`
        ],
        'despedida': [
            `¡Que Dios te bendiga! 🙏 Esperamos verte pronto en la iglesia. ¡Hasta luego! 💜`,
            `¡Hasta pronto! ✨ Recuerda que siempre eres bienvenido. Que tengas un hermoso día 😊`,
            `¡Nos vemos! 🤗 Que la paz de Dios te acompañe siempre. ¡Bendiciones! 🙌`
        ],
        'desconocido': [
            `Hmm, no estoy seguro de entenderte bien 🤔 ¿Podrías ser más específico?`,
            `Disculpa, ¿podrías reformular tu pregunta? 😅 Estoy aquí para ayudarte.`,
            `No entendí muy bien... ¿Te refieres a horarios, dirección, redes sociales o labor social? 🤔`
        ]
    };
    
    if (intent === 'nombre') {
        const nameMatch = userMessage.match(/(?:me llamo|mi nombre es|soy)\s+([a-záéíóúñ]+)/i);
        if (nameMatch) {
            userName = nameMatch[1];
        }
    }
    
    if (Array.isArray(responses[intent])) {
        return responses[intent][Math.floor(Math.random() * responses[intent].length)];
    }
    return responses[intent];
}

// Procesar mensaje del usuario
function processUserMessage(message) {
    if (!message.trim()) return;
    
    // Agregar mensaje del usuario
    addMessage(message, true);
    
    // Mostrar indicador de escritura
    showTypingIndicator();
    
    // Detectar intención
    const intent = detectIntent(message);
    
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateResponse(intent, message);
        addMessage(response);
        
        if (['horarios', 'direccion', 'redes', 'labor'].includes(intent)) {
            setTimeout(() => {
                addMessage(`¿Necesitas saber algo más? Puedo ayudarte con:<br><br>
                    <div class="quick-options">
                        <button class="quick-btn" onclick="quickReply('horarios')"><i class="fas fa-clock"></i> Horarios</button>
                        <button class="quick-btn" onclick="quickReply('direccion')"><i class="fas fa-map"></i> Dirección</button>
                        <button class="quick-btn" onclick="quickReply('redes')"><i class="fas fa-share"></i> Redes</button>
                        <button class="quick-btn" onclick="quickReply('asesor')"><i class="fas fa-user"></i> Asesor</button>
                    </div>`);
            }, 1000);
        }
    }, 1000 + Math.random() * 1000); 
}

function quickReply(option) {
    const messages = {
        'horarios': '¿Cuáles son los horarios?',
        'direccion': '¿Dónde están ubicados?',
        'redes': '¿Cuáles son sus redes sociales?',
        'asesor': 'Quiero hablar con un asesor'
    };
    processUserMessage(messages[option]);
}

function handleSendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value;
    if (message.trim()) {
        processUserMessage(message);
        input.value = '';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleSendMessage();
    }
}

function selectOption(option) {
    const messages = {
        'horarios': '¿Cuáles son los horarios de servicio?',
        'direccion': '¿Dónde está ubicada la iglesia?',
        'redes': 'Quiero seguirlos en redes sociales',
        'labor': 'Cuéntame sobre su labor social',
        'asesor': 'Necesito hablar con un asesor'
    };
    processUserMessage(messages[option]);
}

function resetChat() {
    const chatBody = document.getElementById('chatBody');
    chatHistory = [];
    userName = '';
    chatBody.innerHTML = `
        <div class="chat-message bot">
            ¡Hola! 👋 Soy el asistente virtual de <strong>Camino de Fe</strong> 🙏<br><br>
            Puedes escribirme libremente o elegir una opción del menú. ¿En qué puedo ayudarte? 😊
        </div>
        <div class="chat-options">
            <button class="option-btn" onclick="selectOption('horarios')">
                <i class="fas fa-clock"></i> Horarios de servicios
            </button>
            <button class="option-btn" onclick="selectOption('direccion')">
                <i class="fas fa-map-marker-alt"></i> Dirección
            </button>
            <button class="option-btn" onclick="selectOption('redes')">
                <i class="fas fa-share-nodes"></i> Redes sociales
            </button>
            <button class="option-btn" onclick="selectOption('labor')">
                <i class="fas fa-hand-holding-heart"></i> Labor social
            </button>
            <button class="option-btn" onclick="selectOption('asesor')">
                <i class="fas fa-user-tie"></i> Hablar con un asesor
            </button>
        </div>
        <div class="chat-input-container">
            <input type="text" id="chatInput" placeholder="Escribe tu mensaje..." onkeypress="handleKeyPress(event)">
            <button onclick="handleSendMessage()" class="send-btn">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    `;
}

window.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.getElementById('chatBody');
    chatBody.innerHTML += `
        <div class="chat-input-container">
            <input type="text" id="chatInput" placeholder="Escribe tu mensaje..." onkeypress="handleKeyPress(event)">
            <button onclick="handleSendMessage()" class="send-btn">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    `;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});