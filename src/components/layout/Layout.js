import * as React from 'react';
import MainNavigation from './MainNavigation';
import Footer from './Footer';
import Header from './Header';
import {Grid, Box} from '@mui/material';

import imageURL from '../../images/background_image.jpg'; // make sure to provide the correct path to your image file
import school_img from '../../images/DJI_0214.JPG';

export default function Layout({children}) {
	return (
		<Box
			component="div"
			sx={{
				position: 'absolute',
				width: '100%',
				height: '75%',
				backgroundImage: `url(${school_img})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<Header />
			<MainNavigation />
			<Grid container>{children}</Grid>
			<Footer />
		</Box>
	);
}
