# TPZTech Studio - Landing Page

Trang Landing Page chính thức của **Công ty TNHH TPZTech Studio** (TPZTech Studio Co., Ltd.) — công ty chuyên thiết kế, phát triển phần mềm và sản xuất game online tại Thành Phố Đồng Nai, Việt Nam.

Website được xây dựng theo ngôn ngữ thiết kế **Apple Liquid Glass** sang trọng, hiện đại, tối ưu 100% cho việc deploy tĩnh lên **GitHub Pages** (không cần Node build step).

---

## 🌟 Tính Năng Nổi Bật

1. **Phong cách Apple Liquid Glass:**
   - Kính mờ siêu thực (`backdrop-filter: blur(20px)`), viền phản xạ ánh sáng specular highlight.
   - Các quả cầu ánh sáng nền chuyển động êm dịu (dynamic glowing ambient orbs).
   - Micro-animations mượt mà chuẩn 60fps khi tương tác và hover.

2. **Chế độ Giao diện 3 tùy chọn (Theme Switcher):**
   - 🌙 **Tối (Dark Mode):** Nền không gian sâu Obsidian, ánh sáng neon xanh ngọc & tím laser.
   - ☀️ **Sáng (Light Mode):** Kính băng trong suốt, tương phản sắc nét, thanh lịch.
   - ⚡ **Tự động (Auto Mode):** Tự động đồng bộ theo cài đặt hệ điều hành người dùng (`prefers-color-scheme`).
   - Tích hợp script chống giật sáng (Anti-FOUC) ngay trong `<head>`.

3. **Hỗ trợ Đa ngôn ngữ (Bilingual EN / VI):**
   - Chuyển đổi tức thì giữa **Tiếng Việt (VI)** và **Tiếng Anh (EN)**.
   - Toàn bộ nội dung song ngữ được quản lý tập trung trong file `config.json`.
   - Ghi nhớ tùy chọn của người dùng trong `localStorage`.

4. **Danh mục Game "Sắp ra mắt" linh hoạt:**
   - Bộ lọc theo thể loại (Tất cả, Nhập vai RPG, Chiến thuật RTS, Mobile Games).
   - Huy hiệu **"Sắp ra mắt / Coming Soon"** với hiệu ứng đèn xung nhịp (pulse animation).
   - Modal kính Liquid Glass xem chi tiết cốt truyện, nền tảng hỗ trợ và form đăng ký thử nghiệm sớm (Pre-registration).

5. **Cấu hình độc lập qua `config.json`:**
   - Bạn có thể thêm, sửa, xóa game hoặc đổi thông tin công ty, địa chỉ, hotline, slogan... mà **không cần chỉnh sửa mã HTML**.

---

## 📂 Cấu Trúc Thư Mục

```text
tpx-landing/
├── index.html            # Giao diện HTML semantic chính
├── style.css             # Hệ thống CSS Apple Liquid Glass & Tokens (Dark/Light)
├── app.js                # Logic Vue 3 (CDN), nạp config.json, quản lý theme & ngôn ngữ
├── config.json           # Dữ liệu nội dung song ngữ & danh sách game
├── assets/               # Thư mục hình ảnh & logo vector SVG
│   ├── logo.svg
│   ├── game-chrono-blade.svg
│   ├── game-cyber-vanguard.svg
│   ├── game-sky-realms.svg
│   └── game-shadow-dominion.svg
└── tests/                # Bộ test tự động kiểm tra JSON, CSS, logic và E2E
```

---

## 🚀 Hướng Dẫn Sử Dụng & Triển Khai

### 1. Chạy thử nghiệm trên máy cục bộ (Local)
Vì trình duyệt có chính sách bảo mật CORS chặn `fetch('config.json')` khi mở trực tiếp file bằng đường dẫn `file://`, bạn nên chạy qua một web server tĩnh đơn giản:

- Sử dụng Node.js (có sẵn script trong dự án):
  ```bash
  node tests/serve.js
  ```
  Sau đó mở trình duyệt tại: `http://localhost:8088`

- Hoặc sử dụng extension **Live Server** trong VS Code (chỉ cần click chuột phải vào `index.html` chọn *Open with Live Server*).

- Hoặc Python:
  ```bash
  python -m http.server 8080
  ```

### 2. Triển khai lên GitHub Pages (Miễn phí & Cực nhanh)
1. Đẩy mã nguồn lên repository GitHub của bạn:
   ```bash
   git add .
   git commit -m "feat: complete TPZTech Studio landing page"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git
   git push -u origin main
   ```
2. Trên GitHub, vào mục **Settings** của repository -> chọn thẻ **Pages** ở menu bên trái.
3. Tại phần **Build and deployment** -> **Source**: Chọn `Deploy from a branch`.
4. Tại phần **Branch**: Chọn nhánh `main` (hoặc `master`), thư mục `/ (root)` và bấm **Save**.
5. Sau 1-2 phút, website của bạn sẽ hoạt động trực tiếp tại địa chỉ: `https://<tai-khoan-cua-ban>.github.io/<ten-repo>/`

---

## ⚙️ Hướng Dẫn Thêm Game Mới Vào `config.json`

Mở file `config.json`, tìm đến mảng `"upcomingGames"`, thêm một đối tượng game mới:

```json
{
  "id": "ten-game-moi",
  "category": "rpg",
  "title": {
    "vi": "Tên Game Tiếng Việt",
    "en": "Game Title in English"
  },
  "genre": {
    "vi": "Thể Loại Game",
    "en": "Game Genre"
  },
  "statusBadge": "in_development",
  "badgeText": {
    "vi": "Sắp ra mắt • Beta",
    "en": "Coming Soon • Beta"
  },
  "platforms": ["PC", "Mobile"],
  "expectedRelease": {
    "vi": "Dự kiến: Quý 1 / 2027",
    "en": "Estimated: Q1 2027"
  },
  "coverImage": "assets/game-chrono-blade.svg",
  "shortDesc": {
    "vi": "Mô tả ngắn hiển thị trên thẻ card ngoài trang chủ...",
    "en": "Short description shown on the home card..."
  },
  "fullDesc": {
    "vi": "Mô tả chi tiết cốt truyện, lối chơi hiển thị khi bấm vào xem chi tiết...",
    "en": "Full storyline and gameplay description shown in modal..."
  },
  "features": [
    { "vi": "Tính năng nổi bật 1", "en": "Key highlight 1" },
    { "vi": "Tính năng nổi bật 2", "en": "Key highlight 2" }
  ]
}
```
Lưu file lại là giao diện sẽ tự động cập nhật ngay lập tức!
