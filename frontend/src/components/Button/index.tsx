interface Props {
  styles?: string;
  text: string;
  submit?: boolean;
  primary?: boolean;
  secondary?: boolean;
  cancel?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<Props> = ({ styles, text, submit, primary, secondary, cancel,  onClick, children }) => {
  return (
    <button
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
      className={`
        flex
        items-center
        p-2
        text-white-color
        rounded-md
        ${styles}
        ${primary ? 'bg-primary-color hover:bg-tertiary-color' : ''}
        ${secondary ? 'bg-blue-color hover:bg-blue-2-color' : ''}
        ${cancel ? 'bg-red-color hover:bg-red-2-color' : ''}
      `
      }
    >
      {children} {text}
    </button>
  )
}

export default Button
