import {Box, Button, Card, CardContent, CardMedia} from "@material-ui/core"
import {useHistory} from "react-router-dom"

const UserPage = ({users, albums, photos, match}) => {
	const {push} = useHistory()
	const {params} = match

	const goToHome = () => push('/')

	const goToAlbum = (albumId) => push(`/album/${albumId}`)

	const getPhotoThumbnail = (album) => {
		const firstPhotoOfAlbum = 
			photos.find((photo) => photo.albumId === album.id)
		return firstPhotoOfAlbum.thumbnailUrl
	}

	const getPhotoTitle = (album) => {
		const firstPhotoOfAlbum = 
			photos.find((photo) => photo.albumId === album.id)
		return firstPhotoOfAlbum.title
	}

	if(!users || !albums || !photos) return(
		<Button
			variant='outlined'
			color='secondary'
			onClick={goToHome}
		>
			Voltar ao início
		</Button>
	)

	return(
		<Box style={{display: 'flex', flexWrap: 'wrap'}}>
			{albums
				.filter((album) => album.userId.toString() === params.id)
				.map((album) => (
					<Card 
						key={album.id}
						style={{width: 150, margin: 5, cursor: 'pointer'}}
						onClick={() => goToAlbum(album.id)}
					>
						<CardMedia
							style={{height: 150, width: 150, display: 'inline-block'}}
							image={getPhotoThumbnail(album)}
							title={getPhotoTitle(album)}
						/>
						<CardContent>
							{album.title[0].toUpperCase() + album.title.slice(1)}
						</CardContent>
					</Card>
				))
			}
		</Box>
	)
}

export default UserPage