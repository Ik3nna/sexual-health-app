import React from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { IconProps } from '../../types';

const getIconFont = (type: any) => {
  switch (type) {
    case 'ant':
      return AntDesign;
    default:
      return FontAwesome;
  }
};

const Icon = ({type, ...props}: IconProps) => {
  const FontICon = getIconFont(type);

  return <FontICon {...props} />;
};

export default Icon;