import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useDispatch, useSelector } from 'react-redux';
import ButtonRound from 'components/common/buttons/ButtonRound';
import { getHf, loadMoreHf } from 'modules/product/thunk';
import HFCategory from './HFCategory';
import HFItem from './HFItem';

const HFLayoutContainer = styled.section`
  padding-bottom: 100px;
  h2 {
    margin: 60px 0 30px 0;
    font-size: 25px;
    font-weight: bold;
  }
  li {
    list-style: none;
    img {
      width: 100%;
    }
  }
  & > div > div {
  }
  position: relative;
  & > button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  @media ${({ theme }) => theme.mobile} {
    h2 {
      text-align: center;
    }
    & > button {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

export default function HFLayout() {
  const { getHfData, hasMore } = useSelector(state => state.product);
  const currentOffset = useRef(12);
  const [isDone, setIsDone] = useState(false);
  const [cateId, setCateId] = useState(0);
  const dispatch = useDispatch();
  const fetchMoreTrigger = useRef(null);

  const loadMore = () => {
    dispatch(loadMoreHf({ cateId, offset: currentOffset.current }));
    currentOffset.current += 12;
  };
  useEffect(() => {
    dispatch(getHf(cateId));
    currentOffset.current = 12;
  }, [dispatch, cateId]);

  useEffect(() => {
    const fetchMoreObserver = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting && !isDone) {
          dispatch(getHf(cateId));
          currentOffset.current = 12;
          setIsDone(true);
        }
      },
      { rootMargin: '1500px' }
    );
    if (fetchMoreTrigger.current) {
      fetchMoreObserver.observe(fetchMoreTrigger.current);
    }
    return () => {
      if (fetchMoreTrigger.current) {
        fetchMoreObserver.unobserve(fetchMoreTrigger.current);
      }
    };
  }, [dispatch, cateId, isDone, fetchMoreTrigger]);
  return (
    <>
      <div id="fetch_more__trigger" ref={fetchMoreTrigger} />
      <HFLayoutContainer>
        <h2>홈퍼니싱 아이디어 더 보기</h2>
        <HFCategory cateId={cateId} setCateId={setCateId} />
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 1, 800: 2, 1100: 3 }}
        >
          <Masonry gutter="20px">
            {getHfData && getHfData.map(v => <HFItem data={v} key={v.id} />)}
          </Masonry>
        </ResponsiveMasonry>
        {hasMore && <ButtonRound onClick={loadMore}>12개 더보기</ButtonRound>}
      </HFLayoutContainer>
    </>
  );
}
