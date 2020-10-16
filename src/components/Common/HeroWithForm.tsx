import React, { useState } from 'react';
import TextInput from 'components/Common/TextInput';
import SocialSignIn from 'components/Common/SocialSignIn';
import { TitleText, MediumTitle, RegularText } from './CustomText';
import Button from 'components/Common/Button';
import { register as registerUser } from 'api';
import { toast } from 'react-toastify';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Auth } from 'actions/ActionTypes';
import { useForm, Controller } from 'react-hook-form';
import useLocalStorage from 'hooks/useLocalStorage';
import authAction from 'actions/AuthActions';

interface InputProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  username: string;
  password: string;
}
const HeroWithForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const dispatch = useDispatch();
  const [isLoginSelected, setLoginSelected] = useLocalStorage('isLoginSelected', true);
  const AuthState = useSelector((state: RootStateOrAny) => state.Auth);
  const { register, handleSubmit, control } = useForm<InputProps>({
    defaultValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
    },
  });

  const handleLogin = (data) => {
    dispatch(
      authAction(Auth.Login, {
        input: {
          ...data,
        },
      }),
    );
  };

  const handleRegister = async (data) => {
    console.log('Registering');
    setIsRegistering(true);
    try {
      const res = await registerUser(data);
      if (!res.isSuccess) {
        throw new Error((res.message && res.message) || 'Server under maintainance!');
      }
      toast.success('Registration successful, Please check your email to verify your account!');
      setIsRegistering(false);
      setLoginSelected(true);
    } catch (err) {
      toast.error(err.message);
      setIsRegistering(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl py-10">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="md:w-1/2 max-w-md flex flex-col justify-center sm:w-full">
          <TitleText classNames="md:text-4xl text-white text-bold md:text-left uppercase">Syntasso.io</TitleText>
          <MediumTitle classNames="md:px-0 text-center text-xl text-white mt-4 sm:text-center md:text-left">
            The ultimate resource to prepare for coding interviews. Everything you need, in one streamlined platform.
          </MediumTitle>
        </div>
        <div className="md:w-1/2 pt-10 flex justify-center  md:justify-end w-full md:w-1/2  md:pt-0 ">
          <div className="shadow-xl flex-auto max-w-sm p-10 pb-20 bg-white">
            <SocialSignIn />
            <form onSubmit={handleSubmit(isLoginSelected ? handleLogin : handleRegister)}>
              <div className="w-full border-t border-gray-400" />
              {!isLoginSelected && (
                <>
                  <Controller
                    as={
                      <TextInput
                        lableClassNames="text-gray-600"
                        isRequired
                        lable="First Name"
                        name="firstName"
                        ref={register}
                        placeholder="First Name"
                      />
                    }
                    control={control}
                    rules={{ required: true }}
                    name="firstName"
                  />
                  <Controller
                    as={
                      <TextInput
                        name="lastName"
                        ref={register}
                        // value={input.lastName}
                        lableClassNames="text-gray-600"
                        isRequired
                        lable="Last Name"
                        placeholder="Last Name"
                      />
                    }
                    control={control}
                    rules={{ required: true }}
                    name="lastName"
                  />
                  <Controller
                    as={
                      <TextInput
                        lableClassNames="text-gray-600"
                        isRequired
                        lable="Email"
                        placeholder="Email"
                        name="email"
                        ref={register({ required: true })}
                      />
                    }
                    control={control}
                    rules={{ required: true }}
                    name="email"
                  />
                </>
              )}
              <Controller
                as={
                  <TextInput
                    lableClassNames="text-gray-600"
                    isRequired
                    lable="Username"
                    placeholder="Username"
                    name="username"
                    ref={register({ required: true })}
                  />
                }
                control={control}
                rules={{ required: true }}
                name="username"
              />
              <Controller
                as={
                  <TextInput
                    lableClassNames="text-gray-600"
                    isRequired
                    ref={register}
                    name="password"
                    secureTextEntry
                    lable="Password"
                    placeholder="Password"
                  />
                }
                control={control}
                rules={{ required: true }}
                name="password"
              />

              <div className="mt-6 relative ">
                <div className="w-full relative">
                  {isLoginSelected ? (
                    <Button type="submit" classNames="absolute" title="Sign In" isBusy={AuthState[Auth.Login].isBusy} />
                  ) : (
                    <Button type="submit" classNames="absolute" title="Register" isBusy={isRegistering} />
                  )}
                </div>
              </div>
              <div className="relative mt-20 text-gray-600 w-full text-center border-b leading-tight mt-1">
                <span className="bg-white my-1 px-0">OR</span>
              </div>
              <div className="relative w-full">
                {isLoginSelected ? (
                  <Button title="Register Here" color="gray-600" onClick={() => setLoginSelected(false)} />
                ) : (
                  <Button
                    // isBusy
                    title="Login Here"
                    color="gray-600"
                    onClick={() => setLoginSelected(true)}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWithForm;
