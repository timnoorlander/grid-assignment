import styled from "styled-components";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { GenericError } from "../components/layout/GenericError";
import { theme } from "../styles/theme";
import { ContentSection } from "../components/layout/ContentSection";
import { useProducts } from "../hooks/useProducts";
import usePaginate from "../hooks/usePaginate";
import { urlParams } from "../constants/urlParams";

const SEARCH_INPUT_DEBOUNCE_MS = 1000;
const PRODUCTS_PER_PAGE = 6;

export function Products() {
  const [searchParams] = useSearchParams();

  const searchTerm =
    useDebounce(searchParams.get(urlParams.search), SEARCH_INPUT_DEBOUNCE_MS) ||
    undefined;

  const { products, isError, isLoading, hasNextPage, loadNextPage } =
    useProducts({
      pageLimit: PRODUCTS_PER_PAGE,
      searchTerm,
    });

  const { sentinelRef, pageNumber } = usePaginate({
    isDisabled: isLoading || !hasNextPage,
  });

  useEffect(() => {
    if (pageNumber <= 1) {
      return;
    }

    loadNextPage();
  }, [pageNumber]);

  if (isError) {
    return <GenericError />;
  }

  return (
    <ContentSection>
      <h2>Products</h2>

      {!!products.length && (
        <TileContainer data-testid="products-container">
          {products?.map((product) => (
            <Tile key={product.id} data-testid="product">
              <TileImage
                src={product.imagePath}
                alt={"Neon lights that form the words " + product.title}
              ></TileImage>
              <TileTitle>{product.title}</TileTitle>
              <TileSubTitle>{product.description}</TileSubTitle>
            </Tile>
          ))}
        </TileContainer>
      )}

      {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}

      {!isLoading && !products.length && <p>No results found</p>}

      <div ref={sentinelRef} />
    </ContentSection>
  );
}

const TileContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  align-content: space-between;
  gap: 1rem;

  @media (max-width: ${theme.breakpoints.xs}) {
    flex-direction: column;
  }
`;
const Tile = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 auto;
`;

const TileImage = styled.img`
  margin-bottom: 1rem;
  object-fit: cover;
  width: 300px;
`;

const TileTitle = styled.span`
  font-weight: bold;
`;

const TileSubTitle = styled.span`
  font-style: italic;
`;

const LoadingIndicator = styled.p`
  text-align: center;
`;
