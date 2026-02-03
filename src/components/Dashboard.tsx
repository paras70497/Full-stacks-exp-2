import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Button,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  ShoppingCart,
  AttachMoney,
  Star,
  MoreVert,
  ArrowForward,
} from '@mui/icons-material';
import { Row, Col } from 'react-bootstrap';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const salesData = [
  { month: 'Jan', revenue: 4200, orders: 142, customers: 89 },
  { month: 'Feb', revenue: 5100, orders: 168, customers: 105 },
  { month: 'Mar', revenue: 4800, orders: 155, customers: 98 },
  { month: 'Apr', revenue: 6300, orders: 198, customers: 132 },
  { month: 'May', revenue: 7200, orders: 225, customers: 156 },
  { month: 'Jun', revenue: 8100, orders: 248, customers: 178 },
];

const recentActivity = [
  { id: 1, user: 'Sarah Johnson', action: 'Made a purchase', amount: '$342', time: '2 min ago', avatar: 'SJ', color: '#ff6b9d' },
  { id: 2, user: 'Mike Chen', action: 'Left a review', rating: 5, time: '15 min ago', avatar: 'MC', color: '#0a7ea4' },
  { id: 3, user: 'Emma Wilson', action: 'New signup', time: '1 hour ago', avatar: 'EW', color: '#10b981' },
  { id: 4, user: 'Alex Turner', action: 'Made a purchase', amount: '$189', time: '2 hours ago', avatar: 'AT', color: '#f59e0b' },
];

const topProducts = [
  { name: 'Premium Widget Pro', sales: 342, revenue: 45670, progress: 85 },
  { name: 'Designer Toolkit', sales: 289, revenue: 38920, progress: 72 },
  { name: 'Business Suite', sales: 245, revenue: 35680, progress: 68 },
  { name: 'Starter Package', sales: 198, revenue: 24560, progress: 55 },
];

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('6M');

  const StatCard = ({ title, value, change, icon: Icon, trend, color }: any) => (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 1, mb: 1 }}>
              {value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {trend === 'up' ? (
                <TrendingUp sx={{ fontSize: 18, color: '#10b981' }} />
              ) : (
                <TrendingDown sx={{ fontSize: 18, color: '#ef4444' }} />
              )}
              <Typography
                variant="body2"
                sx={{ color: trend === 'up' ? '#10b981' : '#ef4444', fontWeight: 600 }}
              >
                {change}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                vs last month
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${color}20 0%, ${color}40 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ fontSize: 28, color }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Here's what's happening with your business today.
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Total Revenue"
              value="$35.2k"
              change="+18.3%"
              trend="up"
              icon={AttachMoney}
              color="#0a7ea4"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Total Orders"
              value="1,136"
              change="+12.5%"
              trend="up"
              icon={ShoppingCart}
              color="#ff6b9d"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="New Customers"
              value="758"
              change="+24.8%"
              trend="up"
              icon={People}
              color="#10b981"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Avg Rating"
              value="4.8"
              change="-2.1%"
              trend="down"
              icon={Star}
              color="#f59e0b"
            />
          </Grid>
        </Grid>

        {/* Charts Row */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Revenue Chart */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Revenue Analytics
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Monthly performance overview
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {['1M', '3M', '6M', '1Y'].map((period) => (
                      <Button
                        key={period}
                        size="small"
                        variant={selectedPeriod === period ? 'contained' : 'outlined'}
                        onClick={() => setSelectedPeriod(period)}
                        sx={{ minWidth: 48 }}
                      >
                        {period}
                      </Button>
                    ))}
                  </Box>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0a7ea4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0a7ea4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#0a7ea4"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Orders Chart */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Orders & Customers
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Last 6 months trend
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Bar dataKey="orders" fill="#ff6b9d" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Bottom Row */}
        <Row>
          <Col lg={7} className="mb-3">
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Top Products
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Best performing items this month
                    </Typography>
                  </Box>
                  <Button endIcon={<ArrowForward />} size="small">
                    View All
                  </Button>
                </Box>
                {topProducts.map((product, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 3,
                      pb: 2,
                      borderBottom: index < topProducts.length - 1 ? '1px solid #e2e8f0' : 'none',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#0a7ea4' }}>
                        ${product.revenue.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={product.progress}
                        sx={{
                          flex: 1,
                          height: 8,
                          borderRadius: 4,
                          bgcolor: '#e2e8f0',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            background: 'linear-gradient(90deg, #0a7ea4 0%, #4fb3d4 100%)',
                          },
                        }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                        {product.sales} sales
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Col>

          <Col lg={5} className="mb-3">
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Recent Activity
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Latest user interactions
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>
                {recentActivity.map((activity) => (
                  <Box
                    key={activity.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 3,
                      pb: 2,
                      borderBottom: activity.id < recentActivity.length ? '1px solid #e2e8f0' : 'none',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: activity.color,
                        fontWeight: 600,
                        width: 48,
                        height: 48,
                      }}
                    >
                      {activity.avatar}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {activity.user}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.action}
                        {activity.amount && (
                          <Chip
                            label={activity.amount}
                            size="small"
                            sx={{ ml: 1, height: 20, fontWeight: 600 }}
                          />
                        )}
                        {activity.rating && (
                          <Box component="span" sx={{ ml: 1 }}>
                            {[...Array(activity.rating)].map((_, i) => (
                              <Star key={i} sx={{ fontSize: 14, color: '#f59e0b' }} />
                            ))}
                          </Box>
                        )}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Container>
    </Box>
  );
}


