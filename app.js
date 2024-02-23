const switch_btn = document.querySelector('.mode-switch-btn label i');
const bg_color = getComputedStyle(document.documentElement).getPropertyValue('--color-bg');
const fg_color = getComputedStyle(document.documentElement).getPropertyValue('--color-fg');
const text_color = getComputedStyle(document.documentElement).getPropertyValue('--color-text');
const border_color = getComputedStyle(document.documentElement).getPropertyValue('--color-border');

// Function to set light mode based on a boolean value
function setlight(light) {
    switch_btn.classList.remove(light ? 'fa-moon' : 'fa-sun');
    switch_btn.classList.add(light ? 'fa-sun' : 'fa-moon');
    document.documentElement.style.setProperty('--color-bg', light ? getComputedStyle(document.documentElement).getPropertyValue('--color-bg-lightmode') : bg_color);
    document.documentElement.style.setProperty('--color-fg', light ? getComputedStyle(document.documentElement).getPropertyValue('--color-fg-lightmode') : fg_color);
    document.documentElement.style.setProperty('--color-text', light ? getComputedStyle(document.documentElement).getPropertyValue('--color-text-lightmode') : text_color);
    document.documentElement.style.setProperty('--color-border', light ? getComputedStyle(document.documentElement).getPropertyValue('--color-border-lightmode') : border_color);
    document.body.classList.toggle('light', light);
}

// Function to check if the browser supports cookies
function supportsCookies() {
    return navigator.cookieEnabled;
}

// Function to get light mode preference from cookies (if available)
function getlightModeFromCookies() {
    if (supportsCookies()) {
        const lightModeCookie = getCookie('lightMode');
        return lightModeCookie === 'true';
    }
    return undefined; // Return undefined if cookies are not supported or no cookie exists
}

// Function to set a cookie with light mode state
function setlightModeCookie(light) {
    if (supportsCookies()) {
        setCookie('lightMode', light ? 'true' : 'false', 365); // Set cookie for a year
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setlight(true);
    const lightModeFromCookies = getlightModeFromCookies();
    if (lightModeFromCookies !== undefined) {
        setlight(lightModeFromCookies);
        if (lightModeFromCookies)
            document.getElementById('mode-switch-radio').setAttribute('checked', true);
        else
            document.getElementById('mode-switch-radio').removeAttribute('checked');
    }

    document.getElementById('mode-switch-radio').addEventListener('change', (event) => {
        setlight(event.target.checked);
        setlightModeCookie(event.target.checked); // Update cookie on switch change
    });
});

// Helper function to set a cookie (if supported)
function setCookie(name, value, expiresInDays = 1) {
    if (supportsCookies()) {
        const date = new Date();
        date.setTime(date.getTime() + (expiresInDays * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }
}

// Helper function to get a cookie (if supported)
function getCookie(name) {
    if (supportsCookies()) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
    }
    return null;
}

const nav = document.querySelectorAll('#header, .menu');

window.addEventListener('scroll', () => {
    // if (window.scrollY > 0) {

    //     const currentScrollY = window.scrollY;
    //     const newColor = getComputedStyle(document.documentElement).getPropertyValue('--color-fg');
    //     nav.forEach( (div) => div.style.backgroundColor = `rgb(${newColor})`);
    //     prevScrollY = currentScrollY;
    // }
});
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.menu a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector(`.menu a[href*=${id}]`).classList.add('active');
            });
        };
    });
};


const overlay = document.getElementById('overlay');
const iframe = document.querySelector('.project-popup');
function showProject(link) {
    document.querySelector('.project-popup iframe').setAttribute('src', link.getAttribute('data-project-link'));
    overlay.style.setProperty('display', 'initial');
    iframe.style.setProperty('display', 'initial');
}
overlay.addEventListener('click', () => closePopup());

function closePopup() {
    overlay.style.setProperty('display', 'none');
    iframe.style.setProperty('display', 'none');
}