const { createSelector } = require('reselect');

const selectDirectory = (state) => state.directory;

export const selectDirectorySection = createSelector(
  [selectDirectory],
  (directory) => directory.sections
);
