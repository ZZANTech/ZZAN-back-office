import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Button } from "@/components/ui/button";

type DropdownMenuItem = {
  label: string;
  onClick: () => void;
};

type DropdownMenuProps = {
  buttonLabel: React.ReactNode;
  items: DropdownMenuItem[];
};

function DropdownMenu({ buttonLabel, items }: DropdownMenuProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton as={Button} variant="outline">
          {buttonLabel}
        </MenuButton>
      </div>
      <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="py-1">
          {items.map((item, index) => (
            <MenuItem
              key={index}
              as="button"
              className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={item.onClick}
            >
              {item.label}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}

export default DropdownMenu;
