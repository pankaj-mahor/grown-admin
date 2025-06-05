import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Input, Button, Typography, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { logo } from '../../assets/images';
import { NavLink, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

// Dummy sign-in API call function (replace with your actual API call)
const signInApi = async (data) => {
  console.log('Signing in with:', data);
  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Simulate success or failure
  if (data.email === 'test@example.com' && data.password === 'password') {
    return { success: true, message: 'Sign in successful' };
  } else {
    throw new Error('Invalid email or password');
  }
};

function SignIn() {
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: signInApi,
    onSuccess: (data) => {
      console.log('Sign in successful:', data);

      // Handle successful sign-in (e.g., redirect, show success message)
      message.success('Sign in successful!');
      navigate('/home')

    },
    onError: (error) => {
      
      console.error('Sign in failed:', error.message);
      // Handle sign-in error (e.g., show error message)
      alert('Sign in failed: ' + error.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }} className='border borde'>
      	<NavLink to="/" className="flex text-3xl mb-16 h-[100]px">
						<img src={logo} alt="Grown Era Logo" className="w-full h-full" />
					</NavLink>
      <Title level={2} style={{ textAlign: 'center' }}>Sign In</Title>
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Form.Item
          label="Email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Enter your email" />}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input.Password {...field} placeholder="Enter your password" />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary"
          variant='solid'
          className='mt-4 bg-[green]'
          htmlType="submit" loading={mutation.isLoading} block>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignIn;
