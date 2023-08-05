"use client"
import { useContext } from "react";
import { PreviewContext } from "./previewContext";

// Create a custom hook to use the context
export function usePreviewContext() {
    const context = useContext(PreviewContext);
    if (!context) {
      throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
  
}