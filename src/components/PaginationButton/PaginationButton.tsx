interface PaginationButtonProps {
  name: string;
  onButtonClick: () => void;
}

export default function PaginationButton({
  name,
  onButtonClick,
}: PaginationButtonProps): React.ReactElement {
  return (
    <button onClick={onButtonClick} className="button">
      {name}
    </button>
  );
}
