import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function EventCard(cardData){

  let {character, itemName, itemId, dkpAmount} = cardData;

  character = "Thaco";
  itemName = "Scepter of Lost Souls";
  itemId = "45511";
  dkpAmount = "1";

  let url = `https://wowhead.com/wotlk/item=${itemId}`;



  return(
    <Card sx={{ minWidth: 275, maxWidth: 275, textAlign: "center" }}>
      <CardContent sx={{contentAlign: 'center'}}>
        <Typography variant="h5" component="div">
          {character}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          DKP Spent: {dkpAmount}
        </Typography>
        <a href={url} target="_blank" rel="noopener noreferrer">{itemName}</a>
      </CardContent>
    </Card>
  )
}