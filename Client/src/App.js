
import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import { NativeSelect } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { FormHelperText } from '@mui/material';
import { MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios'


const theme = createTheme();

export default function App() {


  const[userName, setUserName] = useState('');
  const[userLastName, setUserLastName] = useState('');
  const[userCountry, setUserCountry] = useState('')

  const[countriesList, setCountriesList] = useState([]);

  const [error, setError] = useState("")

  

useEffect(() => {
  Axios.get('http://localhost:3031/api/get').then((response) => {
    setCountriesList(response.data)
  })
}, [])

  const handleSubmit = () => {
    if (userName === '' || userLastName === '' || userCountry === ''){
        console.log("Debes completar todos los campos")
        alert("Debes completar todos los campos para continuar")
    }
    else{
        Axios.post('http://localhost:3031/api/insert', {

          userName: userName, 
          userLastName: userLastName, 
          userCountry:userCountry,
        })
        alert("Cargue realizado con exito");
      };
    }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresa Tu Información!
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                  onChange={(e) => {
                    setUserName(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(e) => {
                    setUserLastName(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
              <InputLabel id="select-country-label">Selecciona un pais</InputLabel>
              <Select
                  name="select-country-label"
                  labelId="select-country-label"
                  id="select-country"
                  required
                  fullWidth
                  value={countriesList.id}
                  label="Select a country"
                  onChange={(e) => {
                    console.log("country selected")
                    setUserCountry(e.target.value)
                  }}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {countriesList.map((country, index) => (
                      <MenuItem key={index} value={country.name}>{country.name}</MenuItem>
                    ))}
                  </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
