import { Card, CardMedia } from "@mui/material";
import { styled } from "@mui/system";

export const ECard = styled(Card)`
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
  margin-bottom: 3px;
`;

export const ECardMedia = styled(CardMedia)`
  width: 150px;
  height: 150px;
  object-fit: fill;
`;
