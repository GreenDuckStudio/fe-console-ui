import React from 'react';
import styles from './effects.module.scss';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

interface EffectProps {
  effectId: string;
  className?: string;
  onMouseMove?: () => void;
}

const Effect = ({ effectId, className, onMouseMove: onMouseMove }: EffectProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={classNames(styles['effect-container'], styles[className || ''])}
      onMouseMove={onMouseMove}>
      <div className={styles['effect-name']}>{t(effectId)}</div>
    </div>
  );
};

export default Effect;
