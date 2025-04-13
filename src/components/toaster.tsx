import { createContext, useState, useContext, ReactNode } from 'react';

// ✅ toast 메시지 타입 정의
interface ToastMessage {
  title: string;
  description: string;
  type: 'info' | 'success' | 'warning' | 'error';
  action: { label: string | null; onClick: any };
}

// ✅ ToasterContext 타입 정의
interface ToasterContextType {
  toastInfo: ToastMessage | null; // `null`일 경우 표시하지 않음
  setToastInfo: (toast: ToastMessage) => void;
}

// ✅ `createContext` 초기값 설정
const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const [toastInfo, setToastInfo] = useState<ToastMessage | null>(null);

  return <ToasterContext.Provider value={{ toastInfo, setToastInfo }}>{children}</ToasterContext.Provider>;
};

// `useToaster` 훅 생성
export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};
