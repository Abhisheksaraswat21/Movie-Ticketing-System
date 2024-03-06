import { createFeatureSelector, createSelector } from '@ngrx/store';

const getcounterstate = createFeatureSelector<any>('counter');

export const getcounter = createSelector(getcounterstate, (state) => {
  return state.counter;
});

export const getchannelname = createSelector(getcounterstate, (state) => {
  return state.channelname;
});
export const getAll = createSelector(getcounterstate, (state) => {
  return state;
});
