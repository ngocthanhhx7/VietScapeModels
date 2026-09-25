import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  FileCheck2,
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { DongSonDrumMotif, LyLotusMotif } from '../common/HeritageMotifs';
import { InquiryFormData, InquiryFormErrors } from '../../types';

interface InquirySectionProps {
  initialModelInterest?: string;
}

const INQUIRY_TYPES = [
  { id: 'preorder', label: 'Đặt trước mô hình (Pre-order)', shortLabel: 'Đặt trước' },
  { id: 'corporate_gift', label: 'Quà tặng ngoại giao / doanh nghiệp', shortLabel: 'Quà ngoại giao' },
  { id: 'custom_commission', label: 'Đặt đúc theo đồ án riêng (Bespoke)', shortLabel: 'Đồ án riêng' },
  { id: 'partnership', label: 'Hợp tác giám định & phân phối', shortLabel: 'Hợp tác' },
] as const;

export const InquirySection: React.FC<InquirySectionProps> = ({
  initialModelInterest = 'Chùa Một Cột',
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    modelInterest: initialModelInterest,
    inquiryType: 'preorder',
    message: '',
  });

  // Keep modelInterest synchronized if initialModelInterest changes from outside
  useEffect(() => {
    if (initialModelInterest) {
      setFormData((prev) => ({ ...prev, modelInterest: initialModelInterest }));
    }
  }, [initialModelInterest]);

  const [errors, setErrors] = useState<InquiryFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalData, setSuccessModalData] = useState<{
    ticketId: string;
    submittedAt: string;
    fullName: string;
    modelInterest: string;
    inquiryTypeLabel: string;
  } | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && successModalData) {
        setSuccessModalData(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [successModalData]);

  const validateField = (field: keyof InquiryFormData, value: string): string | undefined => {
    switch (field) {
      case 'fullName':
        if (!value.trim()) return 'Vui lòng nhập họ và tên của bạn.';
        if (value.trim().length < 2) return 'Họ tên phải có ít nhất 2 ký tự.';
        return undefined;
      case 'phoneNumber': {
        const cleanedPhone = value.replace(/\s+/g, '');
        const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
        if (!cleanedPhone) return 'Vui lòng nhập số điện thoại liên hệ.';
        if (!phoneRegex.test(cleanedPhone)) {
          return 'Số điện thoại không hợp lệ (Ví dụ: 0988 888 888 hoặc +84988888888).';
        }
        return undefined;
      }
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return 'Vui lòng nhập địa chỉ email.';
        if (!emailRegex.test(value.trim())) return 'Địa chỉ email không đúng định dạng (Ví dụ: name@domain.com).';
        return undefined;
      }
      case 'modelInterest':
        if (!value.trim()) return 'Vui lòng lựa chọn tác phẩm kiến trúc quan tâm.';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Vui lòng chia sẻ nội dung yêu cầu hoặc câu hỏi của bạn.';
        if (value.trim().length < 10) return 'Lời nhắn cần ít nhất 10 ký tự để chúng tôi hỗ trợ tốt nhất.';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (field: keyof InquiryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for field if valid
    if (errors[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const validateAll = (): boolean => {
    const newErrors: InquiryFormErrors = {};
    const nameErr = validateField('fullName', formData.fullName);
    if (nameErr) newErrors.fullName = nameErr;

    const phoneErr = validateField('phoneNumber', formData.phoneNumber);
    if (phoneErr) newErrors.phoneNumber = phoneErr;

    const emailErr = validateField('email', formData.email);
    if (emailErr) newErrors.email = emailErr;

    const modelErr = validateField('modelInterest', formData.modelInterest);
    if (modelErr) newErrors.modelInterest = modelErr;

    const msgErr = validateField('message', formData.message);
    if (msgErr) newErrors.message = msgErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsSubmitting(true);

    // Simulate authentic server transmission & record creation
    setTimeout(() => {
      setIsSubmitting(false);
      const randomTicketNum = Math.floor(1000 + Math.random() * 9000);
      const typeLabel =
        INQUIRY_TYPES.find((t) => t.id === formData.inquiryType)?.label || 'Đặt trước mô hình';

      setSuccessModalData({
        ticketId: `VS-INQ-${new Date().getFullYear()}-${randomTicketNum}`,
        submittedAt: new Date().toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        fullName: formData.fullName.trim(),
        modelInterest: formData.modelInterest,
        inquiryTypeLabel: typeLabel,
      });

      // Reset form
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        modelInterest: 'Chùa Một Cột',
        inquiryType: 'preorder',
        message: '',
      });
      setErrors({});
    }, 900);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 relative bg-white overflow-hidden border-t border-heritage-border/70"
    >
      {/* Anchor helper for #inquiry backward compatibility */}
      <div id="inquiry" className="absolute -top-24 pointer-events-none" />

      {/* Subtle Background Watermark */}
      <div className="absolute top-10 right-[-5%] text-heritage-gold/5 pointer-events-none select-none hidden lg:block">
        <DongSonDrumMotif size={450} />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge="Đăng ký sở hữu & Hợp tác ngoại giao"
          title={
            <>
              Kết Nối Cùng <span className="text-gold-gradient">VietScape Models</span>
            </>
          }
          subtitle="Hãy để lại thông tin để nhận tư vấn chuyên sâu về các bản đúc giới hạn, đặt làm tác phẩm theo yêu cầu hoặc hợp tác quà tặng văn hóa đối ngoại."
          dividerVariant="lotus"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Consultation Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-heritage-sand/60 border border-heritage-border space-y-6">
              <div>
                <span className="text-xs font-mono text-heritage-gold uppercase tracking-wider block">
                  Không gian tiếp đón & Giám định
                </span>
                <h3 className="font-serif text-2xl font-bold text-heritage-dark mt-1">
                  Phòng Giám Tuyển VietScape
                </h3>
                <p className="text-sm text-heritage-muted mt-2 font-sans leading-relaxed">
                  Chúng tôi hân hạnh đón tiếp quý khách đến chiêm ngưỡng trực tiếp các mô hình mẫu, trao đổi về đồ án phục dựng và thưởng trà đàm đạo về di sản kiến trúc Việt.
                </p>
              </div>

              <div className="space-y-4 text-xs font-sans text-heritage-muted pt-4 border-t border-heritage-border/70">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-heritage-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-heritage-dark block">Showroom Hà Nội:</strong>
                    <span>Số 18 Hàng Gai, Phường Hàng Gai, Quận Hoàn Kiếm, Hà Nội</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-heritage-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-heritage-dark block">Showroom TP. Hồ Chí Minh:</strong>
                    <span>88 Đồng Khởi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-heritage-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-heritage-dark block">Hotline Trực Tiếp:</strong>
                    <a
                      href="tel:0988888888"
                      className="font-mono text-heritage-dark font-semibold hover:text-heritage-gold transition-colors"
                    >
                      +84 988 888 888
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-heritage-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-heritage-dark block">Email Ban Giám Tuyển:</strong>
                    <a
                      href="mailto:curator@vietscapemodels.vn"
                      className="font-mono text-heritage-dark hover:text-heritage-gold transition-colors"
                    >
                      curator@vietscapemodels.vn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-heritage-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-heritage-dark block">Thời Gian Làm Việc:</strong>
                    <span>Thứ Hai — Chủ Nhật (09:00 - 20:30)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* B2B & Diplomatic Box */}
            <div className="p-6 rounded-2xl bg-heritage-cream/60 border border-heritage-border/80 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-heritage-dark text-heritage-gold flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <DongSonDrumMotif size={28} />
              </div>
              <div className="text-xs space-y-1">
                <h4 className="font-serif font-bold text-heritage-dark text-sm">
                  Quà Tặng Ngoại Giao & Doanh Nghiệp
                </h4>
                <p className="text-heritage-muted leading-relaxed">
                  VietScape cung cấp giải pháp hộp quà sơn mài cao cấp, khắc laser biểu trưng song phương và thiệp nghệ thuật phục vụ đón tiếp đối tác quốc tế hoặc quà tặng văn hóa trọng thể.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border border-heritage-border shadow-xl space-y-6"
              noValidate
            >
              <div className="border-b border-heritage-border/70 pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-bold text-heritage-dark">
                    Phiếu Đăng Ký Sở Hữu & Hợp Tác
                  </h3>
                  <LyLotusMotif size={24} className="text-heritage-gold" />
                </div>
                <p className="text-xs font-mono text-heritage-muted mt-1">
                  Vui lòng điền thông tin bên dưới, chuyên viên giám tuyển sẽ liên hệ trong 24 giờ.
                </p>
              </div>

              {/* Inquiry Type Radio / Buttons */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-heritage-dark font-semibold">
                  Mục đích liên hệ:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {INQUIRY_TYPES.map((type) => (
                    <label
                      key={type.id}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                        formData.inquiryType === type.id
                          ? 'border-heritage-gold bg-heritage-gold/10 font-semibold text-heritage-dark ring-1 ring-heritage-gold/30'
                          : 'border-heritage-border bg-heritage-sand/40 text-heritage-muted hover:bg-white hover:text-heritage-dark'
                      }`}
                    >
                      <input
                        type="radio"
                        name="inquiryType"
                        value={type.id}
                        checked={formData.inquiryType === type.id}
                        onChange={(e) =>
                          setFormData({ ...formData, inquiryType: e.target.value as any })
                        }
                        className="hidden"
                      />
                      <span
                        className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${
                          formData.inquiryType === type.id
                            ? 'bg-heritage-gold border-heritage-gold ring-2 ring-heritage-gold/20'
                            : 'border-heritage-muted/60'
                        }`}
                      >
                        {formData.inquiryType === type.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      <span className="truncate">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Two columns: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-heritage-dark font-semibold">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden transition-colors ${
                      errors.fullName
                        ? 'border-red-500 bg-red-50/20 text-heritage-dark'
                        : 'border-heritage-border focus:border-heritage-gold'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] font-mono text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-heritage-dark font-semibold">
                    Số điện thoại liên hệ *
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="0988 888 888"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden transition-colors font-mono ${
                      errors.phoneNumber
                        ? 'border-red-500 bg-red-50/20 text-heritage-dark'
                        : 'border-heritage-border focus:border-heritage-gold'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <span className="text-[11px] font-mono text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.phoneNumber}
                    </span>
                  )}
                </div>
              </div>

              {/* Email & Model Interest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-heritage-dark font-semibold">
                    Địa chỉ email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden transition-colors ${
                      errors.email
                        ? 'border-red-500 bg-red-50/20 text-heritage-dark'
                        : 'border-heritage-border focus:border-heritage-gold'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] font-mono text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-heritage-dark font-semibold">
                    Tác phẩm quan tâm *
                  </label>
                  <select
                    value={formData.modelInterest}
                    onChange={(e) => handleInputChange('modelInterest', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden bg-white transition-colors ${
                      errors.modelInterest
                        ? 'border-red-500 bg-red-50/20'
                        : 'border-heritage-border focus:border-heritage-gold'
                    }`}
                  >
                    <option value="Chùa Một Cột">Chùa Một Cột (Tỉ lệ 1:75 — Đang sẵn sàng)</option>
                    <option value="Lăng Chủ tịch Hồ Chí Minh">Lăng Chủ tịch Hồ Chí Minh (Tỉ lệ 1:300 — Đang sẵn sàng)</option>
                    <option value="Khuê Văn Các">Khuê Văn Các (Tỉ lệ 1:100 — Đăng ký mở bán sớm)</option>
                    <option value="Ngọ Môn Huế">Ngọ Môn — Cố đô Huế (Tỉ lệ 1:200 — Đăng ký mở bán sớm)</option>
                    <option value="Công trình kiến trúc khác">Công trình kiến trúc khác (Yêu cầu riêng)</option>
                  </select>
                  {errors.modelInterest && (
                    <span className="text-[11px] font-mono text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.modelInterest}
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="block text-xs font-mono text-heritage-dark font-semibold">
                  Nội dung yêu cầu / Lời nhắn *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Chia sẻ về số lượng dự kiến, yêu cầu khắc tên lưu niệm, địa chỉ giao nhận hoặc câu hỏi của bạn..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden transition-colors ${
                    errors.message
                      ? 'border-red-500 bg-red-50/20 text-heritage-dark'
                      : 'border-heritage-border focus:border-heritage-gold'
                  }`}
                />
                {errors.message && (
                  <span className="text-[11px] font-mono text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-xs font-mono uppercase tracking-widest font-semibold bg-heritage-dark text-heritage-sand hover:bg-heritage-gold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-4 border-2 border-heritage-sand border-t-transparent rounded-full animate-spin" />
                    <span>Đang gửi thông tin đến ban giám tuyển...</span>
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Gửi yêu cầu đến ban giám tuyển</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Success Modal */}
      <AnimatePresence>
        {successModalData && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
            onClick={() => setSuccessModalData(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-8 sm:p-10 border-2 border-heritage-gold shadow-2xl space-y-6 text-center overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-heritage-gold via-[#E5C158] to-heritage-gold" />

              <button
                onClick={() => setSuccessModalData(null)}
                className="absolute top-4 right-4 p-2 text-heritage-muted hover:text-heritage-dark rounded-full hover:bg-heritage-sand transition-colors"
                aria-label="Đóng thông báo"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-heritage-gold font-semibold block">
                  Tiếp nhận thành công
                </span>
                <h3 className="font-serif text-2xl font-bold text-heritage-dark">
                  Cảm Ơn Quý Khách Đã Kết Nối
                </h3>
                <p className="text-sm text-heritage-muted font-sans leading-relaxed">
                  Kính gửi <strong className="text-heritage-dark">{successModalData.fullName}</strong>, yêu cầu của quý khách đã được lưu trữ trong hệ thống lưu trữ tác phẩm của VietScape Models.
                </p>
              </div>

              {/* Ticket Card */}
              <div className="p-5 rounded-2xl bg-heritage-sand/70 border border-heritage-border text-xs font-mono text-left space-y-2.5">
                <div className="flex items-center justify-between border-b border-heritage-border/70 pb-2">
                  <span className="text-heritage-muted flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-heritage-gold" />
                    Mã hồ sơ:
                  </span>
                  <span className="font-bold text-heritage-gold tracking-wide">
                    {successModalData.ticketId}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-heritage-border/70 pb-2">
                  <span className="text-heritage-muted">Tác phẩm quan tâm:</span>
                  <span className="font-semibold text-heritage-dark">
                    {successModalData.modelInterest}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-heritage-border/70 pb-2">
                  <span className="text-heritage-muted">Phân loại liên hệ:</span>
                  <span className="text-heritage-dark">{successModalData.inquiryTypeLabel}</span>
                </div>
                <div className="flex items-center justify-between border-b border-heritage-border/70 pb-2">
                  <span className="text-heritage-muted">Thời gian ghi nhận:</span>
                  <span className="text-heritage-dark">{successModalData.submittedAt}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-heritage-muted">Trạng thái:</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Ban Giám tuyển sẽ liên hệ trong 24h
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSuccessModalData(null)}
                className="w-full py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold bg-heritage-dark text-heritage-sand hover:bg-heritage-gold transition-colors shadow-sm hover:shadow-md cursor-pointer"
              >
                Hoàn tất & Đóng
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InquirySection;
