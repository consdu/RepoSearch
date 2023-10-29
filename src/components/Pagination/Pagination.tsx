import PaginationButton from "../PaginationButton/PaginationButton";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  setNextPageActionCreator,
  setPreviousPageActionCreator,
} from "../../store/repositories/repositoriesSlice";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

interface PaginationProps {
  isLoading: boolean;
}

export default function Pagination({
  isLoading,
}: PaginationProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { currentPage, totalPages, searchTerm } = useAppSelector(
    (state) => state.repositoriesStore,
  );

  const handleButtonClick = (actionCreator: ActionCreatorWithoutPayload) => {
    dispatch(actionCreator());
    window.scrollTo(0, 0);
  };

  return (
    <section className="flex justify-between">
      {!isLoading && !searchTerm && (
        <>
          {currentPage > 1 && (
            <PaginationButton
              name="Previous"
              onButtonClick={() =>
                handleButtonClick(setPreviousPageActionCreator)
              }
            />
          )}
          {currentPage < totalPages && (
            <PaginationButton
              name="Next"
              onButtonClick={() => handleButtonClick(setNextPageActionCreator)}
              className="ml-auto"
            />
          )}
        </>
      )}
    </section>
  );
}
