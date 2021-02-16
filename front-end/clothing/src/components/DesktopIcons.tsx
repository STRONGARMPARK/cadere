import React from 'react'
import { DesktopIconModel } from './ComponentModels';
import { DesktopIcon } from './DesktopIcon';

interface DesktopIconsProps {
  icons: DesktopIconModel[]
}

export const DesktopIcons: React.FC<DesktopIconsProps> = ({ icons }) => {
  const iconList = icons.map((icon) => <DesktopIcon icon={icon} />)

  return (
    <div>
      {iconList}
    </div>
  );
}