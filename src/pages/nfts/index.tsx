import {
  Box,
  Container,
  Grid,
  Card,
  Typography,
  Button,
  Stack,
  ThemeProvider,
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
import BannerPNG from './assets/NFTHub_banner.png';
import FireIcon from './assets/FireIcon.png';
import TrendingThisWeekItemBG from './assets/TrendingThisWeekItemBG.png';
import NFTLevel from './components/NFTLevel';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import type { Swiper as SwiperProps } from 'swiper';
import { Pagination } from 'swiper';

import 'swiper/swiper.scss';
// Import Swiper styles
// import 'swiper/css/pagination';

import RowStack from './components/RowStack';
import { getInterval } from './utils/helper';
import { Link, useHistory } from 'umi';

const NFTsPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const query = useCallback(async () => {
    queryMarketNFTs({ pageIndex: 1, pageSize: 10000 }).then((res) => {
      console.log(res);
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
        <TrendingThisWeek data={[...data].slice(1, 6)} />
        <BestSellers data={data} />
        <NFTGroup
          data={data.filter((item) => item.game === 'Kill Box')}
          title="Kill Box"
        />
        <NFTGroup
          data={data.filter((item) => item.game === 'AOT')}
          title="Age Of Tanks"
        />
        {/* <FlashSale data={data} /> */}
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
      modules={[Pagination]}
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
  return (
    <Container sx={{ my: 8, maxWidth: '1282px !important' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <StatisticItem
            title="Transactions"
            value="31,656"
            trend="up"
            trendValue="537"
            helper="24h ago"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatisticItem
            title="NFTS"
            value="195"
            trend="up"
            trendValue="13"
            helper="growth today"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatisticItem
            title="Total volume"
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

function TrendingThisWeek({ data }: { data: any[] }) {
  return useMemo(() => {
    return (
      <Container sx={{ my: 9, maxWidth: '1282px !important' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Trending This Week
        </Typography>
        <Box sx={{ overflowY: 'auto', display: 'flex', width: '100%' }}>
          {data.map((item, index) => (
            <TrendingThisWeekItem key={index} data={item} />
          ))}
        </Box>
      </Container>
    );
  }, [data]);
}

function TrendingThisWeekItem({ data }: { data: any }) {
  if (!data) return null;
  return (
    <Box
      component={Link}
      to={'/nfts/' + data.id}
      sx={{
        textAlign: 'center',
        width: '206px',
        '&:not(:last-child)': {
          marginRight: '50px',
        },
      }}
    >
      <Box
        sx={{
          width: '206px',
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
      <Box sx={{ py: 1 }}>
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
      <Button variant="outlined" fullWidth size="large">
        {data.leaseInfo.interest} USDT/DAY
      </Button>
    </Box>
  );
}

function BestSellers({ data }: { data: any[] }) {
  const [swiperRef, setSwiperRef] = useState<SwiperProps>();

  return (
    <Container sx={{ my: 9, maxWidth: '1282px !important' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Hot NFTs
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
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {data.splice(10, 5).map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <BestSellersItem data={item} />
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

function BestSellersItem({ data }: { data: any }) {
  return (
    <Box
      component={Link}
      to={'/nfts/' + data.id}
      sx={{
        width: '100%',
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '174px',
          height: '248px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
        <Typography
          sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1 }}
        >
          Rent(USDT/Day)
        </Typography>
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
      </Box>
    </Box>
  );
}

interface NFTGroupProps {
  title: string;
  data: any[];
}

function NFTGroup({ title, data }: NFTGroupProps) {
  const history = useHistory();
  return (
    <Container sx={{ my: 9, maxWidth: '1282px !important' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" sx={{ mb: 2 }}>
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
          <Typography
            sx={{ color: 'primary.main', mr: 0.5 }}
            onClick={() => history.push('/nfts/hub')}
          >
            View More
          </Typography>
          <ArrowForwardIos fontSize="small" color="primary" />
        </Stack>
      </Stack>
      <Box sx={{ overflowY: 'auto', display: 'flex', width: '100%' }}>
        {data.slice(0, 6).map((item, index) => {
          return <NFTItem key={index} data={item} />;
        })}
      </Box>
    </Container>
  );
}

function NFTItem({ data }: { data: any }) {
  return (
    <Box
      component={Link}
      to={'/nfts/' + data.id}
      sx={{
        width: '194px',
        backgroundColor: '#111111',
        '&:not(:last-child)': {
          marginRight: '14px',
        },
      }}
    >
      <Box
        sx={{
          width: '194px',
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
            Rent(USDT/Day)
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

function FlashSale({ data = [] }: { data: any[] }) {
  const [swiperRef, setSwiperRef] = useState<SwiperProps>();
  return (
    <Container sx={{ my: 9, maxWidth: '1282px !important' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={8}
        alignItems="stretch"
      >
        <Stack
          sx={{
            flexBasis: { xs: 'auto', md: '348px' },
            flexShrink: 0,
            height: { xs: 'auto', md: '302px' },
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Promotional Activities
          </Typography>

          <Typography>
            The game official is holding some promotional activities
          </Typography>

          <div style={{ flex: 1 }}></div>
          <Box
            sx={{
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 2,
              fontSize: 40,
              fontWeight: 'bold',
              color: 'primary.main',
              border: 'solid 1px #006366',
              mt: 2,
            }}
          >
            <Countdown startTime={1654387200000} />
          </Box>
        </Stack>

        <Box
          sx={{
            flex: 1,
            '.swiper-slide': {
              width: 'auto !important',
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            sx={{ width: '100%', gap: 4 }}
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
                slidesPerView="auto"
                loop
                onSwiper={setSwiperRef}
                spaceBetween={20}
                grabCursor
                mousewheel
                resistance
                resistanceRatio={0}
                autoplay={false}
                effect="slide"
                speed={400}
                direction="horizontal"
              >
                {data.splice(0, 5).map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <FlashSaleItem data={item} />
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
        </Box>
      </Stack>
    </Container>
  );
}

function FlashSaleItem({ data }: { data: any }) {
  if (!data) return null;
  return (
    <Link to={'/nfts/' + data.id}>
      <Box
        sx={{
          width: '100%',
          minWidth: { xs: 'unset', md: '482px' },
          backgroundColor: 'rgb(0 99 102 / 45%)',
          borderColor: 'primary.main',
          borderStyle: 'solid',

          borderWidth: 1,
          borderRadius: '3px',
          px: 2,
          py: 4,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: { xs: '240px', md: '166px' },
            height: { xs: '120px', md: '245px' },
            flexShrink: 0,
            display: 'flex',
            alignItems: { xs: 'stretch', md: 'center' },
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
          <Typography variant="subtitle1">AWP</Typography>
          <Box>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
              #{data.hash}
            </Typography>
          </Box>
          <RowStack alignItems="baseline" sx={{ mt: 1 }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: 27,
                color: 'primary.main',
                lineHeight: 1,
              }}
            >
              {data.leaseInfo.interest}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                ml: 1,
                color: 'text.secondary',
                lineHeight: 1,
              }}
            >
              Rent(USDT/Day)
            </Typography>
          </RowStack>
        </Box>
      </Box>
    </Link>
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
