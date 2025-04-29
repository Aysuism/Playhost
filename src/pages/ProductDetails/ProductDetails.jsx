import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import slugify from 'slugify';
import ServerHosting from './ServerHosting';
import Configurations from './Configurations';
import { useGetGamesQuery } from '../../dashboard/tools/api/games';
import { LangContext } from '../../context/LangContext';
import CommentSection from './Comments/CommentSection';

const ProductDetails = () => {
  const { lang } = useContext(LangContext);
  const { data: games=[]} = useGetGamesQuery();
  const { urlid } = useParams();

  const findProduct = games.find(
    (p) => slugify(p.gameName, { lower: true }) === urlid
  );

  if (!findProduct) {
    return (
      <div className="alert alert-warning">
        {lang === 'AZ' ? 'Oyun tapılmadı' : 'Game not found'}
      </div>
    );
  }

  return (
    <div className="product-details">
      <ServerHosting alldata={findProduct} />
      <Configurations alldata={findProduct} />
      <CommentSection gameId={findProduct._id} />

    </div>
  );
};

export default ProductDetails;
