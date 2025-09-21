import { useMutation } from '@tanstack/react-query';
import LoginService from '../services/LoginService';

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: ({ email, password }) =>
            LoginService.login(email, password),
    });
};
