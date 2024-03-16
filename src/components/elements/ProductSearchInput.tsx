import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../constants/paths";
import { urlParams } from "../../constants/urlParams";

type Props = {
  className?: string;
};

export function ProductSearchInput({ className }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get(urlParams.search) || ""
  );
  const location = useLocation();
  const navigate = useNavigate();

  function onSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInputValue(value);

    if (location.pathname !== paths.PRODUCTS) {
      navigate(paths.PRODUCTS);
    }

    setSearchParams((params) => {
      params.set(urlParams.search, value);
      return params;
    });
  }

  return (
    <Input
      type="text"
      placeholder="Search for products..."
      value={inputValue}
      onChange={onSearchInputChange}
      className={className}
    ></Input>
  );
}

export const Input = styled.input`
  padding: 1rem;
  border-radius: ${theme.borderRadius.md};
  border: none;
  outline: none;
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text};
  background-color: ${theme.colors.accent};

  &:focus-within {
    ${theme.boxShadow}
  }
`;
