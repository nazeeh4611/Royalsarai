import type { SVGProps } from "react";

/** Custom chat-bubble + handset glyph — deliberately not the stock WhatsApp
 * logo, styled to sit inside our own visual system rather than a generic
 * green plugin icon. */
export function WhatsAppGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M16 4.5C9.7 4.5 4.6 9.4 4.6 15.5c0 2.4.8 4.7 2.2 6.6L5.4 27l5.2-1.5c1.6.8 3.4 1.2 5.4 1.2 6.3 0 11.4-4.9 11.4-11 0-6.1-5.1-11.2-11.4-11.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M11.7 13.9c.5 3.3 3 5.7 6.3 6.2.6.1 1.1-.3 1.2-.9l.2-1c.1-.5-.2-1-.7-1.1l-1.6-.6c-.4-.1-.8 0-1 .3l-.4.5c-1.1-.6-2-1.5-2.5-2.7l.5-.4c.3-.3.4-.6.3-1l-.6-1.6c-.2-.5-.7-.8-1.2-.7l-1 .2c-.6.1-1 .6-.9 1.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
