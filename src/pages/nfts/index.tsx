import {
  Box,
  Container,
  Grid,
  Card,
  Typography,
  Button,
  Stack,
  Select,
  ThemeProvider,
  Pagination,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowForwardIos from '@mui/icons-material/ArrowForward';
import ArrowBackIos from '@mui/icons-material/ArrowBack';

import theme from './muiTheme';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { queryMarketNFTs } from './utils/mock';
import BannerPNG from './assets/nfthub_banner.jpg';
import FireIcon from './assets/FireIcon.png';
import TrendingThisWeekItemBG from './assets/TrendingThisWeekItemBG.png';
import NFTLevel from './components/NFTLevel';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import type { Swiper as SwiperProps } from 'swiper';

import 'swiper/swiper.scss';
// Import Swiper styles
// import 'swiper/css/pagination';

import RowStack from './components/RowStack';
import { getInterval } from './utils/helper';
import { Link, useHistory, useIntl } from 'umi';

const NFTsPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const intl = useIntl();

  const query = useCallback(async () => {
    queryMarketNFTs({ pageIndex: 1, pageSize: 10000 }).then((res) => {
      if (res.code === 0) {
        setData(res.data.nfts);
      }
    });
  }, []);

  useEffect(() => {
    query();
  }, [query]);

  if (!data || !data.length) return null;
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          img: {
            display: 'block',
            maxWidth: '100%',
          },
        }}
      >
        <MarketBanner />
        <Statistics />
        <BestSellers data={data} />
        <NFTGroup
          data={data}
          title={intl.formatMessage({ id: 'NFTHUB_ALL_NFTS' })}
        />
        <Pagination
          variant="outlined"
          count={5}
          onChange={(_, index) => {
            setPage(index);
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
        />
      </Box>
    </ThemeProvider>
  );
};
export default NFTsPage;

function MarketBanner() {
  return (
    <Box
      component={Swiper}
      pagination={{
        clickable: true,
        type: 'bullets',
      }}
      loop
      sx={{
        height: { xs: 360, md: 600 },

        '.swiper-pagination': {
          bottom: '24px !important',
        },
        '.swiper-pagination-bullet': {
          width: 16,
          height: 16,
          margin: '0 12px !important',
          backgroundColor: 'primary.main',
        },
      }}
    >
      <SwiperSlide>
        <Box
          sx={{
            height: '100%',
            img: {
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            },
          }}
        >
          <img src={BannerPNG} alt="" />
        </Box>
      </SwiperSlide>
    </Box>
  );
}

function Statistics() {
  const intl = useIntl();
  return (
    <Container sx={{ my: 8, maxWidth: '1282px !important' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <StatisticItem
            title={intl.formatMessage({ id: 'NFTHUB_TRANSCATION' })}
            value="31,656"
            trend="up"
            trendValue="537"
            helper="24h ago"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatisticItem
            title={intl.formatMessage({ id: 'NFTHUB_NFTS' })}
            value="195"
            trend="up"
            trendValue="13"
            helper="growth today"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatisticItem
            title={intl.formatMessage({ id: 'NFTHUB_TOTAL_VOLUMN' })}
            value="412,325"
            trend="up"
            trendValue="4589"
            helper="growth today"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

interface StatisticItemProps {
  title: string;
  value: React.ReactNode;
  unit?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  helper?: string;
}

function StatisticItem({
  title,
  value,
  trend,
  unit,
  trendValue,
  helper,
}: StatisticItemProps) {
  const TrendingIcon = React.useMemo(() => {
    if (!trend) return null;
    return trend === 'up' ? ArrowUpwardIcon : ArrowDownwardIcon;
  }, [trend]);

  const TrendingColor = React.useMemo(() => {
    if (!trend) return 'primary.main';
    return trend === 'up' ? 'success.dark' : 'error.dark';
  }, [trend]);

  return (
    <Card
      sx={{
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
      }}
    >
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ color: 'text.secondary' }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: 'primary.main',
          fontSize: 34,
          fontWeight: 'medium',
          mr: 1,
          display: 'inline-block',

          '&::after': {
            content: `'${unit || ''}'`,
            fontSize: '0.875rem',
            ml: 0.5,
            color: 'text.secondary',
          },
        }}
      >
        {value}
      </Typography>
      <Box sx={{ height: '24px', display: 'flex', alignItems: 'center' }}>
        {TrendingIcon && (
          <Box
            component={TrendingIcon}
            sx={{
              color: TrendingColor,
              fontSize: 16,
              verticalAlign: 'sub',
            }}
          />
        )}
        {trendValue && TrendingIcon && (
          <Box
            sx={{
              color: TrendingColor,
              display: 'inline',
              fontWeight: 'medium',
              mx: 0.5,
            }}
          >
            {trendValue}
          </Box>
        )}

        {helper && (
          <Box
            sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}
          >
            {helper}
          </Box>
        )}
      </Box>
    </Card>
  );
}

function TrendingThisWeekItem({ data }: { data: any }) {
  const intl = useIntl();
  if (!data) return null;
  return (
    <Box
      component={Link}
      to={'/nfts/' + data.id}
      sx={{
        textAlign: 'center',
        width: '194px',
        '&:not(:last-child)': {
          marginRight: '50px',
        },
      }}
    >
      <Box
        sx={{
          width: '194px',
          height: '278px',
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: `url(${TrendingThisWeekItemBG}) center/cover no-repeat`,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            background: '#FFF',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 12,
            left: 12,

            img: {
              width: 16,
              height: 'auto',
            },
          }}
        >
          <img src={FireIcon} alt="" />
        </Box>
        <img src={data.image} alt="" />
      </Box>
      <Box sx={{ py: 1, width: 194 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: 16, color: 'primary.main' }}
        >
          {data.game}
        </Typography>
        <Typography sx={{ fontSize: 20 }}>{data.name}</Typography>
        <Box
          sx={{
            textAlign: 'center',
            my: 1,
            '> div': {
              justifyContent: 'center',
            },
          }}
        >
          <NFTLevel level={data.level} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            #{data.hash}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: 194 }}>
        <Button variant="outlined" fullWidth size="large">
          {data.leaseInfo.interest} USDT/
          {intl.formatMessage({ id: 'NFTASSETS_DAY' })}
        </Button>
      </Box>
    </Box>
  );
}

function BestSellers({ data }: { data: any[] }) {
  const [swiperRef, setSwiperRef] = useState<SwiperProps>();
  const intl = useIntl();

  return (
    <Container sx={{ my: 9, maxWidth: '1282px !important' }}>
      <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Azonix' }}>
        {intl.formatMessage({ id: 'NFTHUB_HIGHEST_REVENUE' })}
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        spacing={4}
        sx={{ width: '100%' }}
      >
        <ArrowWrap
          onClick={() => {
            console.log(swiperRef?.isBeginning);
            swiperRef?.slidePrev();
          }}
        >
          <ArrowBackIos />
        </ArrowWrap>
        <Box
          sx={{
            flex: 1,
            width: 0,
          }}
        >
          <Swiper
            spaceBetween={0.1}
            onSwiper={setSwiperRef}
            slidesPerView={5}
            // breakpoints={{
            //   768: {
            //     slidesPerView: 2,
            //     spaceBetween: 20,
            //   },
            //   992: {
            //     slidesPerView: 3,
            //     spaceBetween: 30,
            //   },
            // }}
          >
            {data.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <TrendingThisWeekItem data={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
        <ArrowWrap
          onClick={() => {
            swiperRef?.slideNext();
          }}
        >
          <ArrowForwardIos />
        </ArrowWrap>
      </Stack>
    </Container>
  );
}

interface NFTGroupProps {
  title: string;
  data: any[];
}

function NFTGroup({ title, data }: NFTGroupProps) {
  const history = useHistory();
  return (
    <Container sx={{ my: 9, maxWidth: '1200px !important' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Azonix' }}>
          {title}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            cursor: 'pointer',
            opacity: 1,
            transition: 'opacity 120ms',
            '&:hover': {
              opacity: '0.6',
            },
          }}
        >
          <Stack sx={{ marginRight: 1 }}>
            <SortBy />
          </Stack>
          <SortByGame />
        </Stack>
      </Stack>
      <Box sx={{ overflowY: 'auto', display: 'flex', width: '100%' }}>
        {data.slice(0, 5).map((item, index) => {
          return <NFTItem key={index} data={item} />;
        })}
      </Box>
    </Container>
  );
}

function NFTItem({ data }: { data: any }) {
  const intl = useIntl();
  return (
    <Box
      component={Link}
      to={'/nfts/' + data.id}
      sx={{
        width: '200px',
        backgroundColor: '#111111',
        '&:not(:last-child)': {
          marginRight: '38px',
        },
      }}
    >
      <Box
        sx={{
          width: '200px',
          height: '154px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          img: {
            width: '100%',
            height: 'auto',
            maxHeight: '100%',
            objectFit: 'contain',
          },
        }}
      >
        <img src={data.image} alt="" />
      </Box>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            textAlign: 'center',
            my: 1,
          }}
        >
          <NFTLevel level={data.level} />
        </Box>
        <Typography variant="subtitle1">{data.name}</Typography>
        <Box>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            #{data.hash}
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
            {data.leaseInfo.interest}
          </Typography>
          <Typography
            sx={{
              ml: 1,
              fontSize: 12,
              color: 'text.secondary',
              lineHeight: 1,
            }}
          >
            {intl.formatMessage({ id: 'NFTASSETS_RENT' })}(USDT/
            {intl.formatMessage({ id: 'NFTASSETS_DAY' })})
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

function ArrowWrap({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: VoidFunction;
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 56,
        height: 56,
        flexShrink: 0,
        backgroundColor: '#00CACB',
        borderRadius: '50%',
        zIndex: 1,
        position: 'relative',
        display: {
          xs: 'none',
          sm: 'flex',
        },
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}

type CountDownType = ReturnType<typeof getInterval>;
function Countdown({ startTime }: { startTime?: number }) {
  const ref = useRef<any>();

  const [data, setData] = useState<CountDownType>({
    d: null,
    h: '',
    m: '',
    s: '',
  });

  useEffect(() => {
    function start() {
      const nowTime = Date.now();
      if (startTime && startTime > nowTime) {
        const _data = getInterval(nowTime, startTime);
        ref.current = setTimeout(start, 1000);
        setData(_data);
      }
    }

    start();

    return () => {
      if (ref.current) {
        clearTimeout(ref.current);
      }
    };
  }, [startTime]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        height: '52px',
        py: 1,
        pl: 2,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          '.Item': {
            display: 'flex',
            alignItems: 'baseline',

            '.Box': {
              width: 56,
              height: 56,
              textAlign: 'center',
            },
            '.Unit': {
              textAlign: 'center',
            },
          },
        }}
      >
        {data.d && (
          <Box className="Item" sx={{ mr: 2 }}>
            <Box className="Box">{data.d}</Box>
            <Box className="Unit">d</Box>
          </Box>
        )}
        {data.h && (
          <Box className="Item">
            <Box className="Box">{data.h}</Box>
            <Box className="Unit">:</Box>
          </Box>
        )}
        {data.m && (
          <Box className="Item">
            <Box className="Box">{data.m}</Box>
            <Box className="Unit">:</Box>
          </Box>
        )}
        {data.s && (
          <Box className="Item">
            <Box className="Box">{data.s}</Box>
          </Box>
        )}
      </Stack>
    </Stack>
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
      <option value={1}>Newest</option>
      <option value={2}>Oldest</option>
      <option value={3}>Highest Price</option>
      <option value={4}>Lowest Price</option>
    </Select>
  );
};

const SortByGame: React.FC = () => {
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
      <option value={0}>All Game</option>
      <option value={1}>Game A</option>
      <option value={2}>Game B</option>
    </Select>
  );
};
