import React from 'react';
import { useEffect, useRef } from 'react';
import { ConfigProvider, Dropdown, MenuProps } from 'antd';
import styles from './bar.module.scss';
import cx from 'classnames';
import Lottie from 'lottie-react';
import animationData from '../../assets/ani1.json';
export interface BarProps {
  className?: string;
  onInputChange?: (value: string) => void;
}

const items: MenuProps['items'] = [
  {
    key: 'PNG',
    label: <div className={styles['camera-dropdown-item']}>PNG</div>
  },
  {
    key: 'CLIPBOARD',
    label: <div className={styles['camera-dropdown-item']}>Clipboard</div>
  }
];

declare global {
  interface Window {
    electron?: {
      on: (channel: string, callback: () => void) => void;
      off: (channel: string, callback: () => void) => void;
    };
  }
}

export const Bar = ({ className, onInputChange }: BarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const handleWindowShow = () => {
      if (inputRef.current) {
        inputRef.current.select();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    // Listen for window show event
    window.electron?.on('window-show', handleWindowShow);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      window.electron?.off('window-show', handleWindowShow);
    };
  }, []);

  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.div3}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles['bar-icon']}>
          <path d="M32.6667 35L22.1667 24.5C21.3333 25.1667 20.375 25.6944 19.2917 26.0833C18.2083 26.4722 17.0556 26.6667 15.8333 26.6667C12.8056 26.6667 10.2433 25.6178 8.14667 23.52C6.05 21.4222 5.00111 18.86 5 15.8333C4.99889 12.8067 6.04778 10.2444 8.14667 8.14667C10.2456 6.04889 12.8078 5 15.8333 5C18.8589 5 21.4217 6.04889 23.5217 8.14667C25.6217 10.2444 26.67 12.8067 26.6667 15.8333C26.6667 17.0556 26.4722 18.2083 26.0833 19.2917C25.6944 20.375 25.1667 21.3333 24.5 22.1667L35 32.6667L32.6667 35ZM15.8333 23.3333C17.9167 23.3333 19.6878 22.6044 21.1467 21.1467C22.6056 19.6889 23.3344 17.9178 23.3333 15.8333C23.3322 13.7489 22.6033 11.9783 21.1467 10.5217C19.69 9.065 17.9189 8.33556 15.8333 8.33333C13.7478 8.33111 11.9772 9.06056 10.5217 10.5217C9.06611 11.9828 8.33667 13.7533 8.33333 15.8333C8.33 17.9133 9.05945 19.6844 10.5217 21.1467C11.9839 22.6089 13.7544 23.3378 15.8333 23.3333Z" />
        </svg>
        <input
          ref={inputRef}
          className={styles['bar-input']}
          spellCheck="false"
          onInput={(e) => {
            if (onInputChange) {
              onInputChange(e.currentTarget.value);
            }
          }}
        />
        <ConfigProvider
          theme={{
            token: {
              colorBgElevated: '#191919',
              colorText: '#c9c9c9'
            },
            components: {
              Dropdown: {
                controlItemBgHover: '#2a2a2a'
              },
              Menu: {
                darkItemBg: '#2d2d2d',
                darkItemHoverBg: '#ff2727',
                darkItemSelectedBg: '#ff2727',
                itemHoverColor: '#ffffff',
                darkItemHoverColor: '#ffffff'
              }
            }
          }}>
          <Lottie animationData={animationData} autoPlay={true} loop={true}></Lottie>
          <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
            {/* <Lottie animationData={animationData} loop={true} autoplay={true} /> */}
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles['bar-icon']}>
              <path d="M6.33335 6.33334H11.0834L14.25 3.16667H23.75L26.9167 6.33334H31.6667C32.5065 6.33334 33.312 6.66697 33.9059 7.26083C34.4997 7.8547 34.8334 8.66015 34.8334 9.50001V28.5C34.8334 29.3399 34.4997 30.1453 33.9059 30.7392C33.312 31.333 32.5065 31.6667 31.6667 31.6667H6.33335C5.4935 31.6667 4.68805 31.333 4.09418 30.7392C3.50032 30.1453 3.16669 29.3399 3.16669 28.5V9.50001C3.16669 8.66015 3.50032 7.8547 4.09418 7.26083C4.68805 6.66697 5.4935 6.33334 6.33335 6.33334ZM19 11.0833C16.9004 11.0833 14.8868 11.9174 13.4021 13.4021C11.9174 14.8867 11.0834 16.9004 11.0834 19C11.0834 21.0996 11.9174 23.1133 13.4021 24.5979C14.8868 26.0826 16.9004 26.9167 19 26.9167C21.0996 26.9167 23.1133 26.0826 24.5979 24.5979C26.0826 23.1133 26.9167 21.0996 26.9167 19C26.9167 16.9004 26.0826 14.8867 24.5979 13.4021C23.1133 11.9174 21.0996 11.0833 19 11.0833ZM19 14.25C20.2598 14.25 21.468 14.7505 22.3588 15.6412C23.2496 16.532 23.75 17.7402 23.75 19C23.75 20.2598 23.2496 21.468 22.3588 22.3588C21.468 23.2496 20.2598 23.75 19 23.75C17.7402 23.75 16.5321 23.2496 15.6413 22.3588C14.7505 21.468 14.25 20.2598 14.25 19C14.25 17.7402 14.7505 16.532 15.6413 15.6412C16.5321 14.7505 17.7402 14.25 19 14.25Z" />
            </svg>
          </Dropdown>
        </ConfigProvider>
      </div>
    </div>
  );
};
