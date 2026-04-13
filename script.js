// Данные для галереи (локальные фото)
const galleryData = [
    { img: "images/remont1.jpg", title: "Квартира 72 м²", type: "Капитальный ремонт" },
    { img: "images/remont2.jpg", title: "Студия 38 м²", type: "Косметический" },
    { img: "images/remont3.jpg", title: "Двушка 64 м²", type: "Дизайнерский" },
    { img: "images/remont4.jpg", title: "Загородный дом", type: "Под ключ" }
];

// Данные для отзывов
const reviewsData = [
    { name: "Анна К.", text: "Сделали ремонт в новой квартире за 1,5 месяца. Уложились в смету, качество отличное! Очень довольна.", rating: 5 },
    { name: "Дмитрий В.", text: "Заказывал капитальный ремонт. Работали аккуратно, каждый этап согласовывали. Рекомендую!", rating: 5 },
    { name: "Елена П.", text: "Дизайнерский ремонт — это нечто! Воплотили все мои хотелки. Спасибо команде.", rating: 5 }
];

// FAQ данные
const faqData = [
    { q: "Дорого ли у вас?", a: "Прозрачная смета без скрытых платежей. Вы платите только за фактические работы." },
    { q: "Как контролировать качество?", a: "Поэтапная приёмка с фотоотчётом в WhatsApp. Вы принимаете каждый этап." },
    { q: "Есть ли гарантия?", a: "Да, 2 года на все виды работ по договору." },
    { q: "Могу ли я купить материалы сам?", a: "Да, либо мы закупаем с вашего одобрения по оптовым ценам." }
];

// Функция рендера галереи
function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = galleryData.map(item => `
        <div class="gallery-card">
            <img src="${item.img}" alt="${item.title}" loading="lazy">
            <div class="gallery-card__info">
                <div class="gallery-card__title">${item.title}</div>
                <div>${item.type}</div>
            </div>
        </div>
    `).join('');
}

// Рендер отзывов
function renderReviews() {
    const container = document.getElementById('reviewsGrid');
    if (!container) return;
    container.innerHTML = reviewsData.map(rev => `
        <div class="review-card">
            <p>“${rev.text}”</p>
            <div class="review-card__author">— ${rev.name}</div>
            <div>${'★'.repeat(rev.rating)}</div>
        </div>
    `).join('');
}

// Рендер FAQ
function renderFaq() {
    const container = document.getElementById('faqGrid');
    if (!container) return;
    container.innerHTML = faqData.map(item => `
        <div class="faq-card">
            <div class="faq-card__question">❓ ${item.q}</div>
            <div class="faq-card__answer">${item.a}</div>
        </div>
    `).join('');
}

// Аккордеон
function initAccordion() {
    const headers = document.querySelectorAll('.accordion__header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });
}

// Модальные окна
function initModals() {
    const overlay = document.getElementById('modalOverlay');
    const triggers = document.querySelectorAll('.modal-trigger');
    const closeBtns = document.querySelectorAll('.modal__close');
    const modals = document.querySelectorAll('.modal');

    function closeModal() {
        overlay.style.display = 'none';
    }

    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = btn.getAttribute('data-modal');
            overlay.style.display = 'flex';
            modals.forEach(modal => modal.style.display = 'none');
            const targetModal = document.getElementById(modalId === 'order' ? 'orderModal' : 'calcModal');
            if (targetModal) targetModal.style.display = 'block';
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
}

// Отправка форм (имитация)
function initForms() {
    const leadForm = document.getElementById('leadForm');
    const modalForm = document.getElementById('modalForm');
    const calcForm = document.getElementById('calcForm');

    const handleSubmit = (e, formType) => {
        e.preventDefault();
        alert(`✅ Заявка принята! Наш менеджер свяжется с вами в ближайшее время. (${formType})`);
        e.target.reset();
        document.getElementById('modalOverlay').style.display = 'none';
    };

    if (leadForm) leadForm.addEventListener('submit', (e) => handleSubmit(e, 'основная форма'));
    if (modalForm) modalForm.addEventListener('submit', (e) => handleSubmit(e, 'модальное окно'));
    if (calcForm) calcForm.addEventListener('submit', (e) => handleSubmit(e, 'расчёт сметы'));
}

// Мобильное меню (показать/скрыть контакты)
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const headerContact = document.querySelector('.header__contact');
    if (btn && headerContact) {
        btn.addEventListener('click', () => {
            if (headerContact.style.display === 'flex') {
                headerContact.style.display = 'none';
            } else {
                headerContact.style.display = 'flex';
                headerContact.style.flexDirection = 'column';
                headerContact.style.position = 'absolute';
                headerContact.style.top = '70px';
                headerContact.style.right = '20px';
                headerContact.style.background = 'white';
                headerContact.style.padding = '16px';
                headerContact.style.borderRadius = '20px';
                headerContact.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                headerContact.style.zIndex = '99';
            }
        });
    }
}

// Анимация появления при скролле (простая)
function initScrollAnimations() {
    const elements = document.querySelectorAll('.advantage-card, .price-card, .process-step, .review-card, .faq-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.4s ease';
        observer.observe(el);
    });
}

// Инициализация всего при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    renderReviews();
    renderFaq();
    initAccordion();
    initModals();
    initForms();
    initMobileMenu();
    initScrollAnimations();
});