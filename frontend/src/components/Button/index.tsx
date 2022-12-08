interface Props {
  styles?: string;
  text: string;
  primary?: boolean;
  secondary?: boolean;
  cancel?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<Props> = ({ styles, text, primary, secondary, cancel, children }) => {
  return (
    <button
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
