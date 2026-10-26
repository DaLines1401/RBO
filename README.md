# ⚔️ Ragnarok Battle Offline (RBO EX 1-3) — Web Port

[![Cloudflare Pages](https://img.shields.io/badge/Live_Game-rbo--web--wta.pages.dev-orange?logo=cloudflare)](https://rbo-web-wta.pages.dev)
[![GitHub](https://img.shields.io/badge/GitHub-DaLines1401%2FRBO-black?logo=github)](https://github.com/DaLines1401/RBO)
[![Engine](https://img.shields.io/badge/Engine-HTML5_Canvas_60FPS-blue)]()
[![Multiplayer](https://img.shields.io/badge/Multiplayer-WebRTC_P2P-green)]()

พอร์ตตัวเกม **Ragnarok Battle Offline (RBO EX 1-3)** จากค่าย **French-Bread (Watanabe Seisakujo)** ให้สามารถเล่นบนเว็บเบราว์เซอร์ได้ทันทีแบบ 60 FPS ทั้งบน Desktop และมือถือ พร้อมระบบ **Multiplayer (Local 2P Co-op และ Online P2P Room)**

🔗 **เล่นเกมจริงได้ทันทีที่นี่:** **[https://rbo-web-wta.pages.dev](https://rbo-web-wta.pages.dev)**

---

## 🎮 ฟีเจอร์หลัก (Key Features)

- **Authentic Beat 'em Up Combat:** คอมโบต่อเนื่อง 3 จังหวะ (Light, Mid, Heavy), ท่าเสยลอยกลางอากาศ (Air Juggle), ระบบ Hitstop และ Screen Shake
- **Multiplayer Mode:**
  - **1P Solo:** ลุยเดี่ยวในด่าน Prontera Field
  - **2P Local Co-op:** เล่น 2 คนบนจอเดียวกัน แบ่งคีย์บอร์ดซ้าย-ขวา หรือต่อจอยเกม 2 ตัว
  - **Online Multiplayer (WebRTC P2P):** สร้างห้องแล้วส่งรหัสหรือแชร์ลิงก์ให้เพื่อนกดเข้าได้ทันที ความหน่วงต่ำ (<20ms)
- **Co-op Team Mechanics:** ปิด Friendly Fire และมีระบบชุบชีวิตเพื่อนเมื่อจบ Wave หรือให้ Acolyte ชุบด้วยสกิล
- **Optimized Lossless Assets:** สกัด Texture และ BGM จากไฟล์ `.PAC` ของแท้ แปลงเป็น Lossless PNG โปร่งใส ทำให้ขนาดเกมเหลือเพียง **~10 MB** โหลดเข้าเกมได้ใน 1 วินาที
- **In-browser Asset Studio:** ระบบ PAC Explorer สำหรับค้นหา ดูตัวอย่าง และดึงไฟล์ภาพ/เสียงจากไฟล์ `.PAC` กว่า 2.5 GB

---

## 🕹️ การควบคุม (Controls)

### Player 1 (ฟ้า)
- **เคลื่อนที่:** <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> (กด A หรือ D เบิ้ล 2 ครั้งเพื่อพุ่ง Dash)
- **กระโดด:** <kbd>L</kbd> หรือ <kbd>Space</kbd>
- **โจมตีเบา:** <kbd>J</kbd>
- **โจมตีกลาง:** <kbd>K</kbd>
- **โจมตีหนัก:** <kbd>I</kbd>
- **สกิล 1 (Bash / Holy Light):** <kbd>Space</kbd>
- **สกิล 2 (Magnum Break / Heal):** <kbd>U</kbd>

### Player 2 (แดง)
- **เคลื่อนที่:** <kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd>
- **กระโดด:** <kbd>Num 3</kbd> หรือ <kbd>V</kbd>
- **โจมตีเบา:** <kbd>Num 1</kbd> หรือ <kbd>Z</kbd>
- **โจมตีกลาง:** <kbd>Num 2</kbd> หรือ <kbd>X</kbd>
- **โจมตีหนัก:** <kbd>Num 5</kbd> หรือ <kbd>C</kbd>
- **สกิล 1:** <kbd>Num 0</kbd> หรือ <kbd>B</kbd>
- **สกิล 2:** <kbd>Num Enter</kbd>

---

## 🚀 วิธีเปิดเล่นแบบ Local

ดับเบิลคลิกที่ไฟล์ **`start_web.bat`** หรือรันคำสั่ง:
```bash
cd web
node server.js
```
เปิดเบราว์เซอร์ไปที่: `http://localhost:3000/`

---

## ☁️ วิธี Deploy ขึ้น Cloudflare Pages

### วิธีที่ 1: Deploy ตรงด้วยสคริปต์คลิกเดียว
ดับเบิลคลิกที่ไฟล์ **`deploy_cloudflare.bat`**

### วิธีที่ 2: เชื่อมผ่าน GitHub (Continuous Deployment)
ทุกครั้งที่ `git push origin main` โค้ดจะถูกอัปเดตขึ้น [GitHub Repository](https://github.com/DaLines1401/RBO) โดยอัตโนมัติ
