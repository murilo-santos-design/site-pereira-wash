const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Regex para remover os botões Agendar dos cards de serviço (.btn-action agendar-btn)
// Pega todo o bloco do <a ... class="btn-action agendar-btn"...> até o fechamento </a>
const regex = /\s*<a href="[^"]*whatsapp[^"]*" target="_blank"[^>]*class="btn-action agendar-btn"[^>]*>[\s\S]*?<\/a>/g;
html = html.replace(regex, '');

// Adicionar o botão flutuante caso ainda não exista
const floatingBtnHtml = `
    <!-- Floating WhatsApp Global -->
    <a href="https://api.whatsapp.com/send?phone=5500000000000&text=Olá! Gostaria de agendar um serviço na Pereira Premium Wash." target="_blank" class="floating-whatsapp" aria-label="Fale conosco no WhatsApp">
        <i class="fa-brands fa-whatsapp"></i>
    </a>
</body>`;

if (!html.includes('floating-whatsapp')) {
    html = html.replace('</body>', floatingBtnHtml);
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Botões repetidos removidos e botão flutuante adicionado ao HTML.');
