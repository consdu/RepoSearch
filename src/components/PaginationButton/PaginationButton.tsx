interface PaginationButtonProps {
  name: string;
  onButtonClick: () => void;
  className?: string;
}

export default function PaginationButton({
  name,
  className,
  onButtonClick,
}: PaginationButtonProps): React.ReactElement {
  let classes = "button";

  if (className) {
    classes += ` ${className}`;
  }

  return (
    <button onClick={onButtonClick} className={classes}>
      {name}
    </button>
  );
}
