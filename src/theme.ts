import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          100: { value: '#f7fafc' },
          900: { value: '#1a202c' },
        },
      },
      fonts: {
        heading: { value: `'Pretendard', sans-serif` },
        body: { value: `'Pretendard', sans-serif` },
      },
    },
  },
});
