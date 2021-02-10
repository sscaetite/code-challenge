import {Box, Card, CardContent, Button, Typography} from "@material-ui/core"
import {useHistory} from "react-router-dom"

const HomePage = ({users}) => {
	const {push} = useHistory()

	const goToUserPage = (id) => push(`/user/${id}`)
	return(
		<Box>
			<Typography style={{margin: 5, fontSize: '1.6em'}}>
				Usuários
			</Typography>
			{users.map((user) => (
				<Card key={user.id} style={{margin: 5}}>
					<CardContent 
						style={{
							width: '90%',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}
					>
						{user.name}
						<Button 
							variant='contained'
							color='primary'
							onClick={() => goToUserPage(user.id)}
						>
							Ver álbuns
						</Button>
					</CardContent>
				</Card>
			))}
		</Box>
	)
}

export default HomePage