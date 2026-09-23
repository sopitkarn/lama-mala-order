import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="home">
      <header>
        <h1>ล่าหมา หมาล่า</h1>
        <p>ระบบสั่งอาหารประจำโต๊ะ</p>
      </header>

      <nav aria-label="เมนูหลัก">
        <Link href="/generate-qr">
          สร้าง QR Code โต๊ะ
          <small>/generate-qr</small>
        </Link>
        <Link href="/kitchen">
          หน้าจอครัว
          <small>/kitchen</small>
        </Link>
      </nav>

      <p className="note">หน้านี้ใช้ทดสอบว่า deploy สำเร็จ</p>
    </main>
  );
}
