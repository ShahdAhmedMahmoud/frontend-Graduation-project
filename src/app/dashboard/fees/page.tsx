"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const API_BASE_URL = "http://localhost:5000/api";

type InvoiceItem = { title: string; amount: number };

type Invoice = {
  _id: string;
  academicYear: number;
  term: string;
  dueDate?: string;
  items: InvoiceItem[];
  currency: string;
  totalAmount: number;
  paidAmount: number;
  status: "unpaid" | "partially_paid" | "paid" | "cancelled";
};

type Summary = {
  total: number;
  paid: number;
  remaining: number;
  invoicesCount: number;
};

export default function FeesPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState("");

  async function loadData() {
    if (!session?.token) return;
    try {
      setLoading(true);
      setError("");
      const [summaryRes, invoicesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/payments/me/summary`, {
          headers: { Authorization: `Bearer ${session.token}` },
          cache: "no-store",
        }),
        fetch(`${API_BASE_URL}/payments/me/invoices`, {
          headers: { Authorization: `Bearer ${session.token}` },
          cache: "no-store",
        }),
      ]);

      const summaryData = await summaryRes.json();
      const invoicesData = await invoicesRes.json();

      if (!summaryRes.ok || !summaryData.success) throw new Error(summaryData.message || "Failed summary");
      if (!invoicesRes.ok || !invoicesData.success) throw new Error(invoicesData.message || "Failed invoices");

      setSummary(summaryData.data);
      setInvoices(invoicesData.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load fees");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.token]);

  useEffect(() => {
    async function confirmPaymentFromStripeSession() {
      if (!session?.token || typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");
      if (!sessionId) return;

      try {
        const res = await fetch(
          `${API_BASE_URL}/payments/confirm-session?sessionId=${encodeURIComponent(sessionId)}`,
          { headers: { Authorization: `Bearer ${session.token}` } },
        );
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Failed to confirm payment");
        toast.success("Payment confirmed successfully");
        await loadData();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to confirm payment");
      } finally {
        const cleanUrl = `${window.location.origin}/dashboard/fees`;
        window.history.replaceState({}, "", cleanUrl);
      }
    }

    confirmPaymentFromStripeSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.token]);

  async function payInvoice(invoice: Invoice) {
    if (!session?.token) return;
    setPayingId(invoice._id);
    try {
      const checkoutRes = await fetch(`${API_BASE_URL}/payments/checkout-session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoiceId: invoice._id }),
      });
      const checkoutData = await checkoutRes.json();
      if (!checkoutRes.ok || !checkoutData.success)
        throw new Error(checkoutData.message || "Checkout failed");
      window.location.href = checkoutData.data.checkoutUrl;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setPayingId(null);
    }
  }

  function downloadInvoice(invoiceId: string) {
    if (!session?.token) return;
    const url = `${API_BASE_URL}/payments/me/invoices/${invoiceId}/pdf`;
    fetch(url, { headers: { Authorization: `Bearer ${session.token}` } })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to download invoice");
        const blob = await res.blob();
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = `invoice-${invoiceId}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(href);
      })
      .catch((err) => toast.error(err.message));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Tuition Fees & Payments</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Pay your university fees online and download invoice receipts.
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Fees</p>
              <p className="text-2xl font-semibold dark:text-white">{summary?.total ?? 0} EGP</p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">Paid</p>
              <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{summary?.paid ?? 0} EGP</p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">Remaining</p>
              <p className="text-2xl font-semibold text-rose-600 dark:text-rose-400">{summary?.remaining ?? 0} EGP</p>
            </div>
          </div>

          {/* Invoices */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
            <div className="border-b dark:border-gray-700 px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
              Invoices
            </div>
            {invoices.length === 0 ? (
              <div className="p-6 text-sm text-gray-500 dark:text-gray-400">No invoices found.</div>
            ) : (
              <div className="divide-y dark:divide-gray-700">
                {invoices.map((invoice) => {
                  const remaining = Math.max(Number(invoice.totalAmount) - Number(invoice.paidAmount), 0);
                  return (
                    <div
                      key={invoice._id}
                      className="p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Year {invoice.academicYear} - {invoice.term}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Total: {invoice.totalAmount} {invoice.currency} | Paid: {invoice.paidAmount} {invoice.currency} | Remaining: {remaining} {invoice.currency}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Status: {invoice.status}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => downloadInvoice(invoice._id)}
                          className="rounded-xl border border-gray-300 dark:border-gray-600 dark:text-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          Download Invoice
                        </button>
                        <button
                          onClick={() => payInvoice(invoice)}
                          disabled={remaining <= 0 || payingId === invoice._id}
                          className="rounded-xl bg-slate-900 dark:bg-slate-700 text-white px-3 py-2 text-sm disabled:opacity-60 hover:bg-slate-800 dark:hover:bg-slate-600"
                        >
                          {payingId === invoice._id ? "Paying..." : remaining <= 0 ? "Paid" : "Pay by Card"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}