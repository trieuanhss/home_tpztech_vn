# TPZTech Studio Landing Page - Design Specification

## Overview
Xây dựng trang web Landing Page giới thiệu **Công ty TNHH TPZTech Studio** (TPZTech Studio Co., Ltd.) — đơn vị chuyên thiết kế, phát triển phần mềm và sản xuất trò chơi trực tuyến (game online).
Website được thiết kế theo phong cách **Apple Liquid Glass** sang trọng, hiện đại, đậm chất công nghệ và giải trí, hỗ trợ đầy đủ chế độ Sáng / Tối / Tự động (Light / Dark / Auto) và đa ngôn ngữ Anh - Việt (EN / VI).

Trang web sử dụng mã nguồn thuần **HTML5, CSS3, Vue 3 (CDN)**, sẵn sàng để host trực tiếp trên **GitHub Pages** không cần build step, toàn bộ dữ liệu cấu hình và nội dung được tách biệt hoàn toàn trong file `config.json`.

---

## 1. Yêu Cầu & Phạm Vi (Scope & Requirements)

### 1.1. Thông Tin Doanh Nghiệp Cốt Lõi
- **Tên công ty:** Công ty TNHH TPZTech Studio (TPZTech Studio Co., Ltd.)
- **Lĩnh vực hoạt động:** Thiết kế & phát triển phần mềm doanh nghiệp, giải pháp số hóa và sản xuất game online.
- **Trụ sở / Địa chỉ hiển thị:** Thành Phố Đồng Nai, Việt Nam (Dong Nai, Vietnam).
- **Kênh liên hệ:** Email, Hotline, Mạng xã hội (Facebook, YouTube, Discord/Telegram, GitHub).

### 1.2. Thẩm Mỹ & Phong Cách Thị Giác
- **Apple Liquid Glassmorphism:**
  - Lớp nền đa tầng với các khối cầu ánh sáng mờ ảo (ambient glow orbs / aurora effect).
  - Thẻ kính mờ ảo diệu (`backdrop-filter: blur(20px)`), viền kính phản xạ specular highlight `rgba(255, 255, 255, 0.15)` đến `rgba(255, 255, 255, 0.3)`.
  - Hiệu ứng đổ bóng nhiều tầng và ánh sáng khuếch tán.
  - Micro-interactions: Hiệu ứng 3D card tilt khi rê chuột, chuyển động mượt mà 60fps.
- **Theme System (3 chế độ):**
  - **Dark Mode:** Deep Space Obsidian (`#07090e`), ánh sáng neon xanh ngọc Cyan & tím điện Amethyst.
  - **Light Mode:** Pearlescent Liquid Ice (`#f8fafc`), kính trong suốt tinh khôi với bóng phản quang mềm và chữ đen tương phản cao.
  - **Auto Mode:** Tự động đồng bộ theo hệ điều hành (`prefers-color-scheme`).
- **Ngôn ngữ kép (Bilingual):**
  - Tiếng Việt (VI) và Tiếng Anh (EN).
  - Chuyển đổi tức thì không tải lại trang, lưu tùy chọn trong `localStorage`.

### 1.3. Cấu Trúc Các Phân Đoạn (Layout Sections)
Kế thừa cấu trúc chuẩn doanh nghiệp công nghệ & phát hành game (tham khảo từ cổng thông tin Tepaylink) và nâng tầm với ngôn ngữ thiết kế Apple:
1. **Thanh điều hướng nổi (Floating Glass Navbar):**
   - Logo thương hiệu TPZTech Studio (biểu tượng đa giác phát quang kính).
   - Menu điều hướng mượt: Trang chủ, Về chúng tôi, Năng lực & Dịch vụ, Game Sắp Ra Mắt, Hệ sinh thái, Liên hệ.
   - Nút chuyển đổi giao diện (Dark / Light / Auto) và chuyển đổi ngôn ngữ (VI / EN).
   - Nút hành động nổi "Hợp tác ngay / Get in Touch".
2. **Hero Section:**
   - Huy hiệu kính động: *Công Nghệ Tiên Phong • Khởi Nguồn Trải Nghiệm Game*.
   - Headline lớn chữ gradient phản quang ánh sáng.
   - Đoạn giới thiệu tổng quan về TPZTech Studio tại Đồng Nai, Việt Nam.
   - Dải **4 chỉ số tín nhiệm (Trust Metric Chips):** 100% Bản quyền tự chủ, Đa nền tảng PC/Mobile, Engine đồ họa tối tân, Đồng hành 24/7.
   - Nút kêu gọi hành động kép (Khám phá Game & Liên hệ hợp tác).
3. **Về TPZTech Studio (Tầm nhìn - Sứ mệnh - Triết lý cốt lõi):**
   - 3 khối thẻ kính lỏng đa tầng giới thiệu chi tiết định hướng phát triển từ Đồng Nai vươn tầm thế giới.
4. **Lĩnh Vực Hoạt Động (Core Capabilities):**
   - Sản xuất Game Online đa nền tảng.
   - Thiết kế & Lập trình Phần mềm tùy biến / Doanh nghiệp.
   - Thiết kế UI/UX & Mỹ thuật số phong cách kính hiện đại.
5. **Tâm Điểm: Danh Mục Game "Sắp Ra Mắt" (Upcoming Games Showcase):**
   - Bộ lọc thể loại: Tất cả, MMORPG / Nhập vai, PvP / Chiến thuật, Casual / Mobile.
   - Lưới thẻ game kính Liquid Glass với ảnh teaser cover, tag "Sắp ra mắt / Coming Soon" phát sáng, nhãn nền tảng (PC / iOS / Android / WebGL), thời gian dự kiến ra mắt và tóm tắt gameplay.
   - Modal chi tiết kính lỏng (Glass Modal Popup) khi click vào thẻ game: Hiển thị thêm thông tin cốt truyện, cấu hình / nền tảng, và form "Đăng ký nhận thông báo sớm (Pre-register)".
6. **Hệ Sinh Thái Công Nghệ & Đối Tác:**
   - Trưng bày các công nghệ chủ đạo (Unreal Engine 5, Unity, Vue.js, Cloud Native,...).
7. **Form Liên Hệ Kính Mờ & Chân Trang Doanh Nghiệp (Footer):**
   - Form gửi liên hệ / hợp tác trực tiếp.
   - Thông tin pháp nhân đầy đủ: **Công ty TNHH TPZTech Studio**, Địa chỉ: **Thành Phố Đồng Nai, Việt Nam**, Hotline, Email.
   - Bản quyền và liên kết mạng xã hội.

---

## 2. Kiến Trúc Dữ Liệu `config.json`
Toàn bộ nội dung hiển thị trên trang được cấu hình song ngữ trong `config.json`:
- `company`: Tên công ty, địa chỉ, email, hotline, mạng xã hội.
- `navigation`: Danh sách mục menu cho cả 2 ngôn ngữ.
- `hero`: Slogan, mô tả, nút CTA, thông số metrics.
- `about`: Tầm nhìn, sứ mệnh, triết lý thương hiệu.
- `services`: Danh sách dịch vụ phần mềm và game.
- `upcomingGames`: Mảng chứa các đối tượng game (id, title, category, tags, platforms, status, badgeText, releaseDate, shortDesc, fullDesc, bannerUrl, features).
- `techStack`: Danh sách công nghệ đối tác.
- `contact`: Tiêu đề, hướng dẫn liên hệ, nhãn form.

---

## 3. Kiến Trúc Kỹ Thuật (Architecture)
- `index.html`: Cấu trúc HTML semantic, nạp Google Fonts (Plus Jakarta Sans / Outfit / Inter), Font Awesome / Lucide Icons SVG, Vue 3 qua CDN `unpkg.com/vue@3/dist/vue.global.prod.js`.
- `style.css`: Hệ thống CSS Variables cho Dark / Light mode, hiệu ứng Apple Liquid Glass (`backdrop-filter`, `radial-gradient`, `box-shadow`, `border-radius`, responsive mobile/tablet/desktop).
- `app.js`: Khởi tạo Vue 3 app, `fetch('config.json')`, quản lý state: `currentLang` ('vi' | 'en'), `currentTheme` ('dark' | 'light' | 'auto'), `activeFilter` ('all' | ...), `selectedGameModal` (null | game object), toast thông báo.
- `config.json`: File dữ liệu trung tâm.
- `assets/`: Thư mục chứa hình ảnh teaser game, logo, favicon.
