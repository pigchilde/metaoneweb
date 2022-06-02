import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Pagination,
  Select,
  Stack,
  Typography,
  ThemeProvider,
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import theme from './muiTheme';

import NFTLevel from './components/NFTLevel';
import RowStack from './components/RowStack';
import { queryMarketNFTs } from './utils/mock';
import { Link } from 'umi';

const pageSize = 12;
const NFTsHubPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);

  const loadData = useCallback(async () => {
    queryMarketNFTs({ pageIndex, pageSize }).then((res) => {
      if (res.code === 0) {
        setData(res.data.nfts);
        setTotal(res.data.total);
      }
    });
  }, [pageIndex]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const totalPage = useMemo(() => Math.ceil(total / pageSize), [total]);

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ pt: '112px' }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            my: 3,
            a: {
              color: 'primary.light',

              '&:hover': {
                color: 'primary.main',
              },
            },
          }}
        >
          <Box component={Link} color="primary.light" to="/nfts">
            Home
          </Box>
          <Typography color="primary.main">NFTs Hub</Typography>
        </Breadcrumbs>

        <RowStack sx={{ my: 4 }} alignItems="end">
          <Box sx={{ flex: 1, display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="h4">NFTs Hub</Typography>
            <Typography>Over 475+NFTS available here, find it now!</Typography>
          </Box>
          <SortBy />
        </RowStack>
        <Grid container spacing={{ xs: 1.5, sm: 2, md: 3, lg: 4 }}>
          {data.map((item, index) => {
            return (
              <Grid key={index} item xs={6} sm={4} md={3}>
                <NFTItem data={item} />
              </Grid>
            );
          })}
        </Grid>
        <Pagination
          variant="outlined"
          count={totalPage}
          onChange={(_, index) => {
            setPageIndex(index);
          }}
          sx={{
            my: 4,
            ul: {
              justifyContent: 'center',
              '.MuiPaginationItem-root': {
                borderRadius: '3px',
                backgroundColor: '#004548',

                '&.Mui-selected': {
                  color: '#333',
                  backgroundColor: 'primary.main',
                },
              },
            },
          }}
        ></Pagination>
      </Container>
    </ThemeProvider>
  );
};
export default NFTsHubPage;

function NFTItem({ data }: { data: any }) {
  const { id, image, name, hash, level, leaseInfo } = data;
  return (
    <Box
      component={Link}
      to={'/nfts/' + id}
      sx={{
        width: '100%',
        maxWidth: '260px',
        '&:not(:last-child)': {
          marginRight: '14px',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 0,
          backgroundColor: '#111111',
          paddingBottom: '145%',
          backgroundImage: `url(${image})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></Box>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            textAlign: 'center',
            my: 1,
          }}
        >
          <NFTLevel level={level} />
        </Box>
        <Typography variant="subtitle1">{name}</Typography>
        <Box>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            #{hash}
          </Typography>
        </Box>
        <Stack direction="row" alignItems="flex-end" sx={{ mt: 1 }}>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: 20,
              color: 'primary.main',
              lineHeight: 1,
            }}
          >
            {leaseInfo.interest}
          </Typography>
          <Typography
            sx={{
              ml: 1,
              fontSize: 12,
              color: 'text.secondary',
              lineHeight: 1,
            }}
          >
            Rent(USDT/Day)
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

const SortBy: React.FC = () => {
  return (
    <Select
      native
      margin="none"
      size="small"
      sx={{
        boxSizing: 'border-box',
        height: 44,

        legend: {
          width: 0,
        },
      }}
    >
      <option>Relevanz</option>
      <option>Neuerscheinung</option>
      <option>Alphabetisch</option>
      <option>Preis: Aufsteigend</option>
      <option>Preis: Absteigend</option>
    </Select>
  );
};
