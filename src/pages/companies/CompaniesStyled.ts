import styled from "styled-components";

export const CompaniesStyled = styled.section`
  padding: 2rem;

  .companies__section-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: var(--text-title);
  }

  .companies__favorites {
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .companies__empty-message {
    font-style: italic;
    color: var(--text-primary);
    text-align: center;
    font-size: 1rem;
  }

  hr {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid var(--input-border);
  }

  .companies__search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;

    .companies__section-title {
      margin: 0;
      color: var(--text-title);
    }
  }

  .companies__search-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
      padding: 0.6rem 1rem;
      font-size: 0.9rem;
      border: 1px solid var(--input-border);
      border-radius: 4px;
      width: 280px;
      max-width: 100%;
      color: var(--text-primary);
    }

    button {
      padding: 0.6rem 1rem;
      font-size: 0.9rem;
      font-weight: bold;
      background-color: var(--button-enabled);
      color: var(--primary);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover:enabled {
        background-color: var(--text-title);
      }

      &:disabled {
        background-color: var(--button-disabled);
        cursor: not-allowed;
        opacity: 0.6;
      }
    }
  }

  .companies__search-results {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    justify-content: center;
  }

  .companies__search-empty {
    margin-top: 2rem;
    text-align: center;
    font-size: 1rem;
    color: var(--text-primary);
  }

  .companies__load-more {
    text-align: center;
    margin-top: 1rem;

    button {
      padding: 0.5rem 1rem;
      font-weight: bold;
      cursor: pointer;
      background-color: var(--button-enabled);
      color: var(--primary);
      border: none;
      border-radius: 4px;
      transition: background-color 0.2s ease;

      &:hover:enabled {
        background-color: var(--text-title);
      }

      &:disabled {
        background-color: var(--button-disabled);
        cursor: not-allowed;
        opacity: 0.6;
      }
    }
  }
`;
