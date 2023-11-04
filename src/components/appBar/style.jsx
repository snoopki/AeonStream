import { AppBar, Avatar, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";

export const EButton = styled(Button)`
  font-weight: bold;
`;
export const ESearchButton = styled(Button)`
  font-weight: bold;
  margin-top: 10px;
`;

export const EAppBar = styled(AppBar)`
  background: transparent;
  box-shadow: none;
`;

export const EAvatar = styled(Avatar)`
  cursor: pointer;
  width: 52;
  height: 52;
  overflow: hidden;
`;

export const ETextField = styled(TextField)`
  margin-right: 10px;
`;
