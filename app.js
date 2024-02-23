const switch_btn = document.querySelector('.mode-switch-btn label i');
const bg_color = getComputedStyle(document.documentElement).getPropertyValue('--color-bg');
const fg_color = getComputedStyle(document.documentElement).getPropertyValue('--color-fg');
const text_color = getComputedStyle(document.documentElement).getPropertyValue('--color-text');
const border_color = getComputedStyle(document.documentElement).getPropertyValue('--color-border');

// Function to set dark mode based on a boolean value
function setDark(dark) {
    switch_btn.classList.remove(dark ? 'fa-moon' : 'fa-sun');
    switch_btn.classList.add(dark ? 'fa-sun' : 'fa-moon');
    document.documentElement.style.setProperty('--color-bg', dark ? getComputedStyle(document.documentElement).getPropertyValue('--color-bg-darkmode') : bg_color);
    document.documentElement.style.setProperty('--color-fg', dark ? getComputedStyle(document.documentElement).getPropertyValue('--color-fg-darkmode') : fg_color);
    document.documentElement.style.setProperty('--color-text', dark ? getComputedStyle(document.documentElement).getPropertyValue('--color-text-darkmode') : text_color);
    document.documentElement.style.setProperty('--color-border', dark ? getComputedStyle(document.documentElement).getPropertyValue('--color-border-darkmode') : border_color);
    document.body.classList.toggle('dark', dark);
}

// Function to check if the browser supports cookies
function supportsCookies() {
    return navigator.cookieEnabled;
}

// Function to get dark mode preference from cookies (if available)
function getDarkModeFromCookies() {
    if (supportsCookies()) {
        const darkModeCookie = getCookie('darkMode');
        return darkModeCookie === 'true';
    }
    return undefined; // Return undefined if cookies are not supported or no cookie exists
}

// Function to set a cookie with dark mode state
function setDarkModeCookie(dark) {
    if (supportsCookies()) {
        setCookie('darkMode', dark ? 'true' : 'false', 365); // Set cookie for a year
    }
}

// Function to get system-level dark mode preference (if supported)
function getSystemDarkModePreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color: dark)').matches) {
        return true;
    }
    return false;
}

// Main logic
window.addEventListener('DOMContentLoaded', () => {
    // 1. Check for existing dark mode preference in cookies
    const darkModeFromCookies = getDarkModeFromCookies();
    if (darkModeFromCookies !== undefined) {
        setDark(darkModeFromCookies);
        if (darkModeFromCookies)
            document.getElementById('mode-switch-radio').setAttribute('checked', true);
        else
            document.getElementById('mode-switch-radio').removeAttribute('checked');
    } else {
        // 2. Check for system-level dark mode preference (fallback)
        const systemDarkModePreference = getSystemDarkModePreference();
        if (systemDarkModePreference) {
            setDark(true);
            setDarkModeCookie(true); // Set cookie to remember preference
            //   document.getElementById('mode-switch-radio').setAttribute('checked', true);
        }
    }

    // 3. Add event listener to toggle switch
    document.getElementById('mode-switch-radio').addEventListener('change', (event) => {
        setDark(event.target.checked);
        setDarkModeCookie(event.target.checked); // Update cookie on switch change
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
    if (window.scrollY > 0) {

        const currentScrollY = window.scrollY;
        const newColor = getComputedStyle(document.documentElement).getPropertyValue('--color-fg');
        nav.forEach( (div) => div.style.backgroundColor = `rgb(${newColor})`);
        prevScrollY = currentScrollY;
    }
});
const links = document.querySelectorAll('.menu a');
links.forEach(() => addEventListener('click', (e) => {
    links.forEach(link => {
        link.classList.toggle('active', link === e.target);
    })

}));
