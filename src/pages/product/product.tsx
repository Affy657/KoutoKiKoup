import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { Container, Box, Grid2, Stack, Paper, Rating, Typography, Button } from '@mui/material';
import { fetchKnifeById } from '../../api/api';

// Type
import type { Knife } from '../../type';

// Components
import Loading from "../../components/Loading/Loading.tsx";
import Notfound from "../../components/404/404.tsx";

// Styles
import './product.css';

const ProductPage = () => {
  let { id } = useParams();

  const navigate = useNavigate();
  const [indexImage, setIndexImage] = useState(0);

  id ??= 'not_found';

  const { data: knife, error } = useSWR<Knife>(`/knives/${id}`, () => fetchKnifeById(id));

  if (error) return <Notfound />;
  if (!knife) return <Loading />;

  const handleEditClick = () => {
    navigate(`/editproduct/${id}`);
  };

  const handleSelectImage = (index: number) => {
    setIndexImage(index);
  }

  return (
    <Container maxWidth="xl" sx={{ marginTop: '3rem' }}>
      <Stack alignItems="center" sx={{ width: '100%' }}>
        <Grid2 container sx={{ width: '100%' }} justifyContent="center" gap={6}>
          <Grid2 size={3} justifyItems="flex-end">
            <Paper elevation={4} sx={{ padding: 2, marginBottom: 2 }}>
              <img src={knife.images[indexImage]} alt={knife.name} className="knife-image" />
            </Paper>
            <Box sx={{ justifySelf: 'flex-start' }}>
              <Grid2 container direction="row" spacing={2}>
                {knife.images.map((image, index) => (
                  <Grid2 size={3}>
                    <Paper
                      elevation={4}
                      sx={{ padding: 1, height: 'fit-content', minWidth: '-webkit-fill-available' }}
                      onClick={() => handleSelectImage(index)}
                    >
                      <img key={index} src={image} alt={knife.name} className="knife-thumbnail" />
                    </Paper>
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 size={3}>
            <Box>
              <Typography
                variant="body1"
                fontWeight="bold"
                fontSize={22}
              >
                  {knife.name}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                fontSize={28}
                sx={{ color: '#ff613a' }}>
                  ${knife.price.toFixed(2)}
              </Typography>
              <Typography
                variant="body1"
                fontSize={18}
                sx={{ color: "#666", marginTop: 2 }}
              >
                {knife.description}
              </Typography>
              <Stack direction="column" spacing={2} sx={{ marginTop: 2 }}>
                <p><strong>Handle:</strong> {knife.handle}</p>
                <p><strong>Blade:</strong> {knife.blade}</p>
                <p><strong>Weight:</strong> {knife.weight}g</p>
                <p><strong>Length:</strong> {knife.length} mm</p>
              </Stack>
              <Stack flexDirection="row" gap={3}>
                <Box>
                  <p><strong>Sharpness:</strong></p>
                  <Rating
                    name="sharpness"
                    value={knife.sharpness / 2}
                    readOnly
                  />
                </Box>
                <Box>
                  <p><strong>Durability:</strong></p>
                  <Rating
                    name="durability"
                    value={knife.durability / 2}
                    readOnly
                  />
                </Box>
              </Stack>
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#ff613a',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#ff613a',
                    },
                    marginTop: 2,
                  }}
                  onClick={handleEditClick}
                >Edit</Button>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Stack>
    </Container>
  )
};

export default ProductPage;
