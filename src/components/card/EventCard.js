import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function EventCard(props) {
  let { cardData } = props;

  let created = new Date(cardData.created_at);
  let options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  let date = created.toLocaleDateString("en-US", options);

  let url = `https://wowhead.com/classic/item=${cardData.itemId}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
      <Card sx={{ pt: "15%", textAlign: "center", minWidth: 252.5, minHeight: 164 }}>
        <CardContent>
          <Typography variant="h5">
            {cardData.item}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            DKP Spent: {cardData.dkp}<br />{date}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
}
