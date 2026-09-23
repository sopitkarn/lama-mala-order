# ล่าหมา หมาล่า

ระบบสั่งอาหารร้านหมาล่า — Next.js (App Router, JavaScript) + Supabase, deploy บน Vercel

## รันในเครื่อง

```bash
npm install
cp .env.example .env.local   # แล้วใส่ค่าจริงจาก Supabase → Project Settings → API
npm run dev
```

เปิด http://localhost:3000

## Deploy บน Vercel

1. push โค้ดขึ้น GitHub แล้ว Import โปรเจกต์ใน Vercel
2. ตั้ง Environment Variables ใน Vercel (Project Settings → Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy — Vercel จะรัน `npm run build` ให้อัตโนมัติ

รายละเอียดโครงสร้างฐานข้อมูลและกติกาของโปรเจกต์ดูที่ [CLAUDE.md](./CLAUDE.md)
