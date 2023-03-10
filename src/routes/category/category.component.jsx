import { gql, useQuery } from '@apollo/client';
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import { CategoryContainer, Title } from './category.styles';

const GET_CATEGORY = gql`
	query GetCategory($title: String!) {
		getCollectionsByTitle(title: $title) {
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

const Category = () => {
	const { category } = useParams();
	console.log({ category });

	const { loading, error, data } = useQuery(GET_CATEGORY, {
		variables: { title: category },
	});

	const [products, setProducts] = useState([]);

	useEffect(() => {
		if (data) {
			const {
				getCollectionsByTitle: { items },
			} = data;
			setProducts(items);
		}
	}, [category, data]);

	console.log({ products, loading, error, data });

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Title>{category.toUpperCase()}</Title>
					<CategoryContainer>
						{products &&
							products.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
					</CategoryContainer>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Category;
