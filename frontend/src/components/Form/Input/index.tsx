interface Props {
  name: string;
  type: string;
  value: string | number;
  required?: boolean;
  disabled?: boolean;
}

const Input: React.FC<Props> = ({ name, type, value, required, disabled }) => {
  return (
    <input
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
      id={name} type={type} name={name} defaultValue={value} required={required} disabled={disabled}
    />
  )
}

export default Input
