import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Label from '../../components/label';
import Button from '@mui/material/Button';

// ----------------------------------------------------------------------

export default function RoomCard({ product }: any) {
  // const renderStatus = (
  //   <Label
  //     variant="filled"
  //     color={(product.status === 'sale' && 'error') || 'info'}
  //     sx={{
  //       zIndex: 9,
  //       top: 16,
  //       right: 16,
  //       position: 'absolute',
  //       textTransform: 'uppercase',
  //     }}
  //   >
  //     {product.status}
  //   </Label>
  // );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      {product.price} VND
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {product.status && renderStatus} */}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction='row' alignItems="center" justifyContent="space-between">
          <Typography variant="h6" noWrap >
            {product.name}
          </Typography>
          {/* <Box sx={{ backgroundColor: "#ddd", padding: "5px 20px", borderRadius: "10px" }}>
            <Typography sx={{ fontWeight: "700", color: "#666" }}>{product.room}</Typography>
          </Box> */}
          <Box><Label>{product.room}</Label></Box>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Button variant="contained" size="medium" color={(product.status === 'Busy' && 'error') || 'info'}> {product.status}</Button>
          <Box>
            <Typography>{renderPrice}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
