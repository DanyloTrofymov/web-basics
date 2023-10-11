import { FormControlLabel, TableCell, TableRow } from '@mui/material';
import styled from 'styled-components';
import { BREAKING_POINTS, COLORS, FONTS, SPACES, BORDERS, ANIMATIONS } from '../../../../theme';

export const StyledTableRow = styled(TableRow)`
  color: inherit;
  display: table-row;
  vertical-align: middle;
  outline: 0;
  border-spacing: 0;
  transform: scale(1);
  cursor: pointer;
  width: min-content;

  &:hover {
    background-color: ${COLORS.hoverBackground};
    transform: scale(1.01);
    transition: background-color ${ANIMATIONS.speed} ease;
    transition: transform ${ANIMATIONS.speed} ease;
  }
  @media (max-width: ${BREAKING_POINTS.tablet}) {
    display: flex;
    flex-direction: column;
    border-bottom: ${BORDERS.borderBottom};
    border-radius: ${BORDERS.tableBorderRadius};
    box-shadow: ${BORDERS.boxShadow};
    margin: ${SPACES.s};
    height: 50vh;
    top: ${SPACES.l};
    &:hover {
      border-radius: ${BORDERS.tableBorderRadius};
    }
  }
  @media (max-width: ${BREAKING_POINTS.mobile}) {
    min-height: auto;
    height: auto;
    max-height: 50vh;
  }
`;

export const StyledTableCell = styled(TableCell)`
  display: table-cell;
  vertical-align: inherit;
  border-bottom: ${BORDERS.borderBottom};
  text-align: left;
  padding: ${SPACES.m};
  font-weight: ${FONTS.WEIGHTS.normal};
  font-size: ${FONTS.SIZES.m};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:nth-child(1) {
    width: 20%;
    max-width: 10vw;
    font-weight: bold;
    font-size: ${FONTS.SIZES.l};
  }
  &:nth-child(2) {
    width: 40%;
    max-width: 20vw;
  }
  &:nth-child(3) {
    width: 40%;
    min-width: 20vw;
    text-align: right;
  }
  @media (max-width: ${BREAKING_POINTS.tablet}) {
    padding: ${SPACES.s};
    width: 100%;
    border: 0px;
    width: 80vw;
    white-space: normal;
    word-wrap: break-word;
    max-width: 80vw;
    &:nth-child(1) {
      width: 80vw;
      max-width: 80vw;
      border-radius: ${BORDERS.tableBorderRadius};
      background-color: ${COLORS.tableHead};
    }
    &:nth-child(2) {
      width: 80vw;
      max-width: 80vw;
    }

    &:nth-child(3) {
      width: 80vw;
      max-width: 80vw;
      text-align: right;
      bottom: 0px;
      position: absolute;
      justify-content: right;
    }
  }
  @media (max-width: ${BREAKING_POINTS.mobile}) {
    white-space: normal;
    word-wrap: break-word;
    &:nth-child(1) {
      width: 80vw;
      font-weight: bold;
      font-size: ${FONTS.SIZES.l};
    }
    &:nth-child(2) {
      width: 80vw;
    }
    &:nth-child(3) {
      width: 80vw;
      position: relative;
      text-align: right;
    }
  }
`;

export const StyledFormControlLabel = styled(FormControlLabel)``;
