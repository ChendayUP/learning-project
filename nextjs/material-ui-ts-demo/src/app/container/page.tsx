"use client"
import { Box, ButtonGroup } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
export default function ContainerPage() {
  const StyleButton = styled(Button)<ButtonProps>(({ theme }) => ({
    paddingTop: 0,
    paddingBottom: 0,
    lineHeight: 1,
  }));

  return (
    <>
      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        This Box renders as an HTML section element.
      </Box>
      <ButtonGroup sx={{border: 0, marginTop: '10px', padding: 0}} variant="text" aria-label="Basic button group">
        <Button sx={{border: 0, marginTop: '10px', py: 0, lineHeight: 1}}>One</Button>
        <Button sx={{border: 0, marginTop: '10px', py: 0, lineHeight: 1}}>Two</Button>
        <Button sx={{border: 0, marginTop: '10px', py: 0, lineHeight: 1}}>Three</Button>
      </ButtonGroup>

      <ButtonGroup sx={{border: 0, marginTop: '10px', padding: 0}} variant="text" aria-label="Basic button group">
        <StyleButton>One</StyleButton>
        <StyleButton>Two</StyleButton>
        <StyleButton>Three</StyleButton>
      </ButtonGroup>
    </>
  )
}