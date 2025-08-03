import { useEffect, useState } from "react";
import { searchCompaniesByName } from "services/api";
import { Company } from "components/Company";
import { Loader } from "components/shared/Loader";
import { Error } from "components/shared/Error";
import { ICompany } from "models/Companies";
import useStore from "stores/useStore";
import { Navbar } from "components/Navbar";
import { ContainerStyled } from "styles/Container/ContainerStyles";
import { CompaniesStyled } from "./CompaniesStyled";

const RESULTS_PER_PAGE = 10;

export const Companies = () => {
	const { favorites, setFavorites, isLoading, setIsLoading } = useStore();

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<ICompany[]>([]);
	const [anErrorOccurred, setAnErrorOccurred] = useState(false);
	const [page, setPage] = useState(1);
	const [hasMoreResults, setHasMoreResults] = useState(false);

	const handleAddFavorite = (company: ICompany) => {
		const alreadyInFavorites = favorites.some((fav: ICompany) => fav.id === company.id);
		if (!alreadyInFavorites) {
			setFavorites([...favorites, company]);
		}
	};

	const handleRemoveFavorite = (company: ICompany) => {
		const filtered = favorites.filter((fav: ICompany) => fav.id !== company.id);
		setFavorites(filtered);
	};

	const handleSearch = async (isNewSearch = true) => {
		if (!searchTerm.trim()) return;

		const currentPage = isNewSearch ? 1 : page;

		try {
			setIsLoading(true);
			setAnErrorOccurred(false);

			const { data } = await searchCompaniesByName(searchTerm.trim(), currentPage, RESULTS_PER_PAGE);

			if (isNewSearch) {
				setSearchResults(data);
				setPage(2);
			} else {
				setSearchResults(prev => [...prev, ...data]);
				setPage(prev => prev + 1);
			}

			setHasMoreResults(data.length === RESULTS_PER_PAGE); // se retornou menos, não há mais
		} catch (err) {
			setAnErrorOccurred(true);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setSearchResults([]);
		setPage(1);
		setHasMoreResults(false);
	}, [searchTerm]);

	return (
		<>
			<Navbar />
			<ContainerStyled>
				<CompaniesStyled>
					<h2 className="companies__section-title">Your favorite breweries</h2>
					<div className="companies__favorites">
						{favorites.length > 0 ? (
							favorites.map((company: ICompany) => (
								<Company key={company.id} company={company} onRemoveFavorite={handleRemoveFavorite} />
							))
						) : (
							<p className="companies__empty-message">You don’t have any favorite brewery :(</p>
						)}
					</div>

					<hr />

					<div className="companies__search-header">
						<h2 className="companies__section-title">Add a new brewery</h2>
						<div className="companies__search-wrapper">
							<input
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								onKeyDown={e => {
									if (e.key === "Enter") handleSearch(true);
								}}
								placeholder="Find for your new favorite brewery"
							/>
							<button onClick={() => handleSearch(true)} disabled={!searchTerm.trim()}>
								Search
							</button>
						</div>
					</div>

					{anErrorOccurred ? (
						<Error />
					) : isLoading && searchResults.length === 0 ? (
						<Loader />
					) : searchResults.length > 0 ? (
						<>
							<div className="companies__search-results">
								{searchResults.map(company => (
									<Company
										key={company.id}
										company={company}
										onAddFavorite={handleAddFavorite}
										isFavorite={favorites.some((fav: ICompany) => fav.id === company.id)}
									/>
								))}
							</div>
							{hasMoreResults && (
								<div className="companies__load-more">
									<button onClick={() => handleSearch(false)} disabled={isLoading}>
										{isLoading ? "Loading..." : "Load More"}
									</button>
								</div>
							)}
						</>
					) : (
						<p className="companies__search-empty">Search for a brewery to see the results</p>
					)}
				</CompaniesStyled>
			</ContainerStyled>
		</>
	);
};
