import { createContext, useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

export const CategoriesContext = createContext({
	categoriesMap: {},
});

const COLLECTIONS_QUERY = gql`
	query GetCollections {
		collections {
			id
			title
			items {
				id
				name
				price
				imageUrl
			}
		}
	}
`;

export const CategoriesProvider = ({ children }) => {
	const { loading, error, data } = useQuery(COLLECTIONS_QUERY);
	const [categoriesMap, setCategoriesMap] = useState({});

	useEffect(() => {
		if (data) {
			const collections = data.collections;
			const newCategoriesMap = collections.reduce((acc, collection) => {
				const { title, items } = collection;
				acc[title.toLowerCase()] = items;
				return acc;
			}, {});
			setCategoriesMap(newCategoriesMap);
		} else if (error) {
			console.log(error);
		}
	}, [data]);

	console.log({ loading });
	console.log({ categoriesMap });

	const value = { categoriesMap, loading };
	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
