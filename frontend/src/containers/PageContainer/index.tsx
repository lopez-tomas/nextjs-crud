import React from 'react'

interface Props {
  pretitle: string;
  title: string;
  children?: React.ReactNode | React.ReactNode[];
}

const PageContainer: React.FC<Props> = ({ pretitle, title, children }) => {
  return (
    <>
      <div className='h-90vh w-full overflow-y-auto p-4 bg-gray-200'>
        <h1 className='text-md text-gray-700'>
          {pretitle} <span className='text-2xl'>{title}</span>
        </h1>

        {children}
      </div>
    </>
  )
}

export default PageContainer
