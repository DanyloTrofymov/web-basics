import { Box, TableContainer } from '@mui/material';
import { ErrorMessage } from 'formik';
import styled from 'styled-components';
import { COLORS, FONTS, SPACES, BORDERS, BREAKING_POINTS } from '../../../theme';

export const StyledFormContainer = styled(TableContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledErrorMesssage = styled(ErrorMessage)`
  color: ${COLORS.cancelButton};
  font-size: ${FONTS.SIZES.s};
`;

export const StyledInputContainer = styled(Box)`
  & > input {
    max-width: 70vw;
    width: 30vw;
    min-width: 30vw;
    padding: ${SPACES.s};
    margin: ${SPACES.s};
    border: ${BORDERS.borderBottom};
    border-radius: ${BORDERS.modalRadius};
    &:focus {
      outline: none;
      border: 1px solid ${COLORS.black};
    }
  }
  & > textarea {
    max-width: 70vw;
    width: 30vw;
    min-width: 30vw;
    height: 30vh;
    padding: ${SPACES.s};
    margin: ${SPACES.s};
    border: ${BORDERS.borderBottom};
    border-radius: ${BORDERS.modalRadius};
    resize: none;
    &:focus {
      outline: none;
      border: 1px solid ${COLORS.black};
    }
  }
  @media (max-width: ${BREAKING_POINTS.tablet}) {
    & > input {
      min-width: 30vw;
      width: 40vw;
      max-width: 90vw;
    }
    & > textarea {
      min-width: 30vw;
      width: 60vw;
      max-width: 90vw;
    }
  }
  @media (max-width: ${BREAKING_POINTS.mobile}) {
    & > input {
      min-width: 30vw;
      width: 70vw;
      max-width: 90vw;
    }
    & > textarea {
      min-width: 10vw;
      width: 40vw;
      max-width: 90vw;
    }
  }
`;
