import React from 'react';
import styled, { css } from 'styled-components';

const ReceiptBox = styled.div`
  width: 100%;
  padding: 25px 0;
  h2 {
    font-size: 16px;
    font-weight: 600;
  }
  ul {
    li {
      display: flex;
      justify-content: space-between;
      margin-top: 25px;
      p {
        font-size: 14px;
      }
      span {
        font-size: 13px;
      }
    }
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
  }
  ${props =>
    props.top
      ? css`
          border-bottom: 2px solid #111;
        `
      : css`
          display: flex;
          justify-content: space-between;
        `};
`;
const WishReceiptContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export default function WishReceipt({ wishItems }) {
  let totalCost = 0;
  (() => {
    if (wishItems) {
      wishItems.forEach(v => {
        totalCost += v.slCost;
      });
    }
  })();
  return (
    <WishReceiptContainer>
      <ReceiptBox top>
        <h2>위시리스트 요약</h2>
        <ul>
          <li>
            <p>부가세 제외</p>
            <span>{`₩ ${(totalCost * 0.9).toLocaleString()}`}</span>
          </li>
          <li>
            <p>부가세</p>
            <span>{`₩ ${(totalCost / 10).toLocaleString()}`}</span>
          </li>
        </ul>
      </ReceiptBox>
      <ReceiptBox>
        <h2>가격</h2>
        <h3>{`₩ ${totalCost.toLocaleString()}`}</h3>
      </ReceiptBox>
    </WishReceiptContainer>
  );
}
