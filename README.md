# Intuitive and Customizable Profile Card

A simple and responsive personal profile card with a modal contact form. This project showcases a modern, clean design using HTML, CSS, and JavaScript, with a focus on accessibility and responsive design. Additionally, it includes an Express backend for handling form submissions via email using Nodemailer.

**Visit the completed and fully functional profile card at [https://fsalazar88.github.io/profile-card/](https://fsalazar88.github.io/profile-card/).**

This profile card was adapted from the following challenge: "[GreatFrontEnd Projects Challenge](https://www.greatfrontend.com/projects/challenges/profile-card)". Thank you for the inspiration.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Express Backend and Nodemailer](#express-backend-and-nodemailer)
- [Contributing](#contributing)
- [Contact](#contact)

## Project Overview

This project is a static web page that features a personal profile card with an image, bio, and social media icons. It includes a contact button that opens a modal with a contact form. The design is responsive and adapts to different screen sizes. An Express backend handles the contact form submissions, sending the form data to a specified email address using Nodemailer.  
<br/>
<div style="text-align: center;">
    <img src="img/Recording 2024-06-03 at 8.13.28 PM.gif" width="500">
</div>

## Features

- **Responsive Design**: The layout adjusts seamlessly to different screen sizes, ensuring a good user experience on both desktop and mobile devices.
- **Profile Card**: Displays a profile picture, bio, and social media icons.
- **Contact Form**: Includes a modal contact form with accessible features and smooth transitions. <br/><table>
  <table style="border-collapse: collapse; border: none;">
    <tr style="border: none;">
      <td style="border: none; text-align: center;">
        <img src="img/Screenshot 2024-05-31 223007.png" width="400">
      </td>
      <td style="border: none; text-align: center;">
        <img src="img/Screenshot 2024-05-31 223044.png" width="400">
      </td>
    </tr>
  </table>
- **Accessibility**: Focus on accessible design with proper color contrast, focus states, and screen reader-friendly elements.
- **Tooltips**: Social media icons include tooltips for better user interaction. The links send you to the developer's GitHub profile, LinkedIn profile, Calendly to schedule a time to speak, and the ability to copy the developer's email address.
  <br/>
  <br/>
  <div style="text-align: center;">
    <img src="img/Recording 2024-06-04 at 10.46.11 AM.gif" width="400" style="display: block; margin: 0 auto;">
  </div>  
  <br/>
- **Express Backend**: Handles contact form submissions and sends the data via email using Nodemailer.

## Technologies Used

- **HTML**: Structure of the web page.
- **CSS**: Styling of the web page.
  - Flexbox for layout.
  - Media queries for responsive design.
  - CSS transitions for smooth interactions.
- **JavaScript**: Handles frontend interactivity and AJAX requests.
- **Express**: Backend server for handling form submissions.
- **Nodemailer**: Sends emails with form data to a specified inbox.

## Setup and Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/fsalazar88/profile-card.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd profile-card
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Create a `.env` file in the root directory** and add your email credentials:
    ```plaintext
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-email-password
    ```

5. **Start the Express server**:
    ```bash
    npm run dev
    ```

6. **Open `index.html` in your preferred web browser**:
    ```bash
    open index.html
    ```
    Alternatively, you can use a live server extension in your code editor to serve the project locally.

## Usage

- Open the web page in your browser to view the profile card.
- Click the contact button to open the modal contact form.
- Hover over the social media icons to view tooltips.
- Use the social media icons to navigate to the developer's GitHub profile, LinkedIn profile, Calendly for scheduling, or copy the developer's email address.

## File Structure

```plaintext
profile-card/
│
├── api/
│   ├── index.js          # Express backend server
│
├── css/
│   ├── style.css         # Main CSS file
│
├── designs/              # Directory for design assets
│
├── img/                  # Directory for images
│
├── js/
│   ├── index.js          # Main JavaScript file
│
├── index.html            # Main HTML file
├── .gitignore            # Git ignore file
├── package.json          # Node.js package file for backend dependencies
├── README.md             # Project README file
```

## Express Backend and Nodemailer
The Express backend server is set up to handle form submissions from the contact form. When the form is submitted, the data is sent to the **/send-email** endpoint, which uses Nodemailer to send the form content to a specified email address.

## Contributing
Contributions are welcome! If you have any improvements or new features to suggest, please follow these steps:
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.

## Contact
For any questions or feedback, please contact fabianxsalazar@gmail.com.
