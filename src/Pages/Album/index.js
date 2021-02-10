import {Box, Card, CardContent, CardMedia, Typography} from "@material-ui/core"

const AlbumPage = ({albums, photos, match}) => {
	const {params} = match

	return(
		<>
			<Typography style={{margin: 5, fontSize: '1.6em'}}>
				{(albums.find((album) => album.id.toString() === params.id)).title}
			</Typography>
			<Box style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
				{photos
					.filter((photo) => photo.albumId.toString() === params.id)
					.filter((photo, index) => index < 10)
					.map((photo) => (
						<Card
							key={photo.id}
							style={{width: 300, margin: 5}}
						>
							<CardMedia
								image={photo.url}
								title={photo.title}
								style={{width: 300, height: 300}}
							/>
							<CardContent>
								{photo.title[0].toUpperCase() + photo.title.slice(1)}
							</CardContent>
						</Card>
					))
				}
			</Box>
		</>
	)
}

export default AlbumPage