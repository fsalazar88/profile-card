/**
 * Initializes the functionality for the profile card web application.
 * This script handles interactivity such as modal operations, form submissions,
 * and trapping focus within the modal.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Social Media Icons Animation
    const socialLinks = document.querySelectorAll('.socials .socialMediaIcon');
    socialLinks.forEach((link) => {
        link.addEventListener('click', () => {
            link.classList.add('scale');
            setTimeout(() => {
                link.classList.remove('scale');
            }, 100);
        });
    });

    // Modal Elements
    const openModalBtn = document.getElementsByClassName('contact')[0];
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const contactForm = document.getElementById('contact-form');
    const sendButton = contactForm.querySelector('button[type="submit"]');
    const sendersName = document.getElementById('name');
    const sendersEmail = document.getElementById('email');
    const sendersMessage = document.getElementById('message');
    const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    let focusableElements = [];
    let firstFocusableElement;
    let lastFocusableElement;

    // Update the list of focusable elements within the modal
    function updateFocusableElements() {
        focusableElements = modal.querySelectorAll(focusableElementsString);
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];
    }

    // Set tabindex attribute to manage focusability
    function setTabindex(value) {
        focusableElements.forEach(element => element.setAttribute('tabindex', value));
    }

    // Open the modal and set focus trapping
    openModalBtn.addEventListener('click', () => {
        modal.classList.add('active');
        updateFocusableElements();
        setTabindex('0');
        firstFocusableElement.focus();
    });

    // Close the modal and reset form
    closeBtn.addEventListener('click', () => {
        clearFormFields();
        modal.classList.remove('active');
        setTabindex('-1');
        openModalBtn.focus();
    });

    // Manage focus trapping and escape key for modal
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeBtn.click();
            } else if (e.key === 'Tab') {
                handleTabKey(e);
            }
        }
    });

    // Handle Tab and Shift+Tab keypress to trap focus within modal
    function handleTabKey(e) {
        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstFocusableElement) {
                e.preventDefault();
                lastFocusableElement.focus();
            }
        } else { // Tab
            if (document.activeElement === lastFocusableElement) {
                e.preventDefault();
                firstFocusableElement.focus();
            }
        }
    }

    // Initialize tabindex settings
    updateFocusableElements();
    setTabindex('-1');

    // Handle form submission
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission
        sendButton.disabled = true;

        const data = {
            name: sendersName.value,
            email: sendersEmail.value,
            message: sendersMessage.value,
        };

        try {
            await sendMessage(data);
            clearFormFields();
            alert("Thank you for your message. I look forward to connecting with you!");
            modal.classList.remove('active');
        } catch (error) {
            alert("Could not send message. Please try again later.");
        } finally {
            sendButton.disabled = false;
        }
    });

    // Send message to server
    async function sendMessage(data) {
        try {
            const response = await fetch("https://profile-card-ten-ecru.vercel.app/send-email", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`${error.error}:\n${error.details}`);
            }

            const result = await response.json();
            console.log("Success: " + result);
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    // Clear form fields
    function clearFormFields() {
        sendersEmail.value = '';
        sendersName.value = '';
        sendersMessage.value = '';
    }
});
