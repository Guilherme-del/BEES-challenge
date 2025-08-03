import styled from "styled-components";

export const CompanyStyled = styled.div`
  width: 100%;
  max-width: 382px;
  min-height: 260px;
  padding: 1.5rem;
  border-radius: 4px;
  background-color: var(--white);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  color: var(--text-primary);

  .company__title {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    h2 {
      font-size: 1.125rem; /* 18px */
      font-weight: 700;
      margin: 0;
      color: var(--text-title);
      font-family: "Work Sans", sans-serif;
    }

    button {
      background: transparent;
      border: none;
      cursor: pointer;
      transition: opacity 0.2s ease;

      img {
        width: 1rem;
        height: 1rem;
      }

      &:hover {
        opacity: 0.7;
      }
    }
  }

  .company__address {
    margin: 0.75rem 0; /* 12px */
    font-size: 0.875rem; /* 14px */
    line-height: 1.4;
    color: var(--text-primary);
    font-family: "Work Sans", sans-serif;
  }

  .company__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .company__tag {
    display: inline-flex;
    align-items: center;
    background-color: var(--primary);
    padding: 0.375rem 0.75rem;
    border-radius: 999px;
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-family: "Work Sans", sans-serif;
    white-space: nowrap;

    .company__tag-icon {
      width: 1rem;
      height: 1rem;
      margin-right: 0.375rem;
    }
  }
`;
