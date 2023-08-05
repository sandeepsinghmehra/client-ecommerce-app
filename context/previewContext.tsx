"use client";

import { createContext, useState, ReactNode } from 'react';
import { Product } from '@/types';

// Define the types for your context data and actions
interface PreviewContextData {
  previewModal: {
    isOpen: boolean;
    data?: Product | undefined;
  };
  onOpen: (data: Product) => void;
  onClose: () => void;
}

// Create the context
export const PreviewContext = createContext<PreviewContextData | undefined>(undefined);

// Create a provider component to wrap your app with
export function PreviewContextProvider({ children }: { children: ReactNode }) {
  // Initialize your state and actions here
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    data: Product | undefined;
  }>({
    isOpen: false,
    data: undefined,
  });
  // Define your action functions
  const onOpen = (data: Product) => {
    // Implement your action logic here
    setPreviewModal({ isOpen: true, data: data });
  };

  const onClose = () => {
    setPreviewModal({ isOpen: false, data: undefined });
  };

  // Create the context value containing both state and actions
  const contextValue: PreviewContextData = {
    previewModal,
    onOpen,
    onClose,
  };

  return <PreviewContext.Provider value={contextValue}>{children}</PreviewContext.Provider>;
}