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
  Wrench,
  PackageCheck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { DongSonDrumMotif, LyLotusMotif } from '../common/HeritageMotifs';
import { InquiryFormData, InquiryFormErrors } from '../../types';
import { sendInquiryEmail, calculateEstimatedPrice } from '../../services/emailService';

interface InquirySectionProps {
  initialModelInterest?: string;
}

const INQUIRY_TYPES = [
  { id: 'retail_diy', label: 'Đặt mua Kit DIY lẻ (98.200 ₫)', shortLabel: 'Kit DIY lẻ' },
  { id: 'combo_deal', label: 'Combo Kit + Bộ dụng cụ chuyên dụng (137.200 ₫)', shortLabel: 'Combo Kit + Dụng cụ' },
  { id: 'workshop_school', label: 'Đặt cho Trường học / CLB / Workshop (Chiết khấu)', shortLabel: 'Workshop / Trường học' },
  { id: 'corporate_gift', label: 'Quà lưu niệm văn hóa / Doanh nghiệp', shortLabel: 'Quà lưu niệm' },
  { id: 'partnership', label: 'Hợp tác ký gửi (Nhà sách, Quầy lưu niệm, Bảo tàng)', shortLabel: 'Hợp tác ký gửi' },
] as const;

export const InquirySection: React.FC<InquirySectionProps> = ({
  initialModelInterest = 'Kit Chùa Một Cột — Thăng Long Hà Nội (98.200 VNĐ)',
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    modelInterest: initialModelInterest,
    includeToolCombo: false,
    inquiryType: 'retail_diy',
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
  const [submissionError, setSubmissionError] = useState<{ message: string; mailtoUrl?: string } | null>(null);
  const [successModalData, setSuccessModalData] = useState<{
    ticketId: string;
    submittedAt: string;
    fullName: string;
    modelInterest: string;
    inquiryTypeLabel: string;
    estimatedPrice: string;
    includeToolCombo: boolean;
    simulated?: boolean;
  } | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (successModalData) setSuccessModalData(null);
        if (submissionError) setSubmissionError(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [successModalData, submissionError]);

  const validateField = (field: keyof InquiryFormData, value: unknown): string | undefined => {
    switch (field) {
      case 'fullName':
        if (typeof value !== 'string' || !value.trim()) return 'Vui lòng nhập họ và tên của bạn.';
        if (value.trim().length < 2) return 'Họ tên phải có ít nhất 2 ký tự.';
        return undefined;
      case 'phoneNumber': {
        const strVal = typeof value === 'string' ? value : '';
        const cleanedPhone = strVal.replace(/\s+/g, '');
        const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
        if (!cleanedPhone) return 'Vui lòng nhập số điện thoại liên hệ.';
        if (!phoneRegex.test(cleanedPhone)) {
          return 'Số điện thoại không hợp lệ (Ví dụ: 0852 699 188 hoặc 0988 888 888).';
        }
        return undefined;
      }
      case 'email': {
        const strVal = typeof value === 'string' ? value : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!strVal.trim()) return 'Vui lòng nhập địa chỉ email.';
        if (!emailRegex.test(strVal.trim())) return 'Địa chỉ email không đúng định dạng (Ví dụ: name@domain.com).';
        return undefined;
      }
      case 'modelInterest':
        if (typeof value !== 'string' || !value.trim()) return 'Vui lòng lựa chọn tác phẩm kiến trúc quan tâm.';
        return undefined;
      case 'message':
        if (typeof value !== 'string' || !value.trim()) return 'Vui lòng chia sẻ nội dung yêu cầu hoặc câu hỏi của bạn.';
        if (value.trim().length < 10) return 'Lời nhắn cần ít nhất 10 ký tự để chúng tôi hỗ trợ tốt nhất.';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (field: keyof InquiryFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for field if valid
    const errKey = field as keyof InquiryFormErrors;
    if (errors[errKey]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [errKey]: err }));
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

  const currentEstimatedPrice = calculateEstimatedPrice(formData.modelInterest, formData.includeToolCombo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const result = await sendInquiryEmail(formData);

      if (result.success) {
        const typeLabel =
          INQUIRY_TYPES.find((t) => t.id === formData.inquiryType)?.label || 'Đặt mua Kit DIY lẻ';

        const fallbackTicketId = `VS-INQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const ticketId = result.ticketId || fallbackTicketId;

        setSuccessModalData({
          ticketId,
          submittedAt: result.submittedAt,
          fullName: formData.fullName.trim(),
          modelInterest: formData.modelInterest,
          inquiryTypeLabel: typeLabel,
          estimatedPrice: currentEstimatedPrice,
          includeToolCombo: Boolean(formData.includeToolCombo),
          simulated: result.simulated,
        });

        // Reset form
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          modelInterest: 'Kit Chùa Một Cột — Thăng Long Hà Nội (98.200 VNĐ)',
          includeToolCombo: false,
          inquiryType: 'retail_diy',
          message: '',
        });
        setErrors({});
      } else {
        setSubmissionError({
          message: result.error || 'Đã xảy ra sự cố khi truyền dữ liệu.',
          mailtoUrl: result.mailtoUrl,
        });
      }
    } catch (err: unknown) {
      console.error('Submission error:', err);
      setSubmissionError({
        message: 'Lỗi mạng hoặc máy chủ không phản hồi. Vui lòng thử lại hoặc liên hệ Hotline.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
          badge="Đồ Án Khởi Nghiệp EXE101 — Đặt Mua & Hợp Tác"
          title={
            <>
              Đặt Mua Kit DIY & <span className="text-gold-gradient">Kết Nối Hợp Tác</span>
            </>
          }
          subtitle="Sở hữu bộ kit mô hình giấy 3D Low-poly di sản kèm podcast song ngữ chỉ với 98.200 VNĐ/kit. Miễn phí vận chuyển toàn quốc cho đơn hàng từ 2 kit hoặc khi đặt kèm combo dụng cụ thủ công."
          dividerVariant="lotus"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Consultation Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-heritage-sand/60 border border-heritage-border space-y-6">
              <div>
                <span className="text-xs font-mono text-heritage-gold uppercase tracking-wider block">
                  Đại học FPT Hà Nội — Nhóm 3 (GD1912)
                </span>
                <h3 className="font-serif text-2xl font-bold text-heritage-dark mt-1">
                  Dự Án Khởi Nghiệp VietScape Models
                </h3>
                <p className="text-sm text-heritage-muted mt-2 font-sans leading-relaxed">
                  Chúng tôi sẵn sàng hỗ trợ bạn trải nghiệm tự tay lắp ráp mô hình giấy di sản, cung cấp video hướng dẫn chi tiết và chia sẻ niềm đam mê văn hóa cội nguồn cùng giới trẻ.
                </p>
              </div>

              <div className="space-y-4 text-xs font-sans text-heritage-muted pt-4 border-t border-heritage-border/70">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-heritage-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-heritage-dark block">Văn Phòng Dự Án EXE101:</strong>
                    <span>Phòng DE424, Tòa nhà Gamma, Trường Đại học FPT Hà Nội, Khu CNC Hòa Lạc</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-heritage-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-heritage-dark block">Điểm Trưng Bày &amp; Ký Gửi Thử Nghiệm:</strong>
                    <span>Phố cổ Hà Nội (Nhà sách Phương Nam / Nhã Nam, quầy lưu niệm Văn Miếu &amp; Lăng Bác)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-heritage-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-heritage-dark block">Hotline / Zalo Dự Án:</strong>
                    <a
                      href="tel:0852699188"
                      className="font-mono text-heritage-dark font-semibold hover:text-heritage-gold transition-colors"
                    >
                      0852 699 188
                    </a>
                    <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
                      (Hỗ trợ Zalo 24/7 xem ảnh mẫu &amp; tư vấn ráp)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-heritage-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-heritage-dark block">Hòm Thư Quản Trị Đơn Hàng:</strong>
                    <a
                      href="mailto:vietscapemodels@gmail.com"
                      className="font-mono text-heritage-dark hover:text-heritage-gold transition-colors"
                    >
                      vietscapemodels@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-heritage-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-heritage-dark block">Thời Gian Hỗ Trợ:</strong>
                    <span>Thứ Hai — Chủ Nhật (08:30 - 21:30)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* School & Workshop Box */}
            <div className="p-6 rounded-2xl bg-heritage-cream/60 border border-heritage-border/80 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-heritage-dark text-heritage-gold flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <DongSonDrumMotif size={28} />
              </div>
              <div className="text-xs space-y-1">
                <h4 className="font-serif font-bold text-heritage-dark text-sm">
                  Chính Sách Lớp Học, Workshop &amp; Quà Tặng
                </h4>
                <p className="text-heritage-muted leading-relaxed">
                  VietScape hỗ trợ chiết khấu 15% - 25% cho các đơn hàng phục vụ CLB học sinh, sinh viên, workshop trải nghiệm văn hóa và đơn vị du lịch lữ hành.
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
                    Phiếu Đăng Ký Sở Hữu Kit Di Sản
                  </h3>
                  <LyLotusMotif size={24} className="text-heritage-gold" />
                </div>
                <p className="text-xs font-mono text-heritage-muted mt-1">
                  Thông tin đơn hàng được tiếp nhận và xử lý trực tiếp qua hệ thống Gmail ban sáng lập.
                </p>
              </div>

              {/* Inquiry Type Radio / Buttons */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-heritage-dark font-semibold">
                  Phân loại nhu cầu của bạn:
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
                          handleInputChange('inquiryType', e.target.value)
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
                    Họ và tên của bạn *
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
                    Số điện thoại nhận hàng (Zalo) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="0852 699 188"
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
                    Địa chỉ email nhận thông tin *
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
                    Bộ Kit quan tâm *
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
                    <option value="Kit Chùa Một Cột — Thăng Long Hà Nội (98.200 VNĐ)">
                      Kit Chùa Một Cột — Thăng Long (98.200 ₫)
                    </option>
                    <option value="Kit Lăng Chủ tịch Hồ Chí Minh — Ba Đình (98.200 VNĐ)">
                      Kit Lăng Bác — Ba Đình (98.200 ₫)
                    </option>
                    <option value="Kit Khuê Văn Các — Văn Miếu Quốc Tử Giám (98.200 VNĐ)">
                      Kit Khuê Văn Các — Văn Miếu (98.200 ₫)
                    </option>
                    <option value="Combo Trọn Bộ 3 Di Sản (Ưu đãi 265.000 VNĐ)">
                      Combo Trọn Bộ 3 Di Sản (265.000 ₫ — Tiết kiệm 30k)
                    </option>
                    <option value="Công trình kiến trúc khác / Đặt làm theo yêu cầu">
                      Đặt làm đồ án kiến trúc riêng theo yêu cầu
                    </option>
                  </select>
                  {errors.modelInterest && (
                    <span className="text-[11px] font-mono text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.modelInterest}
                    </span>
                  )}
                </div>
              </div>

              {/* Toolset Combo Checkbox Cross-sell */}
              <div className="p-4 rounded-2xl bg-heritage-gold/10 border border-heritage-gold/30 hover:border-heritage-gold/50 transition-colors">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.includeToolCombo)}
                    onChange={(e) => handleInputChange('includeToolCombo', e.target.checked)}
                    className="w-5 h-5 rounded-md text-heritage-gold focus:ring-heritage-gold border-heritage-border shrink-0 mt-0.5 accent-[#C59B27]"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-heritage-dark uppercase tracking-wider flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-heritage-gold" />
                        Kèm Combo Bộ Dụng Cụ DIY Chuyên Dụng (+39.000 ₫)
                      </span>
                      <span className="text-[10px] font-mono bg-heritage-gold text-white px-2 py-0.5 rounded-full font-bold">
                        Khuyên dùng
                      </span>
                    </div>
                    <p className="text-xs text-heritage-muted font-sans leading-relaxed">
                      Trọn bộ 3 món tiện lợi: <strong>Keo dán mô hình chuyên dụng đầu kim</strong> (khô 15s không nhăn giấy), <strong>Nhíp định vị chi tiết nhỏ</strong> bằng thép không gỉ, và <strong>Dao trổ rọc giấy thủ công</strong> sắc nét.
                    </p>
                  </div>
                </label>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="block text-xs font-mono text-heritage-dark font-semibold">
                  Địa chỉ giao hàng &amp; Lời nhắn *
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Ghi rõ số nhà, tên đường, phường/xã, quận/huyện hoặc yêu cầu bọc quà tặng bạn bè..."
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

              {/* Live Price Estimation Strip */}
              <div className="p-3.5 rounded-xl bg-heritage-sand/70 border border-heritage-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-heritage-muted">
                  <PackageCheck className="w-4 h-4 text-heritage-gold" />
                  <span>Dự toán đơn hàng:</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-heritage-dark font-serif">
                    {currentEstimatedPrice}
                  </span>
                  {formData.includeToolCombo && (
                    <span className="text-[10px] text-heritage-gold font-bold bg-heritage-gold/15 px-2 py-0.5 rounded-md">
                      (Đã bao gồm combo dụng cụ)
                    </span>
                  )}
                </div>
              </div>

              {/* Submission Error Banner */}
              {submissionError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{submissionError.message}</span>
                  </div>
                  {submissionError.mailtoUrl && (
                    <a
                      href={submissionError.mailtoUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-red-700 underline hover:text-red-900"
                    >
                      Bấm vào đây để mở email gửi trực tiếp <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-xs font-mono uppercase tracking-widest font-semibold bg-heritage-dark text-heritage-sand hover:bg-heritage-gold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-4 border-2 border-heritage-sand border-t-transparent rounded-full animate-spin" />
                    <span>Đang truyền dữ liệu đơn hàng về Gmail...</span>
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Gửi đơn đặt hàng &amp; Nhận xác nhận ngay</span>
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
                  Cảm Ơn Bạn Đã Đồng Hành Cùng Di Sản
                </h3>
                <p className="text-sm text-heritage-muted font-sans leading-relaxed">
                  Kính gửi <strong className="text-heritage-dark">{successModalData.fullName}</strong>, yêu cầu đặt hàng của bạn đã được ghi nhận vào hệ thống của VietScape Models (Đồ án EXE101).
                </p>
                {successModalData.simulated && (
                  <p className="text-[11px] font-mono text-amber-700 bg-amber-50 py-1 px-2 rounded-md border border-amber-200 inline-block">
                    ⚡ Chế độ Demo / Thử nghiệm nội bộ (Đã lưu vào LocalStorage)
                  </p>
                )}
              </div>

              {/* Ticket Card */}
              <div className="p-5 rounded-2xl bg-heritage-sand/70 border border-heritage-border text-xs font-mono text-left space-y-2.5">
                <div className="flex items-center justify-between border-b border-heritage-border/70 pb-2">
                  <span className="text-heritage-muted flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-heritage-gold" />
                    Mã hồ sơ đơn hàng:
                  </span>
                  <span className="font-bold text-heritage-gold tracking-wide">
                    {successModalData.ticketId}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-heritage-border/70 pb-2">
                  <span className="text-heritage-muted">Bộ Kit đăng ký:</span>
                  <span className="font-semibold text-heritage-dark truncate max-w-[220px]">
                    {successModalData.modelInterest}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-heritage-border/70 pb-2">
                  <span className="text-heritage-muted">Combo dụng cụ thủ công:</span>
                  <span className={successModalData.includeToolCombo ? 'text-heritage-gold font-bold' : 'text-heritage-muted'}>
                    {successModalData.includeToolCombo ? 'CÓ (+39.000 ₫)' : 'Không kèm dụng cụ'}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-heritage-border/70 pb-2">
                  <span className="text-heritage-muted">Dự toán tổng tiền:</span>
                  <span className="font-bold text-heritage-dark text-sm">
                    {successModalData.estimatedPrice}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-heritage-border/70 pb-2">
                  <span className="text-heritage-muted">Thời gian ghi nhận:</span>
                  <span className="text-heritage-dark">{successModalData.submittedAt}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-heritage-muted">Trạng thái:</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                    <Sparkles className="w-3 h-3 text-emerald-500 animate-pulse" />
                    Nhóm dự án sẽ gọi xác nhận trong 24h
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSuccessModalData(null)}
                className="w-full py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold bg-heritage-dark text-heritage-sand hover:bg-heritage-gold transition-colors shadow-sm hover:shadow-md cursor-pointer"
              >
                Hoàn tất &amp; Đóng
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InquirySection;
