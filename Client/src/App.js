
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
import InputLabel from '@mui/material/InputLabel';
import { MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const theme = createTheme();

export default function App() {

  const[userName, setUserName] = useState('');
  const[userLastName, setUserLastName] = useState('');
  const[userCountry, setUserCountry] = useState('')
  const[countriesList, setCountriesList] = useState([]);
  const [userList, setUserList] = useState([])

useEffect(() => {
  Axios.get('http://localhost:3031/api/get').then((response) => {
    setCountriesList(response.data)
  })
}, [])

useEffect(() => {
  Axios.get('http://localhost:3031/api/getUsers').then((response) => {
    setUserList(response.data)
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

            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 360 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell  align="center">Id Usuario</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell align="center">Pais</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell  align="center" >{row.idUser}</TableCell>
                    <TableCell >{row.userName}</TableCell>
                    <TableCell >{row.userLastName}</TableCell>
                    <TableCell align="center">{row.userCountry}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
