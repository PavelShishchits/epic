import { Metadata } from 'next';

import { LoginForm } from '@/app/_components/LoginForm/LoginForm';
import { SignUpForm } from '@/app/_components/SignUpForm/SignUpForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/Card/Card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/_components/ui/Tabs/Tabs';
import Typography from '@/app/_components/ui/Typography/Typography';

export const metadata: Metadata = {
  title: 'Login / signup',
  description: 'Login / signup',
};

export default async function LoginPage() {
  return (
    <div className="container flex flex-col items-center">
      <Tabs defaultValue="login" className="max-w-lg w-full">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>
                <Typography className="mb-3" variant={'h4'} tag="h2">
                  Login
                </Typography>
              </CardTitle>
              <CardDescription>
                Enter your username below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>
                <Typography className="mb-3" variant={'h4'} tag="h2">
                  Sign Up
                </Typography>
              </CardTitle>
              <CardDescription>Register your account</CardDescription>
            </CardHeader>
            <CardContent>
              <SignUpForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
