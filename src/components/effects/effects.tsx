import React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './effects.module.scss';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import Effect from './effect';
import Fuse from 'fuse.js';
import { window as neuWindow } from '@neutralinojs/lib';
import { Scrollbars } from 'react-custom-scrollbars-2';
interface EffectsProps {
  searchInput?: string;
  className?: string;
}

export const Effects = ({ searchInput = '', className }: EffectsProps) => {
  const { t, i18n } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMouseInteracting, setIsMouseInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const effectIds = useMemo(() => {
    const resources = i18n.getResourceBundle(i18n.language, 'translation');
    return Object.keys(resources.video?.effects || {});
  }, [i18n.language]);

  const filteredEffects = useMemo(() => {
    if (!searchInput) return effectIds;

    setSelectedIndex(0);

    const searchTerm = searchInput.toLowerCase();
    const effectsList = effectIds.map((id) => ({
      id,
      name: t(`video.effects.${id}`).toLowerCase()
    }));

    // Set up Fuse.js options
    const fuse = new Fuse(effectsList, {
      keys: ['name'],
      threshold: 0.4 // Adjust similarity sensitivity (0 = exact match, 1 = very loose)
    });

    const results = fuse.search(searchTerm);
    return results.map((result) => result.item.id);
  }, [searchInput, effectIds, t]);
  useEffect(() => {
    console.log('height chenge');
    neuWindow.setSize({ width: 400, height: 55 + 43 * Math.min(filteredEffects.length, 6) });
  }, [filteredEffects]);
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      setIsMouseInteracting(false);

      setSelectedIndex((prev) => {
        const nextIndex =
          e.key === 'ArrowUp'
            ? (prev - 1 + filteredEffects.length) % filteredEffects.length
            : (prev + 1) % filteredEffects.length;
        return nextIndex;
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container && !isMouseInteracting) {
      const selectedElement = container.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        const elementTop = selectedElement.offsetTop;
        const containerScrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const headerHeight = 55;

        if (elementTop <= containerScrollTop + headerHeight) {
          container.scrollTo({
            top: elementTop - headerHeight
          });
        } else if (elementTop > containerScrollTop + containerHeight) {
          container.scrollTo({
            top: elementTop - containerHeight - 12
          });
        }
      }
    }
  }, [selectedIndex, isMouseInteracting]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredEffects.length]);

  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index);
  };

  const handleMouseLeave = () => {
    setIsMouseInteracting(false);
  };

  return (
    <div
      ref={containerRef}
      className={cx(styles.effects, className)}
      onMouseLeave={handleMouseLeave}>
      <Scrollbars
        style={{ height: 300 }} // Adjust the height as needed
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: '#7c7c7cff', // Thumb color
              borderRadius: '6px' // Rounded corners
            }}
          />
        )}>
        {filteredEffects.map((effectId, index) => (
          <Effect
            key={effectId}
            effectId={`video.effects.${effectId}`}
            className={cx({
              'effect-container-selected': index === selectedIndex
            })}
            onMouseMove={() => handleMouseEnter(index)}
          />
        ))}
      </Scrollbars>
    </div>
  );
};
