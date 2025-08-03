import { ICompany } from "models/Companies";
import { CompanyStyled } from "./CompanyStyled";
import useStore from "stores/useStore";
import { handleNullData } from "utils/data";

interface ICompanyProps {
  company: ICompany;
  onAddFavorite?: (company: ICompany) => void;
  onRemoveFavorite?: (company: ICompany) => void;
  isFavorite?: boolean;
}

export const Company = ({
  company,
  onAddFavorite,
  onRemoveFavorite,
}: ICompanyProps) => {
  const { companies, setCompanies } = useStore();

  const handleDelete = () => {
    const updated = companies.filter((c: ICompany) => c.id !== company.id);
    setCompanies(updated);
  };

  return (
    <CompanyStyled data-testid={`company-card-${company.id}`}>
      <div className="company__title">
        <h2 data-testid="company-id">{company.name}</h2>
        {onRemoveFavorite ? (
          <button
            onClick={() => onRemoveFavorite(company)}
            aria-label="remove"
            data-testid={`company-remove-favorite-${company.id}`}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/trash.svg`}
              alt="Remove"
            />
          </button>
        ) : onAddFavorite ? (
          <button
            onClick={() => onAddFavorite(company)}
            aria-label="add"
            data-testid={`company-add-favorite-${company.id}`}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/plus.svg`}
              alt="Add"
            />
          </button>
        ) : (
          <button
            onClick={handleDelete}
            aria-label="delete"
            data-testid={`company-delete-${company.id}`}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/trash.svg`}
              alt="Delete"
            />
          </button>
        )}
      </div>

      <div className="company__address">
        <p data-testid="company-street">{company.street}</p>
        <p data-testid="company-address">
          {company.city}, {company.state} - {company.country}
        </p>
      </div>

      <div className="company__tags">
        {handleNullData(
          company?.brewery_type,
          <span className="company__tag">
            <img
              data-testid="company-brewery-type-icon"
              src={`${process.env.PUBLIC_URL}/images/chart.svg`}
              alt="Chart - Icon"
              className="company__tag-icon"
            />
            <span data-testid="company-brewery-type">{company?.brewery_type}</span>
          </span>
        )}
        {handleNullData(
          company?.postal_code,
          <span className="company__tag">
            <img
              data-testid="company-postal-code-icon"
              src={`${process.env.PUBLIC_URL}/images/pin.svg`}
              alt="Postal - Icon"
              className="company__tag-icon"
            />
            <span data-testid="company-postal-code">{company?.postal_code}</span>
          </span>
        )}
        {handleNullData(
          company?.phone,
          <span className="company__tag">
            <img
              data-testid="company-phone-icon"
              src={`${process.env.PUBLIC_URL}/images/phone.svg`}
              alt="Phone - Icon"
              className="company__tag-icon"
            />
            <span data-testid="company-phone">{company?.phone}</span>
          </span>
        )}
      </div>
    </CompanyStyled>
  );
};