import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function EventCard(props){

  let {character, cardData} = props;

  let created = new Date(cardData.created_at);
  let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
  let date = created.toLocaleDateString('en-US', options)


  let url = `https://wowhead.com/wotlk/item=${cardData.itemId}`;



  return(
    <Card sx={{textAlign: "center"}}>
      <CardContent sx={{contentAlign: 'center'}}>
        <Typography variant="h5" component="div">
          {date}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          DKP Spent: {cardData.dkp}
        </Typography>
        <a href={url} target="_blank" rel="noopener noreferrer">{cardData.item}</a>
      </CardContent>
    </Card>
  )
}