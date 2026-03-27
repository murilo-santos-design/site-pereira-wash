// Script Principal - Pereira Premium Wash

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa o AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
    });

    // 2. Comportamento da Navbar ao rolar a página
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Menu Mobile (Hamburger Toggle)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Fechar menu ao redimensionar (opcional, mas evita bugs visuais)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // 4. Fechar Menu Mobile ao clicar em um link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 5. Atualizar link ativo na navegação baseado na rolagem (Scroll Spy)
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Offset reduzido para melhor precisão

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 6. Feedback visual ao clicar em links externos/WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp.com"], a[href*="api.whatsapp.com"], a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = this.getAttribute('target') || '_self';
            
            // Verifica se um overlay já existe, e remove
            let existingOverlay = document.querySelector('.redirect-overlay');
            if(existingOverlay) existingOverlay.remove();
            
            // Criar overlay
            const overlay = document.createElement('div');
            overlay.className = 'redirect-overlay';
            overlay.innerHTML = `
                <div class="redirect-content">
                    <i class="fa-brands fa-whatsapp redirect-icon pulse"></i>
                    <h3>Redirecionando...</h3>
                    <p>Abrindo o WhatsApp para atendimento.</p>
                </div>
            `;
            document.body.appendChild(overlay);
            
            // Animar entrada
            setTimeout(() => {
                overlay.classList.add('active');
            }, 10);

            // Redirecionar após ~1.2 segundos
            setTimeout(() => {
                if(target === '_blank') {
                    window.open(href, '_blank');
                    // Remover overlay logo depois de abrir
                    setTimeout(() => {
                        overlay.classList.remove('active');
                        setTimeout(() => overlay.remove(), 300);
                    }, 500);
                } else {
                    window.location.href = href;
                }
            }, 1200);
        });
    });

    // Lógica do Botão Voltar ao Topo
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', (e) => {
            const href = backToTopBtn.getAttribute('href');
            if (href.includes('#inicio')) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});
