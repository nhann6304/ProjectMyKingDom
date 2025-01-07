"use client";

import styled from "styled-components";
const AnnouncementsContainerStyled = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: var(--border-radius);

  .box-title {
    display: flex;

    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-size: 1.6rem;
      font-weight: 600;
    }
    span {
      font-size: 1.2rem;
      color: var(--color-gray-400);
    }
  }

  .box-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    .box-info {
      background-color: var(--color-pink-200);
      border-radius: var(--border-radius);
      padding: 1rem;

      .info-content-top {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h2 {
          font-size: 1.6rem;
          font-weight: 600;
        }

        span {
          font-size: 1rem;
          color: var(--color-gray-500);
          background-color: white;
          font-weight: 600;
          border-radius: var(--border-radius);
          padding: 5px;
        }
      }
      .box-content-description {
        font-size: 1.2rem;
        margin-top: 1rem;
        color: var(--color-gray-400);
      }
    }
  }
`;
export default function Announcements() {
  return (
    <AnnouncementsContainerStyled>
      <div className="box-title">
        <h1>Announcements</h1>
        <span>View All</span>
      </div>

      <div className="box-content">
        <div className="box-info">
          <div className="info-content-top">
            <h2>Lorem ipsum dolor sit amet</h2>
            <span>2025-01-01</span>
          </div>
          <p className="box-content-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla
            dolorum quaerat error hic nisi, dolorum quaerat error hic nisi
          </p>
        </div>
      </div>

      <div className="box-content">
        <div className="box-info">
          <div className="info-content-top">
            <h2>Lorem ipsum dolor sit amet</h2>
            <span>2025-01-01</span>
          </div>
          <p className="box-content-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla
            dolorum quaerat error hic nisi, dolorum quaerat error hic nisi
          </p>
        </div>
      </div>

      <div className="box-content">
        <div className="box-info">
          <div className="info-content-top">
            <h2>Lorem ipsum dolor sit amet</h2>
            <span>2025-01-01</span>
          </div>
          <p className="box-content-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla
            dolorum quaerat error hic nisi, dolorum quaerat error hic nisi
          </p>
        </div>
      </div>
    </AnnouncementsContainerStyled>
  );
}
