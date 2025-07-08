// === JAVASCRIPT LOGIKA KEZDETE ===

// A 'DOMContentLoaded' biztosítja, hogy a script csak akkor fusson le, ha az oldal teljesen betöltődött.
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Dinamikus Év a Láblécben ---
    // Megkeresi az elemet, aminek 'current-year' az ID-ja, és beleteszi az aktuális évet.
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. Kapcsolati Űrlap Kezelése ---
    // Csak akkor próbálja futtatni, ha létezik a form az oldalon.
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const formMessage = document.getElementById('form-message');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Megakadályozza az oldal újratöltését küldéskor.

            const formData = new FormData(contactForm);
            const webhookURL = contactForm.action;
            
            formMessage.textContent = 'Küldés...';
            formMessage.className = '';
            formMessage.style.display = 'block';

            // Adatok küldése a Zapier webhookra a háttérben.
            fetch(webhookURL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors', // Fontos: a Zapier 'no-cors' módot igényel.
            })
            .then(() => {
                contactForm.reset(); // Kiüríti az űrlapot sikeres küldés után.
                formMessage.textContent = 'Köszönöm a megkeresést! Hamarosan jelentkezem.';
                formMessage.className = 'success';
            })
            .catch(error => {
                console.error('Hiba történt:', error);
                formMessage.textContent = 'Hiba történt a küldés során. Kérjük, próbálja újra később.';
                formMessage.className = 'error';
            });
        });
    }

    // --- 3. Fejléc Görgetésre (Ezt a kódot már máshol is használhatod) ---
    const header = document.querySelector('.main-header');
    if(header){
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
}); // A 'DOMContentLoaded' vége