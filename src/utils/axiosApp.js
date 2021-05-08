import axios from 'axios';

export default axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_ORIGIN_ADDRESS || 'http://localhost:5000'}/`,
	withCredentials: true
});
