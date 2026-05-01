import './WhatsAppButton.css';

const WA_NUMBER = '971528588613';
const WA_MESSAGE = 'Hi,\nI would like to know more about your services.';
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

export default function WhatsAppButton() {
    return (
        <a
            href={WA_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="wa-fab"
            aria-label="Chat with us on WhatsApp"
            id="whatsapp-fab"
        >
            {/* Label pill — slides in on hover */}
            <span className="wa-label">
                <span className="wa-label-phone">+971 52 858 8613</span>
            </span>

            {/* WhatsApp icon */}
            <span className="wa-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.47 1.65 6.35L3 29l6.82-1.6A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Z"
                        fill="#fff"
                    />
                    <path
                        d="M21.56 18.56c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.41-1.5-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01s-.52.07-.79.37C11.82 12 11 12.87 11 14.54c0 1.67 1.22 3.29 1.39 3.52.17.22 2.4 3.67 5.82 5.15.81.35 1.44.56 1.94.71.81.26 1.55.22 2.13.13.65-.1 2-.82 2.28-1.6.28-.78.28-1.45.2-1.6-.08-.14-.27-.22-.57-.37Z"
                        fill="#329657ff"
                    />
                </svg>
            </span>

            {/* Ripple ring */}
            <span className="wa-ripple" aria-hidden="true" />
        </a>
    );
}
