import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Chip,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Business,
  LocationOn,
  CreditCard,
  CheckCircle,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { Form } from 'react-bootstrap';

const schema = yup.object({
  firstName: yup.string().required('First name is required').min(2, 'Must be at least 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'Must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits'),
  company: yup.string().required('Company name is required'),
  jobTitle: yup.string().required('Job title is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  address: yup.string().required('Address is required'),
  zipCode: yup.string().required('ZIP code is required').matches(/^[0-9]{5,6}$/, 'Invalid ZIP code'),
  accountType: yup.string().required('Account type is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
}).required();

type FormData = yup.InferType<typeof schema>;

const steps = ['Personal Info', 'Company Details', 'Account Setup'];

export default function RegistrationForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      accountType: 'business',
      terms: false,
    },
  });

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    if (activeStep === 0) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone'];
    } else if (activeStep === 1) {
      fieldsToValidate = ['company', 'jobTitle', 'country', 'city', 'address', 'zipCode'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setActiveStep(0);
    }, 3000);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Create Your Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join thousands of businesses already using our platform
          </Typography>
        </Box>

        {submitSuccess && (
          <Alert
            icon={<CheckCircle />}
            severity="success"
            sx={{ mb: 3, borderRadius: 3, fontSize: '1rem' }}
          >
            Registration successful! Welcome aboard! 🎉
          </Alert>
        )}

        <Card sx={{ maxWidth: 900, mx: 'auto' }}>
          <CardContent sx={{ p: 4 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Step 1: Personal Information */}
              {activeStep === 0 && (
                <Box>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Personal Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="First Name"
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Last Name"
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Email Address"
                            type="email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Email color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Phone Number"
                            placeholder="1234567890"
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Phone color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Step 2: Company Details */}
              {activeStep === 1 && (
                <Box>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Company Details
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="company"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Company Name"
                            error={!!errors.company}
                            helperText={errors.company?.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Business color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="jobTitle"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Job Title"
                            error={!!errors.jobTitle}
                            helperText={errors.jobTitle?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Street Address"
                            error={!!errors.address}
                            helperText={errors.address?.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LocationOn color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="country"
                        control={control}
                        render={({ field }) => (
                          <FormControl fullWidth error={!!errors.country}>
                            <InputLabel>Country</InputLabel>
                            <Select {...field} label="Country">
                              <MenuItem value="US">United States</MenuItem>
                              <MenuItem value="UK">United Kingdom</MenuItem>
                              <MenuItem value="CA">Canada</MenuItem>
                              <MenuItem value="AU">Australia</MenuItem>
                              <MenuItem value="IN">India</MenuItem>
                              <MenuItem value="DE">Germany</MenuItem>
                            </Select>
                            {errors.country && (
                              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                {errors.country.message}
                              </Typography>
                            )}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="City"
                            error={!!errors.city}
                            helperText={errors.city?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Controller
                        name="zipCode"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="ZIP Code"
                            error={!!errors.zipCode}
                            helperText={errors.zipCode?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Step 3: Account Setup */}
              {activeStep === 2 && (
                <Box>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Account Setup
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                          Account Type
                        </FormLabel>
                        <Controller
                          name="accountType"
                          control={control}
                          render={({ field }) => (
                            <RadioGroup {...field} row>
                              <FormControlLabel
                                value="personal"
                                control={<Radio />}
                                label={
                                  <Box>
                                    <Typography variant="body1" fontWeight={600}>
                                      Personal
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      For individual use
                                    </Typography>
                                  </Box>
                                }
                                sx={{
                                  mr: 3,
                                  border: '2px solid',
                                  borderColor: field.value === 'personal' ? 'primary.main' : '#e2e8f0',
                                  borderRadius: 2,
                                  p: 2,
                                  m: 0,
                                  flex: 1,
                                }}
                              />
                              <FormControlLabel
                                value="business"
                                control={<Radio />}
                                label={
                                  <Box>
                                    <Typography variant="body1" fontWeight={600}>
                                      Business
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      For teams & organizations
                                    </Typography>
                                  </Box>
                                }
                                sx={{
                                  border: '2px solid',
                                  borderColor: field.value === 'business' ? 'primary.main' : '#e2e8f0',
                                  borderRadius: 2,
                                  p: 2,
                                  m: 0,
                                  flex: 1,
                                }}
                              />
                            </RadioGroup>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    edge="end"
                                  >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="terms"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={<Checkbox {...field} checked={field.value} />}
                            label={
                              <Typography variant="body2">
                                I agree to the{' '}
                                <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                                  Terms and Conditions
                                </Box>{' '}
                                and{' '}
                                <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                                  Privacy Policy
                                </Box>
                              </Typography>
                            }
                          />
                        )}
                      />
                      {errors.terms && (
                        <Typography variant="caption" color="error" sx={{ ml: 4 }}>
                          {errors.terms.message}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Navigation Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  size="large"
                >
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button type="submit" variant="contained" size="large" sx={{ px: 5 }}>
                    Complete Registration
                  </Button>
                ) : (
                  <Button onClick={handleNext} variant="contained" size="large">
                    Next
                  </Button>
                )}
              </Box>
            </form>
          </CardContent>
        </Card>

        {/* Features */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #0a7ea420 0%, #0a7ea440 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <CheckCircle sx={{ fontSize: 32, color: '#0a7ea4' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Secure & Protected
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your data is encrypted and secured with industry standards
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #ff6b9d20 0%, #ff6b9d40 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <Business sx={{ fontSize: 32, color: '#ff6b9d' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Enterprise Ready
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Built for teams of all sizes with scalable infrastructure
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #10b98120 0%, #10b98140 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <CreditCard sx={{ fontSize: 32, color: '#10b981' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                No Credit Card
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start your free trial today - no payment required
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
