import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Product from '../components/Product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

export const HomeScreen = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false)
	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get('api/products');
				setLoading(false);
				setProducts(data);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		}
		fetchData();
	}, [])

	return (
		<div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox>{error}</MessageBox>
			) : (
				<div className="row center">
					{
						products.map((product) => (
							<Product product={product} key={product._id} />
						))
					}
				</div>
			)}
		</div>
	)
}
