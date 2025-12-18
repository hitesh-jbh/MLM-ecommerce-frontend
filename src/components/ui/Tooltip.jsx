import { useFloating, offset, shift, arrow, autoUpdate } from '@floating-ui/react';
import { useState } from 'react';

const Tooltip = ({ children, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), shift()],
    whileElementsMounted: autoUpdate,
  });

  return (
    <>
      <span
        ref={refs.setReference}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </span>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="bg-black text-white px-3 py-2 rounded text-lg font-medium"
        >
          {content}
        </div>
      )}
    </>
  );
};

export default Tooltip;