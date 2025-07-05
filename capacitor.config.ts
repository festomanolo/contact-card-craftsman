
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d877013929724be9bccb5072fb1a4340',
  appName: 'contact-card-craftsman',
  webDir: 'dist',
  server: {
    url: 'https://d8770139-2972-4be9-bccb-5072fb1a4340.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
