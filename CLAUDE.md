# ล่าหมา หมาล่า — ระบบสั่งอาหาร

ระบบสั่งอาหารสำหรับร้านหมาล่า "ล่าหมา หมาล่า"
Stack: Next.js (App Router, **JavaScript ไม่ใช่ TypeScript**) + Supabase, deploy บน Vercel

## กติกาของโปรเจกต์

- เขียนเป็น JavaScript (`.js`) เท่านั้น ห้ามสร้างไฟล์ `.ts` / `.tsx`
- ใช้ App Router (โฟลเดอร์ `app/`) ไม่ใช้ Pages Router
- เรียก Supabase ผ่าน `lib/supabaseClient.js` เท่านั้น (`import { supabase } from '../lib/supabaseClient'`)
- Environment variables (ตั้งใน `.env.local` และ Vercel):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ห้าม commit `.env.local` และ `node_modules`

## ⚠️ Next.js เวอร์ชันล่าสุด: `params` ของ Dynamic Route เป็น Promise

โปรเจกต์นี้ใช้ Next.js เวอร์ชันล่าสุด (16.x) ซึ่ง `params` (และ `searchParams`) ของ Dynamic Route
เป็น **Promise** ไม่ใช่ object ธรรมดา ห้ามอ่านค่าตรง ๆ เช่น `params.table` — ต้อง unwrap ก่อนเสมอ

**Client Component** (`'use client'`) — unwrap ด้วย `use()` จาก React:

```js
'use client';

import { use } from 'react';

export default function OrderPage({ params }) {
  const { session_id } = use(params); // ✅ ถูกต้อง
  // const { session_id } = params;   // ❌ ผิด: params เป็น Promise
  return <div>Session: {session_id}</div>;
}
```

**Server Component** (ไม่มี `'use client'`) — ใช้ `async` + `await params` (ทำหน้าที่เหมือน `use()`):

```js
export default async function Page({ params }) {
  const { session_id } = await params;
  return <div>Session: {session_id}</div>;
}
```

หน้าสั่งอาหารในขั้นตอนถัดไปจะเป็น Dynamic Route (เช่น `app/order/[session_id]/page.js`)
ให้ยึดรูปแบบข้างบนทุกครั้ง

## โครงสร้างฐานข้อมูล Supabase (มีอยู่แล้ว — ไม่ต้องสร้างใหม่)

ใช้อ้างอิงชื่อตารางและคอลัมน์ให้ตรงทุกครั้ง ห้ามเดาชื่อคอลัมน์เพิ่มเอง

### `sessions`
| คอลัมน์ | หมายเหตุ |
|---|---|
| `id` | |
| `table_number` | หมายเลขโต๊ะ |
| `adult_count` | จำนวนผู้ใหญ่ |
| `child_count` | จำนวนเด็ก |
| `status` | สถานะของ session |
| `created_at` | |

### `menu_categories`
| คอลัมน์ | หมายเหตุ |
|---|---|
| `id` | |
| `name` | ชื่อหมวดหมู่ |
| `sort_order` | ลำดับการแสดงผล |

### `menu_items`
| คอลัมน์ | หมายเหตุ |
|---|---|
| `id` | |
| `category_id` | อ้างถึง `menu_categories.id` |
| `name` | ชื่อเมนู |

### `orders`
| คอลัมน์ | หมายเหตุ |
|---|---|
| `id` | |
| `session_id` | อ้างถึง `sessions.id` |
| `table_number` | |
| `items` | **jsonb** — รายการอาหารที่สั่ง |
| `status` | สถานะของออเดอร์ |
| `created_at` | |

ข้อควรระวัง:
- ยังไม่ได้กำหนดค่าที่เป็นไปได้ของ `status` ทั้งใน `sessions` และ `orders` — ถามผู้ใช้ก่อนใช้ค่าเฉพาะ
- ยังไม่ได้กำหนดรูปแบบข้อมูลภายใน `orders.items` (jsonb) — ตกลงกับผู้ใช้ก่อนเขียนโค้ดที่อ่านหรือเขียนฟิลด์นี้

## หน้าที่มีอยู่และที่จะสร้างต่อ

- `/` — หน้าแรก (ใช้ทดสอบ deploy) ✅
- `/generate-qr` — สร้าง QR Code สำหรับแต่ละโต๊ะ (ยังไม่ได้สร้าง)
- `/kitchen` — หน้าจอครัวดูออเดอร์ (ยังไม่ได้สร้าง)
- หน้าสั่งอาหารของลูกค้า (Dynamic Route — ขั้นตอนถัดไป)
