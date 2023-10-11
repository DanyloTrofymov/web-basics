import { useEffect, useState } from 'react';
import type { UseMutationResult, UseQueryResult } from 'react-query';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import userService from '../services/user.service';
import { QUERY_KEYS, ROUTER_KEYS } from '../common/consts/app-keys.const';
import type {
  IUser,
  IUserChangePassword,
  IUserEmail,
  IUserLogin,
  IUserRestorePassword,
  IUserSignup,
  IUserUpdate,
  QueryFields
} from '../common/types/user.type';
import type { IResponceCurrentUser, IResponceUsers } from '../common/types/responce.type';

export function useUser() {
  const history = useHistory();
  const queryClient = useQueryClient();
  return useQuery(QUERY_KEYS.USER, async () => userService.getUser(), {
    onError: (error: any) => {
      if (error?.response?.data?.message?.match('jwt expired')) {
        localStorage.removeItem('token');
        history.push(ROUTER_KEYS.LOGIN);
        queryClient.invalidateQueries(QUERY_KEYS.USER);
      } else if (error?.response?.data?.message?.match('jwt malformed')) {
        localStorage.removeItem('token');
      }
    }
  });
}

export function useAllUsers(query: QueryFields): UseQueryResult {
  const queryClient = useQueryClient();
  const history = useHistory();
  const fetchTodos = async (): Promise<IResponceUsers> => {
    const data = await userService.getAllUsers(query);
    return data;
  };
  useEffect(() => {
    fetchTodos();
    queryClient.removeQueries(QUERY_KEYS.ALL_USERS);
  }, [query.search, query.skip, query.take]);

  return useQuery([QUERY_KEYS.ALL_USERS], fetchTodos, {
    onError: (error: any) => {
      if (error?.response?.data?.message?.match('Auth error')) {
        localStorage.removeItem('token');
        history.push(ROUTER_KEYS.LOGIN);
        queryClient.invalidateQueries(QUERY_KEYS.USER);
      }
    }
  });
}

export function useCountUsers(query: QueryFields, users: Array<IUser> | undefined): number {
  const [count, setCount] = useState(0);
  const fetchCountTodos = async (): Promise<void> => {
    const data = await userService.getCountUsers(query);
    setCount(data.data);
  };

  useEffect(() => {
    fetchCountTodos();
  }, [users]);

  return count;
}

export function useLoginMutation(): UseMutationResult<
  IResponceCurrentUser,
  unknown,
  IUserLogin,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation(async (data: IUserLogin) => userService.login(data), {
    onSuccess: (response: any) => {
      localStorage.setItem('token', response.data.data.token);
      queryClient.invalidateQueries(QUERY_KEYS.USER);
    }
  });
}

export function useSignupMutation(): UseMutationResult<
  IResponceCurrentUser,
  unknown,
  IUserSignup,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation(async (data: IUserSignup) => userService.signup(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.USER);
    }
  });
}

export function useForgotPasswordMutation(): UseMutationResult<
  IResponceCurrentUser,
  unknown,
  IUserEmail,
  unknown
> {
  return useMutation(async (data: IUserEmail) => userService.forgotPassword(data));
}

export function useRestorePasswordMutation(): UseMutationResult<
  IResponceCurrentUser,
  unknown,
  IUserRestorePassword,
  unknown
> {
  return useMutation(async (data: IUserRestorePassword) => userService.restorePassword(data));
}

export function useConfirmEmailMutation(): UseMutationResult<
  IResponceCurrentUser,
  unknown,
  string,
  unknown
> {
  return useMutation(async (token: string) => userService.confirmEmail(token));
}

export function useChangePasswordMutation(): UseMutationResult<
  IResponceCurrentUser,
  unknown,
  IUserChangePassword,
  unknown
> {
  return useMutation(async (data: IUserChangePassword) => userService.changePassword(data));
}

export function useEditMutation(): UseMutationResult<
  IResponceCurrentUser,
  unknown,
  IUserUpdate,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation(async (data: IUserUpdate) => userService.updateUser(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.ALL_USERS]);
      queryClient.invalidateQueries(QUERY_KEYS.USER);
    }
  });
}

export function useUserDeleteMutation(): UseMutationResult<
  IResponceCurrentUser,
  unknown,
  string,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation(async (id: string) => userService.deleteUser(id), {
    onSuccess: () => {
      localStorage.removeItem('token');
      queryClient.invalidateQueries(QUERY_KEYS.USER);
    }
  });
}

export function useLogout(): () => void {
  const queryClient = useQueryClient();

  function logout(): void {
    localStorage.removeItem('token');
    queryClient.removeQueries(QUERY_KEYS.USER);
  }

  return logout;
}
