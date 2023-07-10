import {ImageList, ImageListItem, Stack} from '@mui/material';

export default function AlbumCardUser(album) {
	const renderPicture = (picture) =>
		picture.intro && (
			<img
				src={`${picture.secure_url}?w=164&h=164&fit=crop&auto=format&dpr=2`}
				alt={picture.name}
				loading="lazy"
			/>
		);

	const renderAlbum = (album) => {
		const introPicture = album.arrayOfPictures.find((picture) => picture.intro);
		return introPicture && renderPicture(introPicture);
	};

	return <ImageListItem>{renderAlbum(album)}</ImageListItem>;
}
