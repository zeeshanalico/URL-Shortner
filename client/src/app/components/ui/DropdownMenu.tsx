import React, { ReactNode, useState, useRef, useEffect } from 'react';

interface DropdownMenuProps {
  children: ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  return (
    <div className="relative inline-block text-left">
      {children}
    </div>
  );
}

interface DropdownMenuTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export function DropdownMenuTrigger({ children, asChild = false }: DropdownMenuTriggerProps) {
  return (
    <button
      type="button"
      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {children}
    </button>
  );
}

interface DropdownMenuContentProps {
  children: ReactNode;
  align?: 'start' | 'end';
}

export function DropdownMenuContent({ children, align = 'start' }: DropdownMenuContentProps) {
  return (
    <div
      className={`absolute ${align === 'end' ? 'right-0' : 'left-0'} z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
    >
      {children}
    </div>
  );
}

interface DropdownMenuLabelProps {
  children: ReactNode;
}

export function DropdownMenuLabel({ children }: DropdownMenuLabelProps) {
  return (
    <div className="px-4 py-2 text-sm font-semibold text-gray-900">
      {children}
    </div>
  );
}

interface DropdownMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
}

export function DropdownMenuItem({ children, onClick }: DropdownMenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {children}
    </button>
  );
}
