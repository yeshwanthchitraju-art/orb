import React from 'react'

const Video = () => {
  return (
    <div>
        <video src="/video1.mp4" autoPlay loop height={400} className='object-cover !h-[400px]'></video>
    </div>
  )
}

export default Video