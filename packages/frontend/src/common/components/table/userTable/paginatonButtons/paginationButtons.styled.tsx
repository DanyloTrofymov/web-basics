import { Box, Button, TableCell, TableRow } from '@mui/material';
import styled from 'styled-components';
import { COLORS, FONTS, SPACES, BORDERS, BREAKING_POINTS } from '../../../../../theme';

export const StyledArrow = styled(Button)`
  display: block;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${FONTS.SIZES.m};
  font-weight: ${FONTS.WEIGHTS.bold};
  box-sizing: border-box;
  border-radius: 4px;
  transition: background-color ${BORDERS.transition}, box-shadow ${BORDERS.transition},
    border-color ${BORDERS.transition}, color ${BORDERS.transition};
  border: 1px solid ${COLORS.buttonAcceptBorder};
  color: ${COLORS.buttonAccept};
  margin-top: ${SPACES.s};
  margin-bottom: ${SPACES.s};
  background-color: ${COLORS.white};
  @media (max-width: ${BREAKING_POINTS.mobile}) {
    display: none;
  }
  @media (min-width: ${BREAKING_POINTS.tablet}) {
    display: none;
  }
`;
export const StyledRightArrow = styled(StyledArrow)`
  margin-left: auto;
`;

export const StyledLeftArrow = styled(StyledArrow)`
  rotate: 180deg;
  margin-right: auto;
`;

export const StyledButtonContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: ${SPACES.s};
  margin-right: ${SPACES.s};
`;
export const StyledPCButton = styled(Button)`
  border: 1px solid ${COLORS.buttonAcceptBorder};
  margin: ${SPACES.s};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: ${SPACES.s};
  margin-right: ${SPACES.s};
  @media (max-width: ${BREAKING_POINTS.tablet}) {
    display: none;
  }
`;
export const StyledMobileButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: ${SPACES.s};
  margin-right: ${SPACES.s};
  @media (min-width: ${BREAKING_POINTS.mobile}) {
    display: none;
  }
`;

export const StyledTableButtonsCell = styled(TableCell)`
  width: 100%;
  @media (min-width: ${BREAKING_POINTS.mobile}) {
    display: none;
  }
`;

export const StyledTableButtonsRow = styled(TableRow)`
  @media (min-width: ${BREAKING_POINTS.mobile}) {
    display: none;
  }
`;
