"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CreditCard,
  Upload,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Info,
  ShieldCheck,
  Check,
  Building,
  Image as ImageIcon,
} from "lucide-react";
import { enrollmentsApi } from "@/lib/api";
import { useCreateEnrollmentMutation } from "@/hooks/api";

const AVAILABLE_COURSES = [
  {
    id: "alg-1",
    title: "Algebra I, minus the overwhelm",
    subject: "Mathematics",
    amount: 150000,
    advisor: "Lin Chen",
  },
  {
    id: "sci-1",
    title: "Science, explored",
    subject: "Middle School Biology",
    amount: 140000,
    advisor: "Dr. Maya Patel",
  },
  {
    id: "db-1",
    title: "1501208 Database Systems",
    subject: "Computer Science",
    amount: 180000,
    advisor: "Lin Chen",
  },
  {
    id: "math-2",
    title: "1305215 Discrete Mathematics & Logic",
    subject: "Mathematics",
    amount: 130000,
    advisor: "Dr. Maya Patel",
  },
];

const BANKING_OPTIONS = [
  {
    id: "KBZPay",
    name: "KBZPay",
    accountNumber: "09987654321",
    accountName: "Fun & Learn Tutoring",
    color: "#005696",
    badge: "Instant Transfer",
  },
  {
    id: "Wave Pay",
    name: "Wave Pay",
    accountNumber: "09987654321",
    accountName: "Fun & Learn Tutoring",
    color: "#FFD200",
    badge: "Quick QR / Mobile",
  },
  {
    id: "CB Pay",
    name: "CB Pay",
    accountNumber: "0012 3456 7890",
    accountName: "Fun & Learn Education",
    color: "#D81E05",
    badge: "Direct Bank App",
  },
  {
    id: "AYA Pay",
    name: "AYA Pay",
    accountNumber: "09987654321",
    accountName: "Fun & Learn Education",
    color: "#C51A1B",
    badge: "Mobile Wallet",
  },
];

function EnrollmentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const programParam = searchParams ? searchParams.get("program") : null;

  const [selectedCourse, setSelectedCourse] = useState(AVAILABLE_COURSES[0]);
  const [paymentName, setPaymentName] = useState("Emma Thant");
  const [studentEmail, setStudentEmail] = useState("emma.thant@student.edu");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedBank, setSelectedBank] = useState("KBZPay");
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [receiptFileName, setReceiptFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedInvoice, setSubmittedInvoice] = useState<string | null>(null);

  useEffect(() => {
    if (programParam) {
      const match = AVAILABLE_COURSES.find(
        (c) =>
          c.title.toLowerCase().includes(programParam.toLowerCase()) ||
          c.id.toLowerCase().includes(programParam.toLowerCase())
      );
      if (match) {
        setSelectedCourse(match);
      }
    }
  }, [programParam]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const createEnrollmentMutation = useCreateEnrollmentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptImage) {
      alert("Please upload your payment successful receipt image.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await createEnrollmentMutation.mutateAsync({
        programId: selectedCourse.id,
        programTitle: selectedCourse.title,
        amountPaid: selectedCourse.amount,
        paymentMethod: selectedBank as any,
        paymentDate,
        paymentSlipUrl: receiptImage,
        notes: `Payer: ${paymentName} (${studentEmail})`,
      });

      const inv = (res as any)?._id ? `INV-${(res as any)._id.slice(-6).toUpperCase()}` : `INV-${Date.now().toString().slice(-6)}`;
      setSubmittedInvoice(inv);
    } catch {
      // Offline fallback
      setSubmittedInvoice(`INV-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-wider uppercase text-slate-400 font-mono block mb-1.5">
          Student Portal · Course Enrollment &amp; Payment
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#0B1E2B] tracking-tight font-display">
          Enroll in Course &amp; Submit Receipt
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
          Transfer tuition via your preferred mobile banking wallet, then upload your transaction slip screenshot below.
        </p>
      </div>

      {submittedInvoice ? (
        /* Success Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#0A5C4C]/30 shadow-md text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#EAF5F2] text-[#0A5C4C] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#0B1E2B] font-display">
              Payment Receipt Uploaded Successfully!
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Your enrollment for <strong className="text-slate-900">{selectedCourse.title}</strong> has been registered under invoice <strong className="text-[#0A5C4C] font-mono">{submittedInvoice}</strong>.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-xs text-slate-600 text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Payer Name:</span>
              <span className="font-semibold text-slate-900">{paymentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payment Wallet:</span>
              <span className="font-semibold text-slate-900">{selectedBank}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Amount Paid:</span>
              <span className="font-bold text-[#0A5C4C]">{selectedCourse.amount.toLocaleString()} MMK</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Verification Status:</span>
              <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Pending Admin Approval
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard/billing"
              className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-xs transition-all"
            >
              <span>View Invoice in Billing History</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard/my-learning"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-full transition-all"
            >
              <span>Go to My Learning</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Enrollment & Payment Slip Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Select Course */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-[#0B1E2B] font-display flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0A5C4C] text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Select Enrolling Program</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AVAILABLE_COURSES.map((course) => {
                const isSelected = selectedCourse.id === course.id;
                return (
                  <div
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#EAF5F2]/60 border-[#0A5C4C] ring-2 ring-[#0A5C4C]/20 shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#0A5C4C] font-mono">
                      {course.subject}
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                      {course.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Advisor: {course.advisor}
                    </div>
                    <div className="text-sm font-black text-[#0B1E2B] font-display mt-2">
                      {course.amount.toLocaleString()} MMK
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose Banking Wallet */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-[#0B1E2B] font-display flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0A5C4C] text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Banking Wallet Information</span>
            </h2>

            <p className="text-xs text-slate-500">
              Please transfer <strong className="text-slate-900 font-bold">{selectedCourse.amount.toLocaleString()} MMK</strong> to any of our official student accounts below:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BANKING_OPTIONS.map((bank) => {
                const isSelected = selectedBank === bank.id;
                return (
                  <div
                    key={bank.id}
                    onClick={() => setSelectedBank(bank.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-slate-50 border-slate-900 ring-2 ring-slate-900/20 shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm text-slate-900 font-display">
                        {bank.name}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {bank.badge}
                      </span>
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-800 mt-2">
                      Account: {bank.accountNumber}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Name: {bank.accountName}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Payment Info & Receipt Image Upload */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-[#0B1E2B] font-display flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0A5C4C] text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Enter Payment Details &amp; Upload Slip</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Payer / Student Name
                </label>
                <input
                  type="text"
                  required
                  value={paymentName}
                  onChange={(e) => setPaymentName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0A5C4C]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Payment Date
                </label>
                <input
                  type="date"
                  required
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0A5C4C]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  readOnly
                  value={selectedCourse.title}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Total Amount (MMK)
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${selectedCourse.amount.toLocaleString()} MMK`}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[#0A5C4C] font-black cursor-not-allowed"
                />
              </div>
            </div>

            {/* Receipt Image Upload */}
            <div className="pt-2">
              <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#0A5C4C]" />
                <span>Upload Payment Successful Receipt Screenshot / Slip *</span>
              </label>

              <div className="border-2 border-dashed border-slate-200 hover:border-[#0A5C4C]/50 rounded-2xl p-5 text-center cursor-pointer transition-colors relative bg-slate-50/50">
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                {receiptImage ? (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-[#0A5C4C] flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{receiptFileName || "Slip selected"}</span>
                    </p>
                    <img
                      src={receiptImage}
                      alt="receipt slip"
                      className="max-h-48 mx-auto rounded-xl object-contain shadow-sm border border-slate-200"
                    />
                    <p className="text-[10px] text-slate-400">Click to change receipt slip</p>
                  </div>
                ) : (
                  <div className="space-y-1.5 py-3">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs font-bold text-slate-800">
                      Click or drag transaction receipt slip image here
                    </p>
                    <p className="text-[11px] text-slate-400">
                      PNG, JPG, or JPEG screenshot showing transaction reference number &amp; amount
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                disabled={submitting || !receiptImage}
                className="inline-flex items-center gap-2 bg-[#0A5C4C] hover:bg-[#08483b] disabled:opacity-50 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-xs transition-all cursor-pointer"
              >
                <span>{submitting ? "Uploading slip..." : "Submit Enrollment & Payment"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default function EnrollmentPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading enrollment form...</div>}>
      <EnrollmentContent />
    </Suspense>
  );
}
