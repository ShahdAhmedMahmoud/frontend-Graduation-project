import React from 'react'

export default async function CourseDetails({params}) {
    let {_id} = await params;
    console.log(_id);
  return (
    <div>
      CourseDetails
    </div>
  )
}
