import { Link, Divider, Box, Stack } from '@mui/material';

export default function DividerPage() {
  return (
    <Box>
      <Stack
        sx={{ margin: '10px' }}
        direction="row"
        spacing={1}
        divider={<Divider orientation="vertical" flexItem />}>
        <Link href="#" underline="none" sx={{ lineHeight: 1 }}>
          Button1
        </Link>
        <Link href="#" underline="none" sx={{ lineHeight: 1 }}>
          Button2
        </Link>
      </Stack>
      <Stack
        sx={{ margin: '10px' }}
        direction="row"
        spacing={1}
        divider={<Divider orientation="vertical" />}>
        <Link href="#" underline="none" sx={{ lineHeight: 1 }}>
          Button1
        </Link>
        <Link href="#" underline="none" sx={{ lineHeight: 1 }}>
          Button2
        </Link>
      </Stack>
    </Box>
  )
}