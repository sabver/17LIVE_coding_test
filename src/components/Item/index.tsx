import { User } from "../../types/index";
import styled from "styled-components";
import Avatar from "../Avatar/index";
import Score from "../Score/index";
import { TextStyle } from "../../styles/index";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  gap: 16px;
  padding: 12px 0;
`;

const MainInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  flex-grow: 1;

  gap: 8px;
`;

const NameTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  max-width: 160px;
`;

export const ItemAbsContainer = styled.div`
  position: absolute;
  box-sizing: border-box;

  width: 100%;
  padding-left: 16px;
  padding-right: 16px;

  transition: all 0.4s ease;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Item = ({ user, index }: { user: User; index: number }) => {
  return (
    <>
      <Container>
        <MainInfo>
          <TextStyle>{index}</TextStyle>
          <Avatar src={user.picture} width={36} height={36}></Avatar>
          <NameTextContainer>
            <TextStyle>{user.displayName}</TextStyle>
          </NameTextContainer>
        </MainInfo>
        <Score oldScore={user.oldScore} newScore={user.score}></Score>
      </Container>
    </>
  );
};

export default Item;
