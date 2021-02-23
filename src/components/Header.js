import Link from 'next/link'
import { useRef, useState, useEffect } from 'react';

function BlogName({ className }) {
  const [hoverRef, isHovered] = useHover();

  return (
    <div ref={hoverRef} className={className}>
      {isHovered ? '<ZangTengfei />' : '臧腾飞的博客'}
    </div>
  );
}

export default function Header() {
  return (
    <header className="flex flex-col justify-center items-center py-10">
      <div>
        <Link href="/">
          <a aria-label="臧腾飞的博客">
            <BlogName className="text-xl font-bold hover:text-red-500" />
          </a>
        </Link>
      </div>
      <div className="text-sm m-4">
      热爱生活
      </div>
    </header>
  )
}

// Hook
function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);

        return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
}