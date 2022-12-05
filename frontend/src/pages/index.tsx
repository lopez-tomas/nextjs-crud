import Head from 'next/head'

export default function Home() {
  return (
    <>
      <div className='w-full p-4 bg-gray-200'>
        <h1 className='text-md text-gray-700'>
          {'>'} <span className='text-2xl'>admin@admin</span>
        </h1>
      </div>
    </>
  )
}
