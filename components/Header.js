import {AppBar, Autocomplete, Box, TextField, Toolbar, Typography} from '@mui/material';
import {Button} from '@mui/joy';
import Image from 'next/image';
import Link from 'next/link';
function Header(props) { 

  function handleLogout(){
    sessionStorage.removeItem("cryUser");
    window.location.href = ('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="navbarStyle" sx={{ backgroundColor: '#000'}} position="static">
        <Toolbar>
          <Image width='50px' height='50px' src="/images/cryptoTickerLogoN.png" />
          <Typography href="/" variant="h6" className='LogoText' component="a" sx={{ flexGrow: 1 }}>
            Crypto Ticker
          </Typography>
          <Autocomplete
           disableClearable
            value={props.value}
            onChange={(event, newValue) => {
              props.setValue(newValue);
              sessionStorage.setItem("currency", newValue);
            }}
            
            id="currency"
            options={props.currencyList ? props.currencyList : ['INR','USD']}
            className="curr"
            sx={{ width: 90, border: '1px solid #fff', borderRadius:'8px', color: '#fff', padding: '0px', marginRight: '20px',  }}
            renderInput={(params) => <TextField {...params} />}
          />
          
          {props.user && <Typography variant='span' className='userSty'>{props.user}</Typography>}
          {!props.user && <Link href='/Login' passHref>
           <Button color="inherit"  sx={{color: '#000',backgroundColor: '#fff' }} >Login</Button>
          </Link>}
          {props.user && 
           <Button color="inherit"  sx={{color: '#000',backgroundColor: '#fff', marginLeft: '20px' }} onClick={handleLogout} >Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header

