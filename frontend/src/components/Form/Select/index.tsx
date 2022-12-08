interface Props {
  name: string;
  value: string | number;
  required?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

const Select: React.FC<Props> = ({ name, value, required, children }) => {
  return (
    <select
      className='
        w-full
        py-1
        px-1
        border-[1px]
        rounded-sm
        outline-0
        focus:border-primary-color
        focus:shadow-input
      '
      id={name} name={name} defaultValue={value} required={required}
    >
      {children}
    </select>
  )
}

export default Select
