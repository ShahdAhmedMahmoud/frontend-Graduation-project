// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { ArrowLeft, Camera, CheckCircle2, LoaderCircle, QrCode, ScanLine } from "lucide-react";

// const API_BASE_URL = "http://localhost:5000/api";

// type BarcodeDetectorInstance = {
//   detect: (source: ImageBitmapSource) => Promise<Array<{ rawValue?: string }>>;
// };

// declare global {
//   interface Window {
//     BarcodeDetector?: new (options: { formats: string[] }) => BarcodeDetectorInstance;
//   }
// }

// export default function StudentAttendanceScannerClient({
//   courseId,
// }: {
//   courseId: string;
// }) {
//   const { data: session } = useSession();
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const scanTimerRef = useRef<number | null>(null);

//   const [manualToken, setManualToken] = useState("");
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const [isScanning, setIsScanning] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const token = session?.token;

//   useEffect(() => {
//     return () => {
//       stopScanner();
//     };
//   }, []);

//   function stopScanner() {
//     if (scanTimerRef.current) {
//       window.clearTimeout(scanTimerRef.current);
//       scanTimerRef.current = null;
//     }

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }

//     setIsCameraOpen(false);
//     setIsScanning(false);
//   }

//   async function submitToken(qrToken: string) {
//     if (!token) {
//       setError("You need to login again as student.");
//       return;
//     }

//     setError("");
//     setMessage("");
//     setIsScanning(true);

//     try {
//       const response = await fetch(`${API_BASE_URL}/attendance/lecture-session/scan`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ qrToken }),
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Failed to record attendance");
//       }

//       setMessage(data.message || "Attendance recorded successfully");
//       setManualToken(qrToken);
//       stopScanner();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//     } finally {
//       setIsScanning(false);
//     }
//   }

//   async function handleManualSubmit() {
//     if (!manualToken.trim()) {
//       setError("Paste the QR token first.");
//       return;
//     }

//     await submitToken(manualToken.trim());
//   }

//   async function startScanner() {
//     if (typeof window === "undefined" || !window.BarcodeDetector) {
//       setError("Your browser does not support camera QR scanning here. Use the token box below.");
//       return;
//     }

//     try {
//       setError("");
//       setMessage("");
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "environment" },
//       });

//       streamRef.current = stream;
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         await videoRef.current.play();
//       }

//       setIsCameraOpen(true);
//       setIsScanning(true);

//       const detector = new window.BarcodeDetector({ formats: ["qr_code"] });

//       const scanFrame = async () => {
//         if (!videoRef.current || videoRef.current.readyState < 2) {
//           scanTimerRef.current = window.setTimeout(scanFrame, 400);
//           return;
//         }

//         try {
//           const results = await detector.detect(videoRef.current);
//           const firstValue = results[0]?.rawValue;

//           if (firstValue) {
//             setManualToken(firstValue);
//             await submitToken(firstValue);
//             return;
//           }
//         } catch {
//           setError("Could not read the QR yet. Keep the camera steady and try again.");
//         }

//         scanTimerRef.current = window.setTimeout(scanFrame, 600);
//       };

//       scanFrame();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Camera could not start");
//       stopScanner();
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-10">
//       <div className="mx-auto max-w-5xl px-6">
//         <Link
//           href={`/dashboard/coursesenrollment/${courseId}`}
//           className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-blue-600"
//         >
//           <ArrowLeft size={16} />
//           Back to course
//         </Link>

//         <div className="mb-8 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-600 p-8 text-white shadow-xl">
//           <div className="flex items-center gap-3">
//             <div className="rounded-2xl bg-white/15 p-3">
//               <ScanLine size={28} />
//             </div>
//             <div>
//               <p className="text-sm uppercase tracking-[0.2em] text-white/75">Scan Attendance</p>
//               <h1 className="text-3xl font-bold">Record your attendance for this lecture</h1>
//             </div>
//           </div>
//           <p className="mt-4 max-w-2xl text-sm text-white/85">
//             Scan the QR shown by your doctor, or paste the token manually if your device camera is unavailable.
//           </p>
//         </div>

//         <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
//           <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//             <div className="flex items-center justify-between gap-4">
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900">Camera scanner</h2>
//                 <p className="mt-1 text-sm text-gray-500">Open the camera and point it at the lecture QR code.</p>
//               </div>
//               {!isCameraOpen ? (
//                 <button
//                   onClick={startScanner}
//                   disabled={isScanning}
//                   className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
//                 >
//                   <Camera size={16} />
//                   Start scanner
//                 </button>
//               ) : (
//                 <button
//                   onClick={stopScanner}
//                   className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
//                 >
//                   Stop scanner
//                 </button>
//               )}
//             </div>

//             <div className="mt-6 overflow-hidden rounded-[2rem] border border-gray-200 bg-black">
//               {isCameraOpen ? (
//                 <video ref={videoRef} className="aspect-video w-full object-cover" muted playsInline />
//               ) : (
//                 <div className="flex aspect-video items-center justify-center text-center">
//                   <div>
//                     <QrCode size={42} className="mx-auto text-white/25" />
//                     <p className="mt-4 text-sm text-white/60">Camera preview will appear here.</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </section>

//           <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
//             <h2 className="text-xl font-semibold text-gray-900">Manual entry</h2>
//             <p className="mt-1 text-sm text-gray-500">If scanning is not available, paste the QR token and submit.</p>

//             <textarea
//               value={manualToken}
//               onChange={(e) => setManualToken(e.target.value)}
//               rows={7}
//               placeholder="Paste the qrToken here"
//               className="mt-6 w-full rounded-2xl border border-gray-200 px-4 py-3 font-mono text-sm text-gray-800 outline-none transition focus:border-blue-500"
//             />

//             <button
//               onClick={handleManualSubmit}
//               disabled={isScanning}
//               className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {isScanning ? (
//                 <>
//                   <LoaderCircle size={16} className="mr-2 animate-spin" />
//                   Submitting...
//                 </>
//               ) : (
//                 "Submit attendance"
//               )}
//             </button>

//             {error && (
//               <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
//                 {error}
//               </div>
//             )}

//             {message && !error && (
//               <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle2 size={16} />
//                   {message}
//                 </div>
//               </div>
//             )}
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Camera, CheckCircle2, LoaderCircle, QrCode, ScanLine } from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

type BarcodeDetectorInstance = {
  detect: (source: ImageBitmapSource) => Promise<Array<{ rawValue?: string }>>;
};

declare global {
  interface Window {
    BarcodeDetector?: new (options: { formats: string[] }) => BarcodeDetectorInstance;
  }
}

export default function StudentAttendanceScannerClient({ courseId }: { courseId: string }) {
  const { data: session } = useSession();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanTimerRef = useRef<number | null>(null);

  const [manualToken, setManualToken] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = session?.token;

  useEffect(() => { return () => { stopScanner(); }; }, []);

  function stopScanner() {
    if (scanTimerRef.current) { window.clearTimeout(scanTimerRef.current); scanTimerRef.current = null; }
    if (streamRef.current) { streamRef.current.getTracks().forEach((track) => track.stop()); streamRef.current = null; }
    setIsCameraOpen(false);
    setIsScanning(false);
  }

  async function submitToken(qrToken: string) {
    if (!token) { setError("You need to login again as student."); return; }
    setError(""); setMessage(""); setIsScanning(true);
    try {
      const response = await fetch(`${API_BASE_URL}/attendance/lecture-session/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ qrToken }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Failed to record attendance");
      setMessage(data.message || "Attendance recorded successfully");
      setManualToken(qrToken);
      stopScanner();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsScanning(false);
    }
  }

  async function handleManualSubmit() {
    if (!manualToken.trim()) { setError("Paste the QR token first."); return; }
    await submitToken(manualToken.trim());
  }

  async function startScanner() {
    if (typeof window === "undefined" || !window.BarcodeDetector) {
      setError("Your browser does not support camera QR scanning here. Use the token box below.");
      return;
    }
    try {
      setError(""); setMessage("");
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
      setIsCameraOpen(true); setIsScanning(true);
      const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
      const scanFrame = async () => {
        if (!videoRef.current || videoRef.current.readyState < 2) { scanTimerRef.current = window.setTimeout(scanFrame, 400); return; }
        try {
          const results = await detector.detect(videoRef.current);
          const firstValue = results[0]?.rawValue;
          if (firstValue) { setManualToken(firstValue); await submitToken(firstValue); return; }
        } catch { setError("Could not read the QR yet. Keep the camera steady and try again."); }
        scanTimerRef.current = window.setTimeout(scanFrame, 600);
      };
      scanFrame();
    } catch (err) { setError(err instanceof Error ? err.message : "Camera could not start"); stopScanner(); }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href={`/dashboard/coursesenrollment/${courseId}`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 transition hover:text-blue-600"
        >
          <ArrowLeft size={16} /> Back to course
        </Link>

        {/* Hero */}
        <div className="mb-8 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-600 p-8 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-3"><ScanLine size={28} /></div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/75">Scan Attendance</p>
              <h1 className="text-3xl font-bold">Record your attendance for this lecture</h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-sm text-white/85">
            Scan the QR shown by your doctor, or paste the token manually if your device camera is unavailable.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Camera Section */}
          <section className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Camera scanner</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Open the camera and point it at the lecture QR code.</p>
              </div>
              {!isCameraOpen ? (
                <button onClick={startScanner} disabled={isScanning}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 dark:bg-gray-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black dark:hover:bg-gray-600 disabled:opacity-60">
                  <Camera size={16} /> Start scanner
                </button>
              ) : (
                <button onClick={stopScanner}
                  className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-700">
                  Stop scanner
                </button>
              )}
            </div>

            <div className="mt-6 overflow-hidden rounded-[2rem] border border-gray-200 dark:border-gray-700 bg-black">
              {isCameraOpen ? (
                <video ref={videoRef} className="aspect-video w-full object-cover" muted playsInline />
              ) : (
                <div className="flex aspect-video items-center justify-center text-center">
                  <div>
                    <QrCode size={42} className="mx-auto text-white/25" />
                    <p className="mt-4 text-sm text-white/60">Camera preview will appear here.</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Manual Entry */}
          <section className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Manual entry</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">If scanning is not available, paste the QR token and submit.</p>

            <textarea
              value={manualToken}
              onChange={(e) => setManualToken(e.target.value)}
              rows={7}
              placeholder="Paste the qrToken here"
              className="mt-6 w-full rounded-2xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-500 px-4 py-3 font-mono text-sm text-gray-800 outline-none transition focus:border-blue-500"
            />

            <button onClick={handleManualSubmit} disabled={isScanning}
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60">
              {isScanning ? (<><LoaderCircle size={16} className="mr-2 animate-spin" />Submitting...</>) : "Submit attendance"}
            </button>

            {error && (
              <div className="mt-4 rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {message && !error && (
              <div className="mt-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
                <div className="flex items-center gap-2"><CheckCircle2 size={16} />{message}</div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
