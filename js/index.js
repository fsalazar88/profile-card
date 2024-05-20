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
    console.log(socialLinks);

    socialLinks.forEach((link) => {
        link.addEventListener('click', () => {
            console.log('clicked an icon')
            link.classList.add('scale');

            setTimeout(() => {
                link.classList.remove('scale');
            }, 100);
    
        });
    });
});

// let contactMeButton = document.getElementById('contactButton');

// contactMeButton.addEventListener('click', () => {
//     console.log('clicked button')
// })
