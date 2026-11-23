import { useSelector } from 'react-redux';
import {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
}from '../dashboard/tools/api/wishlist';

export const useServerWishlist = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: items = [] } = useGetWishlistQuery(undefined, { skip: !isAuthenticated });
  const [add] = useAddToWishlistMutation();
  const [remove] = useRemoveFromWishlistMutation();

  return {
    items,
    isAuthenticated,
    inWishlist: (gameId) => items.some((game) => game._id === gameId),
    addWishlistItem: (gameId) => add(gameId).unwrap(),
    removeWishlistItem: (gameId) => remove(gameId).unwrap(),
  };
};