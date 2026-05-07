import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ALLOWED_TAGS = new Set(['b', 'strong', 'em', 'i', 'span', 'br', 'p', 'a', 'ul', 'ol', 'li']);
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  span: new Set(['class']),
  a: new Set(['href', 'target', 'rel']),
};

export function sanitizeHtml(html: string): string {
  const template = document.createElement('template');
  template.innerHTML = html;

  function processNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent ?? '';
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      const tag = el.tagName.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) {
        return Array.from(el.childNodes).map(processNode).join('');
      }
      const allowedAttrs = ALLOWED_ATTRS[tag] ?? new Set<string>();
      const attrs = Array.from(el.attributes)
        .filter(a => allowedAttrs.has(a.name))
        .filter(a => {
          if (tag === 'a' && a.name === 'href') {
            const v = a.value.trim().toLowerCase();
            return v.startsWith('http://') || v.startsWith('https://') || v.startsWith('mailto:') || v.startsWith('/') || v.startsWith('#');
          }
          return true;
        })
        .map(a => ` ${a.name}="${a.value.replace(/"/g, '&quot;')}"`)
        .join('');
      if (tag === 'br') return `<br${attrs}>`;
      return `<${tag}${attrs}>${Array.from(el.childNodes).map(processNode).join('')}</${tag}>`;
    }
    return '';
  }

  return Array.from(template.content.childNodes).map(processNode).join('');
}
