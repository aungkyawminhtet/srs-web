import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata = {
  title: "Administration | Fun and Learn",
  description: "Administrator Workspace for Fun and Learn",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4F6F5] flex flex-col lg:flex-row font-sans text-slate-800">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}

          {/* Sample disclaimer footer matching mockup */}
          <div className="pt-6 pb-4 border-t border-slate-200/60 text-center">
            <p className="text-[11px] text-slate-400">
              ⓘ Sample admin workspace · Reference names and learning plans retained; all added records, totals and activity are illustrative. No live actions.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

