import React, { useState } from 'react';
import { TrainingSortDirection, StatisticSorting } from '@fit-friends/shared';
import { setSortStatisticAction, setDirectionAction } from '../../../store/trainings/trainings-slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ButtonSortDirection } from '../button-sort-direction/button-sort-direction';
import * as trainingsSelector from '../../../store/trainings/trainings-select';
import { LoadStatus } from '../../../constants/common';

type Sort = {
  sorting: StatisticSorting;
  direct: TrainingSortDirection;
};

interface ButtonsSortingProps {
  sorting: StatisticSorting;
  direction: TrainingSortDirection;
}

export const ButtonsSorting: React.FC<ButtonsSortingProps> = (props) => {
  const { sorting, direction } = props;
  const dispatch = useAppDispatch();
  const loadStatus = useAppSelector(trainingsSelector.loadStatus);
  const [countSorting, setCountSorting] = useState<Sort>({ sorting: StatisticSorting.OrderCount, direct: direction });
  const [summSorting, setSummSorting] = useState<Sort>({ sorting: StatisticSorting.OrderSumm, direct: direction });
  const isLoading = loadStatus === LoadStatus.Loading;

  const reversDirection = (value: TrainingSortDirection) => {
    return value === TrainingSortDirection.Desc 
      ? TrainingSortDirection.Asc 
      : TrainingSortDirection.Desc;
  };

  const handleSortingSumm = () => {
    if (summSorting.sorting === sorting) {
      const direct = reversDirection(summSorting.direct);
      setSummSorting({ sorting, direct });
      dispatch(setDirectionAction(direct));
    } else {
      setSummSorting({ sorting: StatisticSorting.OrderSumm, direct: summSorting.direct });
      dispatch(setSortStatisticAction(StatisticSorting.OrderSumm));
      dispatch(setDirectionAction(summSorting.direct));
    }
  };

  const handleSortingCount = () => {
    if (countSorting.sorting === sorting) {
      const direct = reversDirection(countSorting.direct);
      setCountSorting({ sorting, direct });
      dispatch(setDirectionAction(direct));
    } else {
      setCountSorting({ sorting: StatisticSorting.OrderCount, direct: countSorting.direct });
      dispatch(setSortStatisticAction(StatisticSorting.OrderCount));
      dispatch(setDirectionAction(countSorting.direct));
    }
  };

  return (
    <div className="sort-for">
      <p>Сортировать по:</p>
      <div className="sort-for__btn-container">
        <ButtonSortDirection 
          text='Сумме' 
          direction={summSorting.direct} 
          active={sorting === StatisticSorting.OrderSumm} 
          onClick={handleSortingSumm} 
          disabled={isLoading} 
        />
        <ButtonSortDirection 
          text='Количеству' 
          direction={countSorting.direct} 
          active={sorting === StatisticSorting.OrderCount} 
          onClick={handleSortingCount} 
          disabled={isLoading} 
        />
      </div>
    </div>
  );
};
