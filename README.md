# INSTALASI

clone repositori github

```bash
git clone https://github.com/khoirxz/duitkas-tw.git
```

# GANTI KONFIGURASI JIKA MENGGUNAKAN SUBDOMAIN

dalam file `vite.config.ts` ganti baris berikut jika menggunakan subdomain
jika tidak maka hapus baris kode `base`.

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/duitkas/", // <-- ganti nama subdirektori https://example.com/myapp/ -> '/myapp/'
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // rest of your config
});
```

# BUILD

```bash
npm run build
```

# DEPLOY

didalam folder dist, berisi file yang siap untuk di deploy ke server seperti `nginx` atau `apache`.
