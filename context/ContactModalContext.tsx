import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContactModalContextType {
  isContactModalOpen: boolean;
  setContactModalOpen: (open: boolean) => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export const ContactModalProvider = ({ children }: { children: ReactNode }) => {
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  return (
    <ContactModalContext.Provider value={{ isContactModalOpen, setContactModalOpen }}>
      {children}
    </ContactModalContext.Provider>
  );
};

export const useContactModal = () => {
  const ctx = useContext(ContactModalContext);
  if (!ctx) return { isContactModalOpen: false, setContactModalOpen: () => {} };
  return ctx;
};
