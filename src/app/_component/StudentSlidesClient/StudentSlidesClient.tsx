// // // // // // // 'use client';
// // // // // // // import React, { useEffect, useState } from 'react';

// // // // // // // interface Slide {
// // // // // // //   _id: string;
// // // // // // //   title: string;
// // // // // // //   fileUrl: string;
// // // // // // //   uploadedAt: string;
// // // // // // //   professor: { name: string; email: string };
// // // // // // // }

// // // // // // // export default function StudentSlidesClient({ courseId }: { courseId: string }) {
// // // // // // //   const [slides, setSlides] = useState<Slide[]>([]);
// // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchSlides = async () => {
// // // // // // //       try {
// // // // // // //         const res = await fetch('http://localhost:5000/api/slides/list', {
// // // // // // //           method: 'POST',
// // // // // // //           headers: {
// // // // // // //             'Content-Type': 'application/json',
// // // // // // //           },
// // // // // // //           body: JSON.stringify({ courseId }),
// // // // // // //         });

// // // // // // //         const data = await res.json();
// // // // // // //         setSlides(data);
// // // // // // //       } catch (err) {
// // // // // // //         console.error(err);
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchSlides();
// // // // // // //   }, [courseId]);

// // // // // // //   if (loading) return <div>Loading slides...</div>;
// // // // // // //   if (slides.length === 0) return <div>No slides found for this course.</div>;

// // // // // // //   return (
// // // // // // //     <div className="p-4">
// // // // // // //       <h2 className="text-xl font-bold mb-4">Slides</h2>
// // // // // // //       <ul className="space-y-2">
// // // // // // //         {slides.map((slide) => (
// // // // // // //           <li key={slide._id} className="border p-2 rounded flex justify-between items-center">
// // // // // // //             <div>
// // // // // // //               <p className="font-semibold">{slide.title}</p>
// // // // // // //               <p className="text-sm text-gray-500">
// // // // // // //                 Uploaded by: {slide.professor.name} | {new Date(slide.uploadedAt).toLocaleDateString()}
// // // // // // //               </p>
// // // // // // //             </div>
// // // // // // //             <a
// // // // // // //               href={slide.fileUrl}
// // // // // // //               download
// // // // // // //               className="bg-green-600 text-white px-3 py-1 rounded"
// // // // // // //             >
// // // // // // //               Download
// // // // // // //             </a>
// // // // // // //           </li>
// // // // // // //         ))}
// // // // // // //       </ul>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // import React from 'react';
// // // // // // import getStudent from '@/utilites/getStudent';
// // // // // // import StudentSlidesClient from '@/app/_component/StudentSlidesClient/StudentSlidesClient';

// // // // // // interface StudentSlidesPageProps {
// // // // // //   params: { _id: string }; // _id هنا هو courseId
// // // // // // }

// // // // // // export default async function StudentSlidesPage({ params }: StudentSlidesPageProps) {
// // // // // //   const { _id: courseId } = params;

// // // // // //   const student = await getStudent(); // تجيب بيانات الطالب + الكورسات المسجل فيها
// // // // // //   console.log("Student:", student);

// // // // // //   const course = student?.courses.find((c: any) => c._id === courseId);
// // // // // //   if (!course) return <div>No course found</div>;

// // // // // //   return <StudentSlidesClient courseId={course._id} />;
// // // // // // }

// // // // // 'use client';
// // // // // import React, { useEffect, useState } from 'react';

// // // // // interface Slide {
// // // // //   _id: string;
// // // // //   title: string;
// // // // //   fileUrl: string;
// // // // //   uploadedAt: string;
// // // // //   professor: { name: string; email: string };
// // // // // }

// // // // // export default function StudentSlidesClient({ courseId }: { courseId: string }) {
// // // // //   const [slides, setSlides] = useState<Slide[]>([]);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   useEffect(() => {
// // // // //     const fetchSlides = async () => {
// // // // //       try {
// // // // //         const res = await fetch('http://localhost:5000/api/slides/list', {
// // // // //           method: 'POST',
// // // // //           headers: { 'Content-Type': 'application/json' },
// // // // //           body: JSON.stringify({ courseId }),
// // // // //         });

// // // // //         const data = await res.json();
// // // // //         console.log('Slides API response:', data);

// // // // //         // تأكد إن slides دايمًا array
// // // // //         if (Array.isArray(data)) {
// // // // //           setSlides(data);
// // // // //         } else if (Array.isArray(data.slides)) {
// // // // //           setSlides(data.slides);
// // // // //         } else {
// // // // //           setSlides([]);
// // // // //         }

// // // // //       } catch (err) {
// // // // //         console.error(err);
// // // // //         setSlides([]);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchSlides();
// // // // //   }, [courseId]);

// // // // //   if (loading) return <div>Loading slides...</div>;
// // // // //   if (slides.length === 0) return <div>No slides found for this course.</div>;

// // // // //   return (
// // // // //     <div className="p-4">
// // // // //       <h2 className="text-xl font-bold mb-4">Slides</h2>
// // // // //       <ul className="space-y-2">
// // // // //         {slides.map((slide) => (
// // // // //           <li key={slide._id} className="border p-2 rounded flex justify-between items-center">
// // // // //             <div>
// // // // //               <p className="font-semibold">{slide.title}</p>
// // // // //               <p className="text-sm text-gray-500">
// // // // //                 Uploaded by: {slide.professor.name} | {new Date(slide.uploadedAt).toLocaleDateString()}
// // // // //               </p>
// // // // //             </div>
// // // // //             <a
// // // // //               href={slide.fileUrl}
// // // // //               download
// // // // //               className="bg-green-600 text-white px-3 py-1 rounded"
// // // // //             >
// // // // //               Download
// // // // //             </a>
// // // // //           </li>
// // // // //         ))}
// // // // //       </ul>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // 'use client';
// // // // import React, { useEffect, useState } from 'react';

// // // // interface Slide {
// // // //   _id: string;
// // // //   title: string;
// // // //   fileUrl: string;
// // // //   uploadedAt: string;
// // // //   professor: { name: string; email: string };
// // // // }

// // // // interface Props {
// // // //   courseId: string;
// // // //   token: string; // 🔹 token جاي من server
// // // // }

// // // // export default function StudentSlidesClient({ courseId, token }: Props) {
// // // //   const [slides, setSlides] = useState<Slide[]>([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const fetchSlides = async () => {
// // // //       try {
// // // //         const res = await fetch('http://localhost:5000/api/slides/list', {
// // // //           method: 'POST',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //             'Authorization': `Bearer ${token}` // 🔹 استخدام token من props
// // // //           },
// // // //           body: JSON.stringify({ courseId }),
// // // //         });

// // // //         const data = await res.json();
// // // //         console.log('Slides API response:', data);

// // // //         if (Array.isArray(data)) setSlides(data);
// // // //         else setSlides([]);
// // // //       } catch (err) {
// // // //         console.error(err);
// // // //         setSlides([]);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchSlides();
// // // //   }, [courseId, token]);

// // // //   if (loading) return <div>Loading slides...</div>;
// // // //   if (slides.length === 0) return <div>No slides found for this course.</div>;

// // // //   return (
// // // //     <div className="p-4">
// // // //       <h2 className="text-xl font-bold mb-4">Slides</h2>
// // // //       <ul className="space-y-2">
// // // //         {slides.map((slide) => (
// // // //           <li key={slide._id} className="border p-2 rounded flex justify-between items-center">
// // // //             <div>
// // // //               <p className="font-semibold">{slide.title}</p>
// // // //               <p className="text-sm text-gray-500">
// // // //                 Uploaded by: {slide.professor.name} | {new Date(slide.uploadedAt).toLocaleDateString()}
// // // //               </p>
// // // //             </div>
// // // //             <a
// // // //               href={slide.fileUrl}
// // // //               download
// // // //               className="bg-green-600 text-white px-3 py-1 rounded"
// // // //             >
// // // //               Download
// // // //             </a>
// // // //           </li>
// // // //         ))}
// // // //       </ul>
// // // //     </div>
// // // //   );
// // // // }

// // // 'use client';
// // // import React, { useEffect, useState } from 'react';

// // // interface Slide {
// // //   _id: string;
// // //   title: string;
// // //   fileUrl: string;
// // //   uploadedAt: string;
// // //   professor: { name: string; email: string };
// // // }

// // // interface Props {
// // //   courseId: string;
// // //   token: string;
// // // }

// // // export default function StudentSlidesClient({ courseId, token }: Props) {
// // //   const [slides, setSlides] = useState<Slide[]>([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchSlides = async () => {
// // //       try {
// // //         const res = await fetch('http://localhost:5000/api/slides/list', {
// // //           method: 'POST',
// // //           headers: {
// // //             'Content-Type': 'application/json',
// // //             'Authorization': `Bearer ${token}`
// // //           },
// // //           body: JSON.stringify({ courseId }),
// // //         });

// // //         const data = await res.json();
// // //         console.log('Slides API response:', data);

// // //         if (Array.isArray(data)) setSlides(data);
// // //         else setSlides([]);
// // //       } catch (err) {
// // //         console.error(err);
// // //         setSlides([]);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchSlides();
// // //   }, [courseId, token]);

// // //   if (loading) return <div>Loading slides...</div>;
// // //   if (slides.length === 0) return <div>No slides found for this course.</div>;

// // //   return (
// // //     <div className="p-4">
// // //       <h2 className="text-xl font-bold mb-4">Slides</h2>
// // //       <ul className="space-y-2">
// // //         {slides.map((slide) => (
// // //           <li key={slide._id} className="border p-2 rounded flex justify-between items-center">
// // //             <div>
// // //               <p className="font-semibold">{slide.title}</p>
// // //               <p className="text-sm text-gray-500">
// // //                 Uploaded by: {slide.professor.name} | {new Date(slide.uploadedAt).toLocaleDateString()}
// // //               </p>
// // //             </div>
// // //             <a
// // //               href={slide.fileUrl}
// // //               download
// // //               className="bg-green-600 text-white px-3 py-1 rounded"
// // //             >
// // //               Download
// // //             </a>
// // //           </li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   );
// // // }


// // 'use client';

// // import React from 'react';

// // interface Slide {
// //   _id: string;
// //   title: string;
// //   fileUrl: string;
// //   uploadedAt: string;
// // }

// // export default function StudentSlidesClient({ slides }: { slides: Slide[] }) {

// //   const downloadSlide = (fileUrl: string) => {
// //     // رابط كامل للملف
// //     const fullUrl = `http://localhost:5000${fileUrl}`;
// //     // فتح الملف في نافذة جديدة
// //     window.open(fullUrl, "_blank");
// //   };

// //   return (
// //     <div className="p-4">
// //       <h2 className="text-xl font-bold mb-4">Slides</h2>

// //       {slides.length === 0 && <p>No slides available.</p>}

// //       <ul className="space-y-3">
// //         {slides.map((slide) => (
// //           <li
// //             key={slide._id}
// //             className="border p-3 rounded flex justify-between items-center"
// //           >
// //             <div>
// //               <p className="font-semibold">{slide.title}</p>
// //               <p className="text-sm text-gray-500">
// //                 Uploaded at: {new Date(slide.uploadedAt).toLocaleString()}
// //               </p>
// //             </div>

// //             <button
// //               onClick={() => downloadSlide(slide.fileUrl)}
// //               className="bg-blue-600 text-white px-4 py-1 rounded"
// //             >
// //               Download
// //             </button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

'use client';

import React from 'react';

interface Slide {
  _id: string;
  title: string;
  fileUrl: string;
  uploadedAt: string;
}

export default function StudentSlidesClient({ slides }: { slides: Slide[] }) {

  const downloadSlide = (fileUrl: string) => {
    const fullUrl = `http://localhost:5000${fileUrl}`;
    window.open(fullUrl, "_blank");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Slides</h2>

      {slides.length === 0 && <p>No slides available.</p>}

      <ul className="space-y-3">
        {slides.map((slide) => (
          <li
            key={slide._id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{slide.title}</p>
              <p className="text-sm text-gray-500">
                Uploaded at: {new Date(slide.uploadedAt).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => downloadSlide(slide.fileUrl)}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              view
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}



