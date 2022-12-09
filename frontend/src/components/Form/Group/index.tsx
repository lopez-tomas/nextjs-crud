interface Props {
  label: string;
  htmlFor: string;
  children: React.ReactNode | React.ReactNode[];
}

const FormGroup: React.FC<Props> = ({ label, htmlFor, children }) => {
  return (
    <div className='flex items-start py-4 border-b-[1px] border-b-slate-100'>
      <label className='w-1/4' htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  )
}

export default FormGroup
