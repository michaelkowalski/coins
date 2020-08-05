import {useDispatch} from 'react-redux';

export const useRematchDispatch = (selector: any) => {
  const dispatch = useDispatch();
  return selector(dispatch);
};
