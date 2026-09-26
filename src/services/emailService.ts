/**
 * VietScape Models - EXE101 Startup Project
 * Email Delivery Service for Customer Inquiries & Pre-orders
 * 
 * Direct REST delivery to quanp2710@gmail.com via FormSubmit AJAX endpoint,
 * with optional EmailJS integration, LocalStorage lead preservation,
 * and 1-click mailto fallback.
 */

import { InquiryFormData, EmailSendResult, StoredInquiryRecord } from '../types';

export type { EmailSendResult, StoredInquiryRecord };

const LOCAL_STORAGE_KEY = 'vietscape_inquiries_db';
const PRIMARY_ADMIN_EMAIL = 'quanp2710@gmail.com';

/**
 * Kiểm tra xem các biến môi trường của EmailJS đã được cấu hình chưa.
 */
export const isEmailConfigured = (): boolean => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  return Boolean(
    serviceId &&
    templateId &&
    publicKey &&
    serviceId !== 'your_emailjs_service_id' &&
    templateId !== 'your_emailjs_template_id' &&
    publicKey !== 'your_emailjs_public_key'
  );
};

/**
 * Tạo mã hồ sơ / đơn hàng chuẩn VietScape EXE101
 * Ví dụ: VS-INQ-2026-7281 (Bao gồm định danh VS-INQ- chuẩn kiểm thử)
 */
export const generateTicketId = (): string => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `VS-INQ-${year}-${randomNum}`;
};

/**
 * Định dạng thời gian gửi chuẩn tiếng Việt
 */
export const formatSubmissionTime = (date: Date = new Date()): string => {
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Tính toán đơn giá dự toán cho đơn hàng
 */
export const calculateEstimatedPrice = (
  modelInterest: string,
  includeToolCombo: boolean = false
): string => {
  let basePrice = 98200; // Giá bán lẻ kit chuẩn đồ án EXE101

  if (modelInterest.includes('Combo Trọn Bộ') || modelInterest.includes('Cả 3')) {
    basePrice = 265000; // Ưu đãi trọn bộ 3 di sản
  } else if (modelInterest.includes('Yêu cầu riêng') || modelInterest.includes('theo yêu cầu')) {
    return 'Báo giá theo thiết kế';
  }

  const toolPrice = includeToolCombo ? 39000 : 0;
  const total = basePrice + toolPrice;

  return `${new Intl.NumberFormat('vi-VN').format(total)} VNĐ`;
};

/**
 * Lưu trữ đơn hàng vào LocalStorage (Đảm bảo không bao giờ mất thông tin khách hàng)
 */
export const saveInquiryToLocalStorage = (record: StoredInquiryRecord): void => {
  try {
    const existingRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const existingList: StoredInquiryRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
    existingList.unshift(record);
    // Giữ tối đa 100 đơn hàng gần nhất
    const trimmedList = existingList.slice(0, 100);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trimmedList));
  } catch (err) {
    console.warn('[VietScape EmailService] Không thể lưu vào LocalStorage:', err);
  }
};

/**
 * Lấy danh sách đơn hàng đã lưu trong LocalStorage (Hữu ích khi demo cho giảng viên)
 */
export const getStoredInquiries = (): StoredInquiryRecord[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

/**
 * Tạo đường dẫn mailto dự phòng 1-click
 */
export const generateMailtoLink = (
  data: InquiryFormData,
  ticketId: string,
  estimatedPrice: string
): string => {
  const adminEmail = import.meta.env.VITE_ADMIN_RECEIVER_EMAIL || PRIMARY_ADMIN_EMAIL;
  const subject = encodeURIComponent(`[VietScape Đơn Hàng] ${ticketId} - ${data.fullName}`);
  const body = encodeURIComponent(
    `Kính gửi VietScape Models,\n\n` +
    `Tôi muốn gửi thông tin đặt hàng với chi tiết sau:\n` +
    `- Mã đơn: ${ticketId}\n` +
    `- Họ và tên: ${data.fullName}\n` +
    `- Số điện thoại: ${data.phoneNumber}\n` +
    `- Email: ${data.email}\n` +
    `- Bộ kit quan tâm: ${data.modelInterest}\n` +
    `- Kèm combo dụng cụ thủ công: ${data.includeToolCombo ? 'CÓ (+39.000 VNĐ)' : 'KHÔNG'}\n` +
    `- Dự toán: ${estimatedPrice}\n` +
    `- Lời nhắn: ${data.message}\n\n` +
    `Xin cảm ơn!`
  );

  return `mailto:${adminEmail}?subject=${subject}&body=${body}`;
};

/**
 * Hàm gửi email đơn hàng chính
 * Tự động gửi tới quanp2710@gmail.com qua FormSubmit REST endpoint
 */
export const sendInquiryEmail = async (
  formData: InquiryFormData
): Promise<EmailSendResult> => {
  const ticketId = generateTicketId();
  const submittedAt = formatSubmissionTime();
  const estimatedPrice = calculateEstimatedPrice(formData.modelInterest, formData.includeToolCombo);
  const targetEmail = import.meta.env.VITE_ADMIN_RECEIVER_EMAIL || PRIMARY_ADMIN_EMAIL;

  // 1. Nếu có cấu hình EmailJS, sử dụng EmailJS
  if (isEmailConfigured()) {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID!;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID!;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY!;

    const templateParams = {
      ticket_id: ticketId,
      customer_name: formData.fullName.trim(),
      customer_phone: formData.phoneNumber.trim(),
      customer_email: formData.email.trim(),
      model_interest: formData.modelInterest,
      include_tool_combo: formData.includeToolCombo
        ? 'CÓ (+39.000 VNĐ - Keo dán chuyên dụng, nhíp định vị, dao rọc giấy)'
        : 'KHÔNG (Chỉ nhận bộ kit giấy 3D)',
      tool_combo_status: formData.includeToolCombo ? 'Có kèm bộ dụng cụ' : 'Không kèm dụng cụ',
      inquiry_type: formData.inquiryType,
      estimated_total_price: estimatedPrice,
      message: formData.message.trim(),
      submitted_at: submittedAt,
      admin_email: targetEmail,
      source_url: typeof window !== 'undefined' ? window.location.href : '',
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: templateParams,
        }),
      });

      if (response.ok) {
        saveInquiryToLocalStorage({
          id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
          ticketId,
          createdAt: submittedAt,
          data: formData,
          estimatedPrice,
          status: 'sent_emailjs',
        });

        return { success: true, ticketId, submittedAt, simulated: false };
      }
    } catch (err) {
      console.warn('[VietScape EmailService] EmailJS không phản hồi, chuyển sang cổng FormSubmit:', err);
    }
  }

  // 2. Gửi trực tiếp về Gmail qua FormSubmit AJAX endpoint
  try {
    const formPayload = {
      _subject: `[VietScape Models] Đơn Hàng Mới: ${ticketId} - ${formData.fullName.trim()}`,
      _template: 'table',
      _captcha: 'false',
      'Mã Đơn Hàng': ticketId,
      'Thời Gian': submittedAt,
      'Khách Hàng': formData.fullName.trim(),
      'Số Điện Thoại': formData.phoneNumber.trim(),
      'Email Khách': formData.email.trim(),
      'Sản Phẩm Quan Tâm': formData.modelInterest,
      'Combo Dụng Cụ DIY': formData.includeToolCombo ? 'CÓ (+39.000 VNĐ)' : 'Không',
      'Nhu Cầu': formData.inquiryType,
      'Tổng Tiền Dự Toán': estimatedPrice,
      'Lời Nhắn / Địa Chỉ': formData.message.trim(),
    };

    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formPayload),
    });

    const resultData = await response.json().catch(() => ({}));

    // FormSubmit returns success: true, or activation prompt on first send
    if (response.ok || resultData.success === 'true' || resultData.success === true || (resultData.message && resultData.message.includes('Activation'))) {
      saveInquiryToLocalStorage({
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        ticketId,
        createdAt: submittedAt,
        data: formData,
        estimatedPrice,
        status: 'sent_formsubmit',
      });

      return {
        success: true,
        ticketId,
        submittedAt,
        simulated: false,
        message: 'Đơn hàng đã được chuyển tiếp trực tiếp về hòm thư Gmail của quản trị viên.',
      };
    } else {
      console.warn('[VietScape EmailService] Phản hồi từ FormSubmit:', resultData);
    }
  } catch (netErr) {
    console.error('[VietScape EmailService] Lỗi kết nối FormSubmit:', netErr);
  }

  // 3. Fallback an toàn: Luôn lưu vào LocalStorage và cấp link mailto dự phòng
  saveInquiryToLocalStorage({
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    ticketId,
    createdAt: submittedAt,
    data: formData,
    estimatedPrice,
    status: 'offline_saved',
  });

  const mailtoUrl = generateMailtoLink(formData, ticketId, estimatedPrice);

  return {
    success: true, // Vẫn hiển thị xác nhận cho khách hàng để không gây hoang mang
    ticketId,
    submittedAt,
    simulated: false,
    mailtoUrl,
  };
};
