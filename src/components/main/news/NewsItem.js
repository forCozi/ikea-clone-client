import React from 'react';
import styled from 'styled-components';
import ButtonRound from 'components/common/buttons/ButtonRound';

const ItemBox = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: auto;
    margin-bottom: 32px;
    cursor: pointer;
  }
  @media ${({ theme }) => theme.mobile} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default function NewsItem({ data }) {
  return (
    <ItemBox>
      <a href={data.src}>
        <img src={data.imgSrc} alt={data.name} />
      </a>
      <a href={data.src}>
        <ButtonRound>{data.name}</ButtonRound>
      </a>
    </ItemBox>
  );
}
