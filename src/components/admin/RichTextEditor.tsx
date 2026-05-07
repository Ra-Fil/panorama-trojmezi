import React, { useLayoutEffect, useRef, useState } from 'react';
import { cn, sanitizeHtml } from '../../lib/utils';
import { Bold, Link, Unlink, Check, X, List } from 'lucide-react';

const GOLD_CLASS = 'text-gold';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const linkInputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      document.execCommand('defaultParagraphSeparator', false, 'p');
      ref.current.innerHTML = sanitizeHtml(value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const execBold = (e: React.MouseEvent) => {
    e.preventDefault();
    document.execCommand('bold', false);
    if (ref.current) onChange(ref.current.innerHTML);
    ref.current?.focus();
  };

  const openLinkInput = (e: React.MouseEvent) => {
    e.preventDefault();
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
    const anchor = sel?.anchorNode?.parentElement?.closest('a');
    setLinkUrl(anchor?.getAttribute('href') ?? 'https://');
    setShowLinkInput(true);
    setTimeout(() => linkInputRef.current?.focus(), 0);
  };

  const confirmLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ref.current) return;
    const url = linkUrl.trim();
    if (url && url !== 'https://') {
      const sel = window.getSelection();
      if (sel && savedRangeRef.current) {
        sel.removeAllRanges();
        sel.addRange(savedRangeRef.current);
      }
      ref.current.focus();
      document.execCommand('createLink', false, url);
      ref.current.querySelectorAll('a').forEach(a => {
        if (!a.getAttribute('target')) a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      });
      onChange(ref.current.innerHTML);
    }
    setShowLinkInput(false);
    setLinkUrl('');
    savedRangeRef.current = null;
  };

  const cancelLink = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLinkInput(false);
    setLinkUrl('');
    savedRangeRef.current = null;
  };

  const execList = (e: React.MouseEvent) => {
    e.preventDefault();
    document.execCommand('insertUnorderedList', false);
    if (ref.current) onChange(ref.current.innerHTML);
    ref.current?.focus();
  };

  const toggleGold = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!ref.current) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
      ref.current.focus();
      return;
    }
    const range = sel.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const parentEl = container.nodeType === Node.TEXT_NODE ? container.parentElement : container as Element;
    const existingGold = parentEl?.closest(`span.${GOLD_CLASS}`);

    if (existingGold) {
      const parent = existingGold.parentNode!;
      while (existingGold.firstChild) parent.insertBefore(existingGold.firstChild, existingGold);
      parent.removeChild(existingGold);
    } else {
      const fragment = range.extractContents();
      const span = document.createElement('span');
      span.className = GOLD_CLASS;
      span.appendChild(fragment);
      range.insertNode(span);
      sel.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      sel.addRange(newRange);
    }
    onChange(ref.current.innerHTML);
    ref.current.focus();
  };

  const execUnlink = (e: React.MouseEvent) => {
    e.preventDefault();
    document.execCommand('unlink', false);
    if (ref.current) onChange(ref.current.innerHTML);
    ref.current?.focus();
  };

  return (
    <div className={cn('border border-gray-200 rounded-lg overflow-hidden', className)}>
      <div className="flex p-1.5 bg-gray-50 border-b border-gray-200 gap-1 items-center flex-wrap">
        {!showLinkInput ? (
          <>
            <button
              type="button"
              onMouseDown={execBold}
              className="w-7 h-7 font-bold text-sm border border-gray-300 rounded bg-white hover:bg-gray-100 transition-colors flex items-center justify-center"
              title="Tučné (Ctrl+B)"
            >
              <Bold size={13} />
            </button>
            <button
              type="button"
              onMouseDown={execList}
              className="w-7 h-7 text-sm border border-gray-300 rounded bg-white hover:bg-gray-100 transition-colors flex items-center justify-center"
              title="Odrážky"
            >
              <List size={13} />
            </button>
            <button
              type="button"
              onMouseDown={toggleGold}
              className="w-7 h-7 border border-gray-300 rounded bg-white hover:bg-gray-100 transition-colors flex flex-col items-center justify-center gap-0.5 pb-0.5"
              title="Zlatá barva"
            >
              <span className="text-xs font-bold leading-none">A</span>
              <span className="w-3.5 h-[3px] rounded-sm bg-amber-500" />
            </button>
            <button
              type="button"
              onMouseDown={openLinkInput}
              className="w-7 h-7 text-sm border border-gray-300 rounded bg-white hover:bg-gray-100 transition-colors flex items-center justify-center"
              title="Vložit odkaz"
            >
              <Link size={13} />
            </button>
            <button
              type="button"
              onMouseDown={execUnlink}
              className="w-7 h-7 text-sm border border-gray-300 rounded bg-white hover:bg-gray-100 transition-colors flex items-center justify-center"
              title="Odebrat odkaz"
            >
              <Unlink size={13} />
            </button>
          </>
        ) : (
          <form onSubmit={confirmLink} className="flex items-center gap-1 flex-1">
            <input
              ref={linkInputRef}
              type="url"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              placeholder="https://..."
              className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 outline-none focus:border-gold min-w-0"
            />
            <button
              type="submit"
              className="w-7 h-7 border border-gray-300 rounded bg-white hover:bg-green-50 transition-colors flex items-center justify-center text-green-600"
              title="Potvrdit"
            >
              <Check size={13} />
            </button>
            <button
              type="button"
              onMouseDown={cancelLink}
              className="w-7 h-7 border border-gray-300 rounded bg-white hover:bg-red-50 transition-colors flex items-center justify-center text-red-500"
              title="Zrušit"
            >
              <X size={13} />
            </button>
          </form>
        )}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={() => ref.current && onChange(ref.current.innerHTML)}
        onPaste={e => {
          e.preventDefault();
          const html = e.clipboardData.getData('text/html');
          const text = e.clipboardData.getData('text/plain');
          document.execCommand('insertHTML', false, html ? sanitizeHtml(html) : text);
          if (ref.current) onChange(ref.current.innerHTML);
        }}
        className="rich-text p-3 min-h-[80px] outline-none text-sm leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0 [&>ul]:mb-3 [&>ol]:mb-3 [&_li]:mb-1"
      />
    </div>
  );
};
