import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import ButtonRound from 'components/common/buttons/ButtonRound';
import Error from 'components/common/Error';
import ListFilter from './ListFilter';
import ListItem from './ListItem';

const ListBottom = styled.div`
  position: relative;
  button {
    top: 10%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
  }
`;
const ListContainer = styled.ul`
  display: grid;
  row-gap: 1.2em;
  @media ${({ theme }) => theme.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${({ theme }) => theme.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${({ theme }) => theme.mobile} {
    grid-template-columns: repeat(1, 1fr);
    row-gap: 0;
  }
`;

const ListWrapper = styled.div`
  position: relative;
  & > h1 {
    font-size: 1.563rem;
    font-weight: bold;
    margin: 30px 0;
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 90px;
    position: sticky;
    z-index: 99;
    top: 0;
    background: #fff;
    & > ul {
      display: flex;
      flex-shrink: 0;
      li {
        margin-right: 10px;
      }
    }
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.75rem;
      flex-shrink: 0;
      span,
      b {
        display: inline-block;
        padding: 1em;
      }
      b:nth-child(2) {
        text-decoration: underline;
      }
      b {
        font-weight: bold;
        cursor: pointer;
      }
    }
  }

  @media ${({ theme }) => theme.mobile} {
    & > div {
      flex-wrap: wrap;
      ul {
        flex-shrink: 0;
      }
      div {
        flex-shrink: 0;
      }
    }
  }
  ${props =>
    props.active &&
    css`
      div {
        div {
          b:nth-child(3) {
            text-decoration: underline;
          }
          b:nth-child(2) {
            text-decoration: none;
          }
        }
      }
    `}
`;
function List({
  title,
  data,
  currentFilter,
  setCurrentFilter,
  onLoadMore,
  hasMoreList,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [listState, setListState] = useState(0);
  const { userInfo } = useSelector(state => state.user);

  return (
    <>
      <ListWrapper active={listState === 1}>
        <h1>{title}</h1>
        <div>
          <ul>
            <li>
              <ButtonRound>전체 상품</ButtonRound>
            </li>
            <li>
              <ButtonRound gray onClick={() => setFilterOpen(true)}>
                정렬
              </ButtonRound>
            </li>
          </ul>
          <div>
            <span>{`${data && data.length}개`}</span>
            <b onClick={() => setListState(0)}>제품</b>
            <b onClick={() => setListState(1)}>디지털 쇼룸</b>
          </div>
        </div>
        <ListContainer>
          {data ? (
            data.length === 0 ? (
              <Error text="카테고리에 해당하는 아이템이 없습니다" grid />
            ) : (
              data.map(item => (
                <ListItem
                  listState={listState}
                  data={item}
                  key={item.id}
                  userInfo={userInfo}
                />
              ))
            )
          ) : null}
        </ListContainer>
      </ListWrapper>
      <ListBottom>
        {hasMoreList ? (
          data.length !== 0 ? (
            <ButtonRound onClick={onLoadMore}>더보기</ButtonRound>
          ) : null
        ) : null}
      </ListBottom>
      {filterOpen && (
        <ListFilter
          setFilterOpen={setFilterOpen}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
      )}
    </>
  );
}
export default List;
