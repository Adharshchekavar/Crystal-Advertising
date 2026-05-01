import { useState, useCallback } from 'react';
import './CopyEmailBtn.css';

const EMAIL = 'crystaladvertising777@gmail.com';

/**
 * Drop-in replacement for <a href="mailto:...">
 * – hover  → shows "Click to copy"
 * – click  → copies email, shows "Copied!" for 2 s
 *
 * Props:
 *   className  – pass through any existing button class
 *   children   – button label text / content
 *   style      – optional inline styles
 */
export default function CopyEmailBtn({ className = '', children, style }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async (e) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(EMAIL);
        } catch {
            // Fallback for older browsers
            const ta = document.createElement('textarea');
            ta.value = EMAIL;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    return (
        <button
            type="button"
            className={`copy-email-btn ${className} ${copied ? 'copy-email-btn--copied' : ''}`}
            onClick={handleCopy}
            style={style}
            aria-label={copied ? 'Email copied!' : `Copy email: ${EMAIL}`}
        >
            {/* Tooltip */}
            <span className="copy-email-tooltip" aria-hidden="true">
                {copied
                    ? <><CheckIcon /> Email Copied!</>
                    : <><CopyIcon /> Click to copy</>
                }
            </span>

            {/* Button content */}
            <span className="copy-email-inner">
                {copied
                    ? <><CheckIcon /> Copied!</>
                    : children
                }
            </span>
        </button>
    );
}

/* ── Inline SVG icons ───────────────────────────────────────── */
function CopyIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
