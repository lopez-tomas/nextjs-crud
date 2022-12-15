interface Props {
  onClick?: () => void;
  margin?: boolean;
  styles?: string;
  children: React.ReactElement;
}

const IconButton = ({ onClick, margin, styles, children }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${margin ? 'mr-1' : ''}
        p-2
        border-[1px]
        rounded-md
        ${styles}
      `}
    >
      {children}
    </button>
  )
}

export default IconButton
