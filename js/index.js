// Write custom JavaScript here.
// You may ignore this file and delete if if JavaScript is not required for your challenge.


/* //Not recommended as you can overwrite other style
let contactMeButton = document.getElementsByClassName("contact");
contactMeButton[0].setAttribute('style','color:yellow'); */

// document.addEventListener('DOMContentLoaded', () => {

//     const socialButtons = document.querySelector('.socialMediaIcon');
//     console.log(socialButtons);

//     document.addEventListener('click', () => {
//         console.log('clicked an icon')
//         socialButtons.classList.add('scale');
//         setTimeout(() => {
//             socialButtons.classList.remove('scale');
//         }, 300);

//     });
// });


document.addEventListener('DOMContentLoaded', () => {

    const socialLinks  = document.querySelectorAll('.socials .socialMediaIcon');

    socialLinks.forEach((link) => {
        link.addEventListener('click', () => {
            link.classList.add('scale');

            setTimeout(() => {
                link.classList.remove('scale');
            }, 100);
        });
    });

    const openModalBtn = document.getElementsByClassName("contact")[0]; // Updated ID
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const contactForm = document.getElementById('contact-form');
    const sendButton = contactForm.querySelector('button[type="submit"]');
    let sendersName = document.getElementById('name');
    let sendersEmail = document.getElementById('email');
    let sendersMessage = document.getElementById('message');

    openModalBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        clearFormFields();
        modal.classList.remove('active');
    });   

    contactForm.addEventListener('submit', async (event) => {

        event.preventDefault(); // Prevent default form submission
        sendButton.disabled = true;

        // Handle form submission logic here (e.g., send email)
        const data = {
            name: sendersName.value,
            email: sendersEmail.value,
            message: sendersMessage.value,
        }

        try{
            await sendMessage(data);
            clearFormFields();
            alert("Thank you for your message. I look forward to connecting with you!")
            modal.classList.remove('active');
        } catch (error) {
            alert("Could not send message. Pleae try again later.")
        } finally {
            sendButton.disabled = false;
        }
    });

    async function sendMessage(data){
        try{
            const response = await fetch("https://profile-card-ten-ecru.vercel.app/send-email", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            });

            if(!response.ok){
            const error = await response.json();
            throw new Error(error.error + ':\n' + error.details);
            }

            const result = await response.json();
            console.log("Success: " + result);

        } catch (error) {
            console.log(error.message);
            throw error()
        }
    }

    // Close modal on Esc key press
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            clearFormFields();
            modal.classList.remove('active');
        }
    });

    function clearFormFields () {
        sendersEmail.value = '';
        sendersName.value = '';
        sendersMessage.value = '';
    }

    function alertComplete(button) {
        button.disabled = false;
    }
});

// let contactMeButton = document.getElementById('contactButton');

// contactMeButton.addEventListener('click', () => {
//     console.log('clicked button')
// })
