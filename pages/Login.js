import { Typography,} from '@mui/material';
import {TextField,Button, Box} from '@mui/joy';
import styles from '../styles/Login.module.css';
import Head from 'next/head'
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from 'react';
import {  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import  { provider } from '../config/firebase-config'
import { useRouter } from 'next/router';

function Login() {

  const [switchLogin, setSwitchLogin] = useState('true');
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router =  useRouter();
  const auth = getAuth();
  function switchAuth(){
    setSwitchLogin(prevState => !prevState)
  }

  function handleLogin(e){
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      sessionStorage.setItem('cryUser', user.email)
      window.location.href = ('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
    setError(true)
  });
  }

  function handleSignUp(e){
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    sessionStorage.setItem('cryUser', user.email)
    window.location.href = ('/')

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

  });
  }

  function googleLogin(e){
    e.preventDefault();
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    sessionStorage.setItem('cryUser', user.email)
    window.location.href= ('/')

    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  return (
    <Box className={styles.loginBox}>
      <Head>
        <title>Login - Crypto Ticker</title>
        <meta name="description" content="Login to Crypto Ticker" />
      </Head>
      <Box className={styles.loginBox1}>
      <Typography variant="h5" >
        {switchLogin ? "Login" : "Sign Up"}
      </Typography>
      {/* {!switchLogin &&
      <TextField label="Name" size="lg" placeholder="Enter your name…" className={styles.textF} variant="outlined" onChange={(e) => setName(e.target.value)}/>
      } */}
      <TextField label="Email" size="lg" placeholder="Enter your email…" variant="outlined" className={styles.textF}  onChange={(e) => setEmail(e.target.value)}/>
      <TextField label="Password" size="lg" type="password" variant="outlined"placeholder="Enter password…" className={styles.textF}  onChange={(e) => setPassword(e.target.value)}/>
      {error && <Typography variant='span'>Wrong Email or Password</Typography>}
      {switchLogin && <Button size="md" variant="contained" className={styles.logBtn}  onClick={(e) => handleLogin(e)}>Login</Button>}
      {!switchLogin && <Button size="md" variant="contained" className={styles.logBtn}  onClick={(e) => handleSignUp(e)}>Sign Up</Button>}
      <Typography variant="span" >
        ------ or ------
      </Typography>
      <Button size="md" variant="contained" className={styles.logBtn1} startIcon={<GoogleIcon /> } onClick={(e) => googleLogin(e)}  > Login In with Google</Button>
      <Button size="md" variant="plain" onClick={switchAuth}>Don&apos;t have an account ? Sign Up</Button>
      </Box>
    </Box>
  )
}

export default Login
