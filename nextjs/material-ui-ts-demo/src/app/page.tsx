import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';

export default function Home() {

  const LinkList = [
    { href: '/about', text: 'Go to the about page' },
    { href: '/dynamicColor', text: 'Go to the dynamic Color Page' },
    { href: '/container', text: 'Go to the Container Page' }
  ]

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI - Next.js App Router example in TypeScript
        </Typography>
        {
          LinkList.map((link, index) => (
            <Link key={index} href={link.href} color="secondary" component={NextLink}>
              {link.text}
            </Link>
          ))
        }
        {/* <Link href="/about" color="secondary" component={NextLink}>
          Go to the about page
        </Link>
        <Link href="/dynamicColor" color="secondary" component={NextLink}>
          Go to the dynamic Color Page
        </Link> */}
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
