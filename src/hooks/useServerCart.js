import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { LangContext } from '../context/LangContext';
import {
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateCartItemMutation,
    useRemoveCartItemMutation,
    useClearCartMutation
} from '../dashboard/tools/api/cart';
import { notify } from './useNotify';

export const useServerCart = () => {
    const { lang } = useContext(LangContext);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { data } = useGetCartQuery(undefined, { skip: !isAuthenticated });

    const [add] = useAddToCartMutation();
    const [update] = useUpdateCartItemMutation();
    const [remove] = useRemoveCartItemMutation();
    const [clear] = useClearCartMutation();

    const cart = isAuthenticated ? data : null;
    const items = cart?.items ?? [];


    const askLogin = async () => {
        const ok = await notify.confirmLogin('Səbətə əlavə etmək üçün daxil olun', 'Please login to use the cart');
        if (ok) window.location.href = '/auth/login';
    };

    // Runs a request. Returns true if it worked, false if not (and shows the error).
    const run = async (action) => {
        try {
            await action().unwrap();
            return true;
        } catch (error) {
            notify.error(
                'Xəta baş verdi',
                'Something went wrong',
                typeof error?.data === 'string' ? error.data : undefined
            );
            return false;
        }
    };

    return {
        items,
        isEmpty: items.length === 0,
        totalItems: cart?.totalItems ?? 0,
        cartTotal: cart?.cartTotal ?? 0,

        addItem: async (item, quantity = 1) => {
            if (!isAuthenticated) {
                askLogin();
                return false;
            }
            const gameId = item?.id || item?._id;
            if (!gameId) return false;
            return run(() => add({ gameId, quantity }));
        },
        updateItemQuantity: (id, quantity) => run(() => update({ gameId: id, quantity })),
        removeItem: (id) => run(() => remove(id)),
        emptyCart: () => run(() => clear()),
    };
};