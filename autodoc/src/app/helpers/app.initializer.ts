import { AccountService } from '../services';

export function appInitializer(accountService: AccountService) {
    return () => new Promise(resolve => {
        accountService.refreshToken()
            .subscribe()
            .add(resolve);
    });
}