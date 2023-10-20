import React from 'react';
import { AntDesign, Feather, FontAwesome, Foundation, Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { IconProps } from '../../types';

const getIconFont = (type: any) => {
  switch (type) {
    case 'ant':
      return AntDesign;
    case "feather":
      return Feather;
    case "foundation":
      return Foundation;
    case "octicons":
      return Octicons
    case "ionicons":
      return Ionicons;
    case "fa":
      return FontAwesome;
    case "mi":
      return MaterialIcons;
    default:
      return FontAwesome;
  }
};

const Icon = ({type, ...props}: IconProps) => {
  const FontICon = getIconFont(type);

  return <FontICon {...props} />;
};

export default Icon;