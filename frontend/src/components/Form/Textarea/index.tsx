interface Props {
  name: string;
  cols: number;
  rows: number;
  value: string | number;
  required?: boolean;
}

const Textarea: React.FC<Props> = ({ name, cols, rows, value, required }) => {
  return (
    <textarea
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
      id={name}
      name={name}
      cols={cols}
      rows={rows}
      defaultValue={value}
      required={required}
    />
  )
}

export default Textarea
