import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// "base" ayarını repo adına göre güncelleyin. Örnek: /REPO_ADI/
export default defineConfig({
  plugins: [react()],
})
