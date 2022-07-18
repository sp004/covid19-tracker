import { Card, CardContent, Typography } from '@mui/material'
import './Infobox.css'

const Infobox = ({title, cases, totalCases}) => {
  return (
    <Card className='infobox'>
        <CardContent className='infobox__content'>
            <Typography className='infobox__title'>
                {title}
            </Typography>
            <Typography className='infobox__cases'>
                {cases}
            </Typography>
            <Typography className='infobox__totalCases'>
                {totalCases} Total
            </Typography>
        </CardContent>
    </Card>
  )
}

export default Infobox