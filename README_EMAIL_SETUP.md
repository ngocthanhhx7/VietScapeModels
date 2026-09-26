# Hướng Dẫn Tích Hợp Gửi Email Đơn Hàng Thật Về Gmail (VietScape Models — EXE101)

Tài liệu này hướng dẫn cách cấu hình hệ thống gửi email đơn hàng từ Landing Page VietScape Models trực tiếp về hộp thư Gmail của ban quản trị dự án thông qua nền tảng **EmailJS**.

---

## Mục Lục
1. [Tổng quan cơ chế hoạt động](#1-tổng-quan-cơ-chế-hoạt-động)
2. [Bước 1: Đăng ký tài khoản EmailJS](#bước-1-đăng-ký-tài-khoản-emailjs)
3. [Bước 2: Kết nối Hộp thư Gmail](#bước-2-kết-nối-hộp-thư-gmail)
   - [Cách A: Kết nối trực tiếp qua Google OAuth (Khuyên dùng)](#cách-a-kết-nối-trực-tiếp-qua-google-oauth-khuyên-dùng)
   - [Cách B: Kết nối qua Gmail SMTP & Mật Khẩu Ứng Dụng (App Password)](#cách-b-kết-nối-qua-gmail-smtp--mật-khẩu-ứng-dụng-app-password)
4. [Bước 3: Tạo Mẫu Email (Email Template)](#bước-3-tạo-mẫu-email-email-template)
5. [Bước 4: Cấu hình biến môi trường trong file .env](#bước-4-cấu-hình-biến-môi-trường-trong-file-env)
6. [Bước 5: Kiểm tra và xác nhận hộp thư đến](#bước-5-kiểm-tra-và-xác-nhận-hộp-thư-đến)
7. [Chế độ giả lập (Simulation Mode) khi chưa có API Key](#chế-độ-giả-lập-simulation-mode-khi-chưa-có-api-key)

---

## 1. Tổng quan cơ chế hoạt động

Ứng dụng VietScape Models là ứng dụng React + Vite chạy trực tiếp trên trình duyệt (Client-side SPA). Khi khách hàng hoàn tất biểu mẫu đăng ký sở hữu Kit mô hình giấy 3D:
1. Trình duyệt đóng gói dữ liệu đơn hàng (Họ tên, SĐT, Email, Tác phẩm, Lựa chọn combo dụng cụ thủ công, Loại nhu cầu, Lời nhắn, Timestamp, Dự toán tiền).
2. Trình duyệt gửi yêu cầu an toàn đến cổng API EmailJS bằng `fetch()`.
3. EmailJS xác thực với máy chủ Gmail của bạn và gửi một email thông báo có định dạng HTML cao cấp vào Hộp thư đến (Inbox) của Admin.
4. (Tùy chọn) EmailJS tự động gửi email xác nhận đặt hàng thành công đến khách hàng.

---

## Bước 1: Đăng ký tài khoản EmailJS

1. Truy cập [https://www.emailjs.com/](https://www.emailjs.com/).
2. Nhấn nút **Sign Up Free** (Gói miễn phí cho phép gửi **200 email/tháng**, hoàn toàn đủ cho việc thử nghiệm, demo đồ án EXE101 và chạy chiến dịch khởi động).
3. Xác minh địa chỉ email đăng ký để kích hoạt tài khoản.

---

## Bước 2: Kết nối Hộp thư Gmail

Trên bảng điều khiển EmailJS, chọn tab **Email Services** ở thanh bên trái, sau đó nhấn **Add New Service**.

### Cách A: Kết nối trực tiếp qua Google OAuth (Khuyên dùng, Nhanh nhất)
1. Chọn biểu tượng **Gmail** trong danh sách dịch vụ.
2. Đặt tên Service (ví dụ: `VietScape Gmail Service`).
3. Ghi lại **Service ID** (ví dụ: `service_vietscape` hoặc `service_xxx`).
4. Nhấn **Connect Account**. Cửa sổ đăng nhập Google hiện lên, chọn tài khoản Gmail dự án VietScape Models của nhóm và cấp quyền gửi email.
5. Nhấn **Create Service**.

---

### Cách B: Kết nối qua Gmail SMTP & Mật Khẩu Ứng Dụng (App Password)
*Dành cho trường hợp muốn kết nối bảo mật SMTP chuẩn của Google:*

#### 1. Bật xác thực 2 bước (2-Step Verification) trên Gmail:
- Truy cập [Tài khoản Google](https://myaccount.google.com/).
- Vào mục **Bảo mật (Security)**.
- Đảm bảo **Xác minh 2 bước (2-Step Verification)** đang ở trạng thái **BẬT (ON)**.

#### 2. Tạo Mật khẩu ứng dụng 16 ký tự (App Password):
- Tại ô tìm kiếm trên cùng của trang Google Account, gõ chữ `Mật khẩu ứng dụng` (hoặc `App passwords`).
- Hoặc truy cập trực tiếp: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
- Đặt tên cho ứng dụng (ví dụ: `VietScape Landing Page`).
- Nhấn **Tạo (Create)**.
- Google sẽ cấp một mật khẩu gồm **16 ký tự chữ cái** (ví dụ: `abcd efgh ijkl mnop`).
- *Lưu ý*: Sao chép chuỗi 16 ký tự này (bỏ dấu cách). Đây là mật khẩu dùng riêng cho máy chủ gửi mail, **không chia sẻ công khai**.

#### 3. Cấu hình Custom SMTP trên EmailJS:
- Trong EmailJS > **Add New Service** > Chọn **Personal Service** > **Transactional** hoặc **Custom SMTP**.
- Điền các thông số:
  - **SMTP Server**: `smtp.gmail.com`
  - **Port**: `465` (SSL) hoặc `587` (TLS)
  - **User**: Địa chỉ Gmail của nhóm (ví dụ: `vietscapemodels@gmail.com`)
  - **Password**: Chuỗi 16 ký tự mật khẩu ứng dụng vừa tạo.
- Nhấn **Create Service** và ghi lại `Service ID`.

---

## Bước 3: Tạo Mẫu Email (Email Template)

1. Chọn tab **Email Templates** > Nhấn **Create New Template**.
2. Đặt tên mẫu: `Đơn Hàng VietScape Models`.
3. Ghi lại **Template ID** (ví dụ: `template_vietscape_order`).
4. Cấu hình các trường trong tab **Settings**:
   - **Subject**: `[VietScape Models Đơn Mới] {{ticket_id}} - {{customer_name}} ({{model_interest}})`
   - **To Email**: `{{admin_email}}` (hoặc điền thẳng `vietscapemodels@gmail.com`)
   - **From Name**: `VietScape System`
   - **Reply-To**: `{{customer_email}}`
5. Dán nội dung HTML sau vào khung soạn thảo **Content**:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFDF9; border: 1px solid #D8C7B5; border-radius: 12px; overflow: hidden;">
  <!-- Header Banner -->
  <div style="background-color: #1A1615; padding: 24px; text-align: center; border-bottom: 3px solid #C59B27;">
    <h1 style="color: #FBF8F2; margin: 0; font-size: 22px; letter-spacing: 1px;">VIETSCAPE MODELS</h1>
    <p style="color: #C59B27; margin: 6px 0 0 0; font-size: 13px; text-transform: uppercase;">Thông Báo Đơn Đặt Hàng & Liên Hệ Mới</p>
  </div>

  <!-- Body Content -->
  <div style="padding: 24px;">
    <div style="background: #F4ECE1; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; display: flex; justify-content: space-between;">
      <span style="font-size: 13px; color: #6E6259;">Mã đơn: <strong style="color: #C59B27;">{{ticket_id}}</strong></span>
      <span style="font-size: 13px; color: #6E6259;">Thời gian: <strong>{{submitted_at}}</strong></span>
    </div>

    <h3 style="color: #1A1615; border-bottom: 2px solid #EAE0D5; padding-bottom: 8px; margin-top: 0;">Thông Tin Khách Hàng</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
      <tr>
        <td style="padding: 8px 0; color: #6E6259; width: 35%;">Họ và tên:</td>
        <td style="padding: 8px 0; color: #1A1615; font-weight: bold;">{{customer_name}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6E6259;">Số điện thoại:</td>
        <td style="padding: 8px 0; color: #1A1615; font-weight: bold;"><a href="tel:{{customer_phone}}" style="color: #C59B27; text-decoration: none;">{{customer_phone}}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6E6259;">Địa chỉ Email:</td>
        <td style="padding: 8px 0; color: #1A1615;"><a href="mailto:{{customer_email}}" style="color: #1A1615;">{{customer_email}}</a></td>
      </tr>
    </table>

    <h3 style="color: #1A1615; border-bottom: 2px solid #EAE0D5; padding-bottom: 8px;">Chi Tiết Sản Phẩm & Nhu Cầu</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
      <tr>
        <td style="padding: 8px 0; color: #6E6259; width: 35%;">Bộ Kit quan tâm:</td>
        <td style="padding: 8px 0; color: #1A1615; font-weight: bold;">{{model_interest}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6E6259;">Combo Dụng Cụ:</td>
        <td style="padding: 8px 0; color: #C59B27; font-weight: bold;">{{include_tool_combo}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6E6259;">Phân loại nhu cầu:</td>
        <td style="padding: 8px 0; color: #1A1615;">{{inquiry_type}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6E6259;">Dự toán tổng tiền:</td>
        <td style="padding: 8px 0; color: #C59B27; font-size: 16px; font-weight: bold;">{{estimated_total_price}}</td>
      </tr>
    </table>

    <h3 style="color: #1A1615; border-bottom: 2px solid #EAE0D5; padding-bottom: 8px;">Lời Nhắn / Ghi Chú Giao Hàng</h3>
    <div style="background: #FFFFFF; border: 1px dashed #D8C7B5; padding: 14px; border-radius: 8px; font-style: italic; color: #3A322D; font-size: 14px; line-height: 1.5;">
      "{{message}}"
    </div>
  </div>

  <!-- Footer -->
  <div style="background: #F4ECE1; padding: 14px 24px; text-align: center; font-size: 12px; color: #6E6259; border-top: 1px solid #D8C7B5;">
    Hệ thống Tiếp Nhận Đơn Hàng Tự Động — Đồ án Khởi nghiệp EXE101 VietScape Models.
  </div>
</div>
```

6. Nhấn **Save** ở góc trên bên phải.

---

## Bước 4: Cấu hình biến môi trường trong file `.env`

1. Lấy **Public Key**:
   - Nhấp vào avatar tài khoản hoặc vào mục **Account** > **General**.
   - Sao chép khóa tại mục **Public Key**.
2. Mở thư mục dự án `VietScapeModels`, tạo file `.env` (sao chép từ `.env.example`):
3. Điền các giá trị thực tế:

```env
VITE_EMAILJS_SERVICE_ID=service_vietscape
VITE_EMAILJS_TEMPLATE_ID=template_vietscape_order
VITE_EMAILJS_PUBLIC_KEY=aBcD1234_xyzPublicKey
VITE_ADMIN_RECEIVER_EMAIL=vietscapemodels@gmail.com
```

4. Khởi động lại server phát triển để Vite tải biến môi trường mới:
```bash
npm run dev
```

---

## Bước 5: Kiểm tra và xác nhận hộp thư đến

1. Mở trình duyệt tại `http://localhost:5173/#contact`.
2. Điền thông tin vào form liên hệ:
   - Họ tên: `Nguyễn Văn A`
   - Số điện thoại: `0852 699 188`
   - Email: `your_test_email@gmail.com`
   - Chọn bộ kit: `Kit Chùa Một Cột (98.200 VNĐ)`
   - Tích chọn: `Kèm Combo Dụng Cụ Thủ Công Chuyên Dụng (+39.000 VNĐ)`
   - Nhập lời nhắn: `Tôi muốn đặt 2 bộ kit về địa chỉ Hà Nội.`
3. Nhấn **Gửi Yêu Cầu**.
4. Nút bấm sẽ hiển thị vòng tròn xoay loading ("Đang truyền dữ liệu đơn hàng..."), sau đó modal xác nhận sang trọng sẽ xuất hiện.
5. Mở hòm thư Gmail của Admin (`VITE_ADMIN_RECEIVER_EMAIL`), bạn sẽ thấy email đơn hàng mới với bảng chi tiết và màu sắc thương hiệu VietScape.

---

## Chế độ giả lập (Simulation Mode) khi chưa có API Key

Nếu bạn chưa đăng ký EmailJS hoặc đang chấm điểm / chạy thử nghiệm offline:
- Hệ thống sẽ **không báo lỗi**, không làm gãy giao diện.
- Trình duyệt tự động chuyển sang chế độ **Demo Simulation**.
- Toàn bộ đơn hàng được lưu an toàn trong `localStorage` của trình duyệt dưới khóa `vietscape_inquiries_db`.
- Bạn có thể mở Console Trình duyệt (F12 > Console) để xem log chi tiết đơn hàng vừa gửi.
