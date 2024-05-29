/**
 * This file manages the interactivity and functionality for the profile card web application.
 * It handles various aspects like:
 *   - Social media icon animation on click
 *   - Modal operations (open/close, focus trapping)
 *   - Contact form submission and error handling
 */

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------------------------------------
    // Social Media Icon Animation
    // ------------------------------------------------------------------------
    const socialLinks = document.querySelectorAll('.socials .socialMediaIcon');
    socialLinks.forEach((link) => {
        link.addEventListener('click', () => {
            link.classList.add('scale');
            setTimeout(() => {
                link.classList.remove('scale');
            }, 100);
        });
    });

    // ------------------------------------------------------------------------
    // Modal Functionality
    // ------------------------------------------------------------------------
    
    /**
     * References to various modal elements for manipulation.
     */
    const openModalBtn = document.getElementsByClassName('contact')[0];
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const contactForm = document.getElementById('contact-form');
    const sendButton = contactForm.querySelector('button[type="submit"]');
    const sendersName = document.getElementById('name');
    const sendersEmail = document.getElementById('email');
    const sendersMessage = document.getElementById('message');

    /**
     * String representation of a CSS selector targeting focusable elements within the modal.
     * 
     * @type {string}
     */
    const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

    /**
     * Array to store references to focusable elements within the modal.
     * 
     * @type {Element[]}
     */
    let focusableElements = [];

    /**
     * References to the first and last focusable elements within the modal (updated dynamically).
     */
    let firstFocusableElement;
    let lastFocusableElement;

    /**
     * Updates the `focusableElements` array with the latest list of focusable elements inside the modal.
     */
    function updateFocusableElements() {
        focusableElements = modal.querySelectorAll(focusableElementsString);
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];
    }

    /**
     * Sets the `tabindex` attribute for all focusable elements within the modal to a specified value.
     * 
     * @param {string} value The value to set for the `tabindex` attribute
     */
    function setTabindex(value) {
        focusableElements.forEach(element => element.setAttribute('tabindex', value));
    }

    /**
     * Opens the modal and enables focus trapping behavior.
     */
    function openModal() {
        toggleSocialMediaIconPosition();
        modal.classList.add('active');
        updateFocusableElements();
        setTabindex('0');
        firstFocusableElement.focus();
    }

    openModalBtn.addEventListener('click', openModal);

    /**
     * Closes the modal, resets the contact form, and disables focus trapping.
     */
    function closeModal() {
        clearFormFields();
        modal.classList.remove('active');
        toggleSocialMediaIconPosition();
        setTabindex('-1');
        openModalBtn.focus();
    }

    closeBtn.addEventListener('click', closeModal);

    /**
     * Handles keyboard events (Escape and Tab) to manage focus trapping within the modal.
     * 
     * @param {KeyboardEvent} e The keyboard event object
     */
    function handleKeyDown(e) {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'Tab') {
                handleTabKey(e);
            }
        }
    }

    document.addEventListener('keydown', handleKeyDown);

    /**
     * Handles Tab and Shift+Tab keypresses to ensure focus stays within the modal boundaries.
     * 
     * @param {KeyboardEvent} e The keyboard event object
     */
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

    // ------------------------------------------------------------------------
    // Contact Form Functionality
    // ------------------------------------------------------------------------
    
    /**
     * Initializes the `focusableElements` array and sets the initial `tabindex` for the modal content.
     */
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
            closeModal();
        } catch (error) {
            alert("Could not send message. Please try again later.");
        } finally {
            sendButton.disabled = false;
        }
    });

    // ------------------------------------------------------------------------
    // Helper Functions
    // ------------------------------------------------------------------------

    /**
     * Sends contact form data to the server using a fetch request.
     * 
     * @param {Object} data The contact form data to be sent
     * @returns {Promise<Response>} The promise resolving with the server response
     */
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

    /**
     * Clears all input fields within the contact form.
     */
    function clearFormFields() {
        sendersEmail.value = '';
        sendersName.value = '';
        sendersMessage.value = '';
    }

    /**
   * Toggles 'no-position' CSS class on all social media links to manipulate their position property.
   */
    function toggleSocialMediaIconPosition (){
        socialLinks.forEach((link) => {
            let hasNoPositionClass = link.classList.contains("no-position");

            // Toggle the 'no-position' class on each social link
            if(hasNoPositionClass){
                link.classList.remove("no-position");
            } else {
                link.classList.add("no-position");
            }
        })
    }
});