import { Box, Table, TableBody, TableContainer, TableCell } from '@mui/material';
import styled from 'styled-components';
import { COLORS, FONTS, SPACES, BORDERS, BREAKING_POINTS, ANIMATIONS } from '../../../../theme';

export const StyledTable = styled(Table)`
  display: table;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  max-height: 70vh;
  overflow-x: hidden;
  @media (max-width: ${BREAKING_POINTS.mobile}) {
    flex-direction: column;
    right: 10vh;
  }
`;
export const StyledTableHeadCell = styled(TableCell)`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: ${FONTS.WEIGHTS.bold};
  font-size: ${FONTS.SIZES.m};
  line-height: 1.5;
  display: table-cell;
  position: sticky;
  top: 0;
  border-bottom: ${BORDERS.borderBottom};
  text-align: center;
  padding: ${SPACES.m};
  color: ${COLORS.black};
  background-color: ${COLORS.tableHead};
  z-index: 2;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.hoverBackgroundHead};
    transform: scale(1.01);
    transition: background-color ${ANIMATIONS.speed} ease;
    transition: transform ${ANIMATIONS.speed} ease;
  }
  @media (max-width: ${BREAKING_POINTS.tablet}) {
    display: none;
  }
`;

export const StyledTableBody = styled(TableBody)`
  display: table-row-group;
  background-color: ${COLORS.hoverBackground};
  @media (max-width: ${BREAKING_POINTS.tablet}) {
    padding: 0px;
    margin: 0px;
    outline: 0px;
    border: 0px;
    padding-right: 5rem;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
  }
  @media (max-width: ${BREAKING_POINTS.mobile}) {
    min-height: 20vh;
    height: 60vh;
    flex-direction: column;
  }
`;

export const StyledTableContainer = styled(TableContainer)`
  background-color: ${COLORS.white};
  -webkit-transition: ${BORDERS.transition};
  transition: ${BORDERS.transition};
  border-radius: 4px;
  box-shadow: ${BORDERS.boxShadow};
  width: 100%;
  max-height: 70vh;
  overflow-x: hidden;
  @media (max-width: ${BREAKING_POINTS.tablet}) {
    padding: 0px;
    width: 100vw;
    border: 0px;
    box-shadow: none;
    overflow-x: hidden;
  }
`;

export const StyledBox = styled(Box)`
  padding: ${SPACES.l};
  margin: 0;
  background-color: ${COLORS.hoverBackground};
  border-bottom: ${BORDERS.borderBottom};
  border-radius: ${BORDERS.tableBorderRadius};
  box-shadow: ${BORDERS.boxShadow};
  align-items: center;
  height: min-content;
  @media (max-width: ${BREAKING_POINTS.tablet}) {
    padding: ${SPACES.s};
    margin: ${SPACES.s};
    overflow-x: hidden;
  }
  @media (max-width: ${BREAKING_POINTS.mobile}) {
    padding: auto;
    margin: auto;
  }
`;
